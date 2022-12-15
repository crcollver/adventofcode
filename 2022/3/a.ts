const text = await Deno.readTextFile("./3/input-a.txt");
const lines = text.split("\r\n");

const commonItems: string[] = [];

for (const line of lines) {
  // 1. Split string into two pieces.
  const compLength = line.length / 2;
  const comp1 = line.substring(0, compLength);
  const comp2 = line.substring(compLength, line.length);

  const currentCommon: string[] = []; // Keep track of current common items so that no duplicates are pushed to master array.

  // 2. Loop over full length of the string, while checking each individual split string.
  for (const item of line) {
    // 3. If the character is the same, push to an array/string.
    if (comp1.includes(item) && comp2.includes(item) && !currentCommon.includes(item)) {
      currentCommon.push(item);
      commonItems.push(item);
    }
  }
}

// ASCII lowercase a = 97, maps to 1 (97-96) = 1
// ASCII uppercase A = 65, maps to 27 (65-27) = 38

// 4. Once it is complete, loop through string and add up priorities.
let totalPriority = 0;
for (const item of commonItems) {
  item === item.toLowerCase()
    ? totalPriority += (item.charCodeAt(0) - 96)
    : totalPriority += (item.charCodeAt(0) - 38);
}

console.log(totalPriority);