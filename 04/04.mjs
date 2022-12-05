import fs from "fs";

const content = fs.readFileSync("./04/04.input.txt", { encoding: "utf-8" });

const sum = (acc, cur) => acc + cur;

const orderByStart = (a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
};

const contains = (first, second) =>
  (second[0] >= first[0] &&
    second[0] <= first[1] &&
    second[1] >= first[0] &&
    second[1] <= first[1]) ||
  (first[0] >= second[0] &&
    first[0] <= second[1] &&
    first[1] >= second[0] &&
    first[1] <= second[1]);

const overlaps = (first, second) =>
  (second[0] >= first[0] && second[0] <= first[1]) ||
  (second[1] >= first[0] && second[1] <= first[1]) ||
  (first[0] >= second[0] && first[0] <= second[1]) ||
  (first[1] >= second[0] && first[1] <= second[1]);

const pairs = content.split(/\r?\n/).map((line) =>
  line
    .split(",")
    .map((pair) => pair.split("-"))
    .map((pair) => pair.map((number) => parseInt(number, 10)))
    .sort(orderByStart)
);

const completlyOverlaps = pairs.map(([first, second]) =>
  contains(first, second) ? 1 : 0
);

const partiallyOverlaps = pairs.map(([first, second]) =>
  overlaps(first, second) ? 1 : 0
);

console.log("Part 1:", completlyOverlaps.reduce(sum, 0));

console.log("Part 2:", partiallyOverlaps.reduce(sum, 0));
