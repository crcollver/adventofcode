const text = await Deno.readTextFile("./9/input-a.txt");
const lines = text.split("\r\n");

const visited: Set<string> = new Set(["00"]);
const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

for (const line of lines) {
  const [direction, _] = line.split(" ");
  let steps = parseInt(_);

  for (steps; steps > 0; steps--) {
    moveHead(direction);

    if (!tailOutOfRange()) continue;

    // Only move tail if it is out of range.
    moveTail(direction);
    visited.add(`${tail.x}${tail.y}`);
  }
}

// Tail is out of range when in either direction, the head has moved more than 1 space away.
function tailOutOfRange() {
  const x = Math.abs(head.x - tail.x);
  const y = Math.abs(head.y - tail.y)
  return x > 1 || y > 1;
}

function moveTail(direction: string) {
  if (direction === "R") {
    tail.x = head.x - 1;
    tail.y = head.y;
  } else if (direction === "L") {
    tail.x = head.x + 1;
    tail.y = head.y;
  } else if (direction === "U") {
    tail.x = head.x;
    tail.y = head.y - 1;
  } else if (direction === "D") {
    tail.x = head.x;
    tail.y = head.y + 1;
  }
}

function moveHead(direction: string) {
  if (direction === "R") head.x++;
  if (direction === "L") head.x--;
  if (direction === "U") head.y++;
  if (direction === "D") head.y--;
}

console.log(visited.size);