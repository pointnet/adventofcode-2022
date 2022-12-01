import fs from "fs";

const content = fs.readFileSync("./01/01.input.txt", { encoding: "utf-8" });

const sum = (acc, cur) => acc + cur;

const sumCalories = (elf) =>
  elf
    .split(/\r?\n/)
    .map((cal) => parseInt(cal, 10))
    .reduce(sum, 0);

const maxCalories = content
  .split(/\r?\n\r?\n/)
  .map(sumCalories)
  .sort((a, b) => a - b);

console.log("Part 1:", maxCalories.at(-1));

console.log("Part 2:", maxCalories.slice(-3).reduce(sum, 0));
