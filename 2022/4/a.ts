const text = await Deno.readTextFile("./4/sample.txt");
const lines = text.split("\r\n");

let pairCount = 0;

for (const line of lines) {
  // 1. Split line at ","
  const [range1, range2] = line.split(",");

  // 2. Grab index 0 and 2 positions to determine min/max range.
  const [range1Min, range1Max] = range1.split("-").map(str => Number(str));
  const [range2Min, range2Max] = range2.split("-").map(str => Number(str));

  // 3. If min range of string is >= min of other, it's min falls in range.
  // The same must be said for it's max range. If both conditions are true, the range is entirely contained in the other.
  if (range1Min >= range2Min && range1Max <= range2Max) pairCount++;
  else if ((range2Min >= range1Min && range2Max <= range1Max)) pairCount++;
}

console.log(pairCount);