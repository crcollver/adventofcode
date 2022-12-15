const text = await Deno.readTextFile("./8/input-a.txt");
const lines = text.split("\r\n");

const treeRows: number[][] = [];
const treeCols: number[][] = [];
let visibleCount = 0;

for (const line of lines) {
  const row = line.split("").map(h => Number(h));
  treeRows.push(row);
  // Disperse trees in row into appropriate columns.
  for (let i = 0; i < row.length; i++) {
    if (!treeCols[i]) treeCols[i] = [];
    treeCols[i] = [...treeCols[i], row[i]];
  }
}

// For every row in treeRows, we need to check every tree.
for (let row = 0; row < treeRows.length; row++) {
  // First row and last row are always going to be visible.
  if (row === 0 || row === treeRows.length - 1) {
    visibleCount += treeRows.length;
    continue;
  }

  for (let tree = 0; tree < treeRows[row].length; tree++) {
    // First and last tree in row is always going to be visible.
    if (tree === 0 || tree === treeRows[row].length - 1) {
      visibleCount++;
      continue;
    }

    // Grab our current tree.
    const current = treeRows[row][tree];
    const isVisible = (t: number) => t < current;

    // Is it visible from left/right/top/bottom?
    const leftOk = treeRows[row].slice(0, tree).every(isVisible);
    const rightOk = treeRows[row].slice(tree + 1).every(isVisible);

    const topOk = treeCols[tree].slice(0, row).every(isVisible);
    const bottomOk = treeCols[tree].slice(row + 1).every(isVisible);

    if (rightOk || leftOk || topOk || bottomOk) visibleCount++;
  }
}

console.log(visibleCount);