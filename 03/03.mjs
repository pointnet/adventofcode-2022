import fs from "fs";

// a: 97
// A: 65

const letterScore = {};

const content = fs.readFileSync("./03/03.input.txt", { encoding: "utf-8" });

const sum = (acc, cur) => acc + cur;
const chunk = (array, size) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map((begin) => array.slice(begin, begin + size));

for (let i = 1; i < 27; i++) {
  letterScore[String.fromCharCode(i + 96)] = i;
  letterScore[String.fromCharCode(i + 64)] = i + 26;
}

const lines = content.split(/\r?\n/);

const rucksacks = lines.map((line) => {
  const chars = line.split("");
  const length = chars.length / 2;
  const first = chars.slice(0, length);
  const second = chars.slice(length);
  return [first, second];
});

const distincts = rucksacks.map(([first, second]) => {
  const fdistinct = [...new Set(first)];
  const sdistinct = [...new Set(second)];
  const distinct = fdistinct.filter((f) => sdistinct.includes(f));
  return distinct.map((d) => letterScore[d]).reduce(sum, 0);
});

const chunks = chunk(lines, 3);
const chunksDistincts = chunks.map((c) =>
  c
    .map((r) => [...new Set(r)])
    .reduce((acc, cur) => {
      if (acc === null) return cur;
      return acc.filter((l) => cur.includes(l));
    }, null)
    .map((d) => letterScore[d])
    .reduce(sum, 0)
);

console.log("Part 1:", distincts.reduce(sum, 0));

console.log("Part 2:", chunksDistincts.reduce(sum, 0));
