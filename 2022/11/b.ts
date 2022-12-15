const text = await Deno.readTextFile("./11/sample.txt");
const lines = text.split("\r\n\r\n");

type Monkey = {
  items: number[];
  operation: { operator: string; value: string | number };
  test: {
    divisibleBy: number;
    trueCase: number;
    falseCase: number;
  }
  itemsInspected: number;
}

const monkeys: Monkey[] = [];

// 1. Parse input.
for (const line of lines) {
  const [, startingLine, operationLine, testLine, trueLine, falseLine] = line.split("\r\n");

  monkeys.push({
    items: parseStartingItems(startingLine),
    operation: parseOperation(operationLine),
    test: {
      divisibleBy: testLine.split("by ").map(n => Number(n))[1],
      trueCase: trueLine.split("monkey ").map(n => Number(n))[1],
      falseCase: falseLine.split("monkey ").map(n => Number(n))[1],
    },
    itemsInspected: 0,
  })
}
// 2. Loop through all monkeys 20 times.
for (let i = 0; i < 20; i++) {
  for (const monkey of monkeys) {
    inspectItems(monkey);
  }
}

const result = monkeys.map(monkey => monkey.itemsInspected).sort((x, y) => y - x).splice(0, 2);
console.log(result[0] * result[1]);

function parseStartingItems(line: string) {
  const [, list] = line.split(": ");
  if (list === "") return [];
  return list.split(", ").map(n => Number(n));
}

function parseOperation(line: string) {
  const [, _] = line.split(" = old ");
  const [operator, value] = _.split(" ");
  return { operator: operator, value: value === "old" ? "old" : Number(value) };
}


function inspectItems(monkey: Monkey) {
  if (monkey.items.length === 0) return;

  for (const item of monkey.items) {
    let { operator, value } = monkey.operation;

    // If the typeof value is string then we know value is "old".
    if (typeof value === "string") value = item;

    let currentWorry = 0;
    if (operator === "*") {
      currentWorry = item * value;
    } else if (operator === "+") {
      currentWorry = item + value;
    }

    // Numbers get way too large, instead of modulus 3, figure out different modulus.

    // Perform test.
    if (currentWorry % monkey.test.divisibleBy === 0) {
      monkeys[monkey.test.trueCase].items.push(currentWorry);
    } else {
      monkeys[monkey.test.falseCase].items.push(currentWorry);
    }

    monkey.itemsInspected++;
  }
  monkey.items.length = 0;
}