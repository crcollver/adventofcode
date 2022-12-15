const text = await Deno.readTextFile("./7/input-a.txt");
const lines = text.split("\r\n");

const currPath: string[] = [];
const tree: any = {};

for (const line of lines) {
  // 1. If line does not begin with a "$" then it is a file.
  if (line[0] !== "$") {
    const [size,] = line.split(" ");
    if (isNaN(parseInt(size))) continue;

    let concatPath = "";
    for (const dir of currPath) {
      concatPath += dir;
      tree[concatPath] += parseInt(size);
    }
    continue;
  }

  // 2. Otherwise, it is a command.
  const [, command, directory] = line.split(" ");

  // 3. If the command is "ls" then we can safely continue.
  if (command !== "cd") continue;

  if (directory === "..") {
    currPath.pop();
  } else if (directory === "/") {
    currPath.push(directory);
    tree["/"] = 0;
  } else {
    currPath.push(directory);
    const joined = currPath.join("");
    tree[joined] = 0;
  }
}

const availableDiskSpace = 70000000 - tree["/"];
const amtNeeded = 30000000 - availableDiskSpace;
let smallest = amtNeeded > 0 ? tree["/"] : -1;
for (const node in tree) {
  if (tree[node] >= amtNeeded && tree[node] < smallest) {
    smallest = tree[node];
  }
}

console.log(smallest);