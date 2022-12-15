const text = await Deno.readTextFile("./6/input-a.txt");

let index = 0;
for (let start = 0, end = 4; start < text.length; start++, end++) {
  const substr = text.substring(start, end).split("");
  const buffer = new Set(substr);

  if (buffer.size === 4) {
    index = end;
    break;
  }
}

console.log(index);