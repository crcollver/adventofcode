const text = await Deno.readTextFile("./8/input-a.txt");
const lines = text.split("\r\n");

const treeRows: number[][] = [];
const treeCols: number[][] = [];
let scenicScore = 0;

for (const line of lines) {
  const row = line.split("").map(h => Number(h));
  treeRows.push(row);
  // Disperse trees in row into appropriate columns.
  for (let i = 0; i < row.length; i++) {
    if (!treeCols[i]) treeCols[i] = [];
    treeCols[i] = [...treeCols[i], row[i]];
  }
}

function findFarthestView(current: number, arr: number[]) {
  let count = 0;
  for (const el of arr) {
    if (el >= current) {
      count++;
      break;
    }
    count++;
  }
  return count;
}

// For every row in treeRows, we need to check every tree.
for (let row = 0; row < treeRows.length; row++) {
  // First row and last rows will have value of zero, so skip them.
  if (row === 0 || row === treeRows.length - 1) continue;

  for (let tree = 0; tree < treeRows[row].length; tree++) {
    // First and last trees will have value of zero, so skip them.
    if (tree === 0 || tree === treeRows[row].length - 1) continue;

    // Grab our current tree.
    const currentTree = treeRows[row][tree];

    // Find the farthest view for each direction.
    // Since we are looking out from tree, left and top must be reversed.
    const left = findFarthestView(currentTree, treeRows[row].slice(0, tree).reverse());
    const right = findFarthestView(currentTree, treeRows[row].slice(tree + 1))
    const top = findFarthestView(currentTree, treeCols[tree].slice(0, row).reverse())
    const bottom = findFarthestView(currentTree, treeCols[tree].slice(row + 1))

    const currentScore = left * right * top * bottom;
    if (currentScore > scenicScore) scenicScore = currentScore;
  }
}

console.log(scenicScore);