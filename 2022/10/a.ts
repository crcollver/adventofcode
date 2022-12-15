const text = await Deno.readTextFile("./10/input-a.txt");
const lines = text.split("\r\n");

let X = 1;
let cycle = 0;
let sum = 0;

const cycleChecks = [20, 60, 100, 140, 180, 220];

function tick() {
  cycle++;
  if (cycleChecks.includes(cycle)) {
    sum += (X * cycle);
  }
}

for (const line of lines) {
  const [instruction, value] = line.split(" ");
  if (instruction === "noop") {
    tick();
    continue;
  }

  // Else it is an add instruction, and two clock cycles are required.
  tick();
  tick();
  X += parseInt(value);
}

console.log(sum);