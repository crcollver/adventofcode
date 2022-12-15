// A or X: Rock = 1
// B or Y: Paper = 2
// C or Z: Scissors = 3

// Lose = 0
// Draw = 3
// Win = 6

type OPTIONS = "X" | "Y" | "Z";

const OUTCOMEPOINTS = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
} as const;

const OPTIONPOINTS = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const drawConditions = ["A X", "B Y", "C Z"];
const winConditions = ["A Y", "B Z", "C X"];

const text = await Deno.readTextFile("./2/input-a.txt");
const lines = text.split("\r\n");
let totalScore = 0;

for (const line of lines) {
  const me: "X" | "Y" | "Z" = line[2] as OPTIONS;
  totalScore += OPTIONPOINTS[me];
  if (drawConditions.indexOf(line) > -1) {
    totalScore += OUTCOMEPOINTS.DRAW;
  } else if (winConditions.indexOf(line) > -1) {
    totalScore += OUTCOMEPOINTS.WIN;
  } else {
    totalScore += OUTCOMEPOINTS.LOSE;
  }
}

console.log(totalScore);