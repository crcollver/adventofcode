const text = await Deno.readTextFile("./3/input-a.txt");
const lines = text.split("\r\n");

const allCommonBadges: string[] = [];

const currentGroup: string[] = [];

for (const line of lines) {
  // 1. Group elves by 3.
  currentGroup.push(line);
  if (currentGroup.length !== 3) continue;

  const fullGroup = currentGroup.join("");

  // 2. Loop over full length of the concanated group, while checking each individual elf.
  for (const char of fullGroup) {
    // 3. If the character is present in all of the three, push the character and reset.
    if (currentGroup[0].includes(char) && currentGroup[1].includes(char) && currentGroup[2].includes(char)) {
      allCommonBadges.push(char);
      currentGroup.length = 0;
      break;
    }
  }
}

// ASCII lowercase a = 97, maps to 1 (97-96) = 1
// ASCII uppercase A = 65, maps to 27 (65-27) = 38

// 4. Once it is complete, loop through string and add up priorities.
let totalPriority = 0;
for (const item of allCommonBadges) {
  item === item.toLowerCase()
    ? totalPriority += (item.charCodeAt(0) - 96)
    : totalPriority += (item.charCodeAt(0) - 38);
}

console.log(totalPriority);