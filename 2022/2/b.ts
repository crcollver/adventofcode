// A or X: Rock = 1
// B or Y: Paper = 2
// C or Z: Scissors = 3

// Lose = 0
// Draw = 3
// Win = 6

// FOR part two:
// X = LOSE
// Y = DRAW
// Z = WIN
// Still count points of X, Y, Z the same as above.

type OPTIONS = "X" | "Y" | "Z";

const OUTCOMEPOINTS = {
  X: 0,
  Y: 3,
  Z: 6,
} as const;

const OPTIONPOINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
} as const;

const rockConditions = ["A Y", "C Z", "B X"]; // DRAW, WIN, LOSE
const paperConditions = ["B Y", "A Z", "C X"];

const text = await Deno.readTextFile("./2/input-a.txt");
const lines = text.split("\r\n");
let totalScore = 0;

for (const line of lines) {
  const outcome: "X" | "Y" | "Z" = line[2] as OPTIONS;
  totalScore += OUTCOMEPOINTS[outcome];   // We always know the outcome points.

  if (rockConditions.indexOf(line) > -1) {
    totalScore += OPTIONPOINTS.ROCK;
  } else if (paperConditions.indexOf(line) > -1) {
    totalScore += OPTIONPOINTS.PAPER;
  } else {
    totalScore += OPTIONPOINTS.SCISSORS;
  }
}

console.log(totalScore);