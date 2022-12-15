const text = await Deno.readTextFile("./5/input-a.txt");
const lines = text.split("\r\n");

const grid: string[][] = [];

// PARSE GRID
for (const line of lines) {
  // We are done with grid.
  if (line === "") break;

  let index = 0;
  // 1. Parse grid by reading each line until the index line is met.
  // 2. Each grid line item is represented by 3 characters.
  for (let i = 0; i < line.length; i += 4) {
    // 3. Strip out brackets and spaces from each line.
    const stripped = line.substring(i, i + 3).replace(/[^\w]/g, "");

    // If we are at index row, break;
    if (!isNaN(parseInt(stripped))) break;

    // 5. Store in 2d array.
    if (!grid[index]) grid[index] = [];
    if (stripped) grid[index].push(stripped);
    index++;
  }
}

const instructions: number[][] = [];

// PARSE INSTRUCTIONS
// 1. For each instruction, remove surrounding words and grab values [mv_amt, from, to].
for (const line of lines) {
  if (!line.includes("move")) continue;

  const instruction = line.match(/\d+/g)?.map(m => Number(m));
  if (instruction) instructions.push(instruction);
}

// MOVEMENT
// NOTE: from and to should - 1 for correct index.
for (const instruction of instructions) {
  const [mv_amt, from, to] = instruction;

  // 1. Take mv_amt subsection from grid[from].
  const subsection = grid[from - 1].splice(0, mv_amt);

  // 2. Append this subsection to front of grid[to].
  grid[to - 1] = [...subsection, ...grid[to - 1]];
}

// CALCULATE
// 1. Loop through grid array and pick first element from front.
const topItems: string[] = grid.map(stack => stack[0]);
console.log(topItems);