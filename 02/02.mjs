import fs from "fs";

// A, X, 1: Rock
// B, Y, 2: Paper
// C, Z, 3: Scissors

// Rock (A, X)      > Scissors (C, Z)
// Scissors (C, Z)  > Paper (B, Y)
// Paper (B, Y)     > Rock (A, X)

// Lost: 0
// Draw: 3
// Win: 6

const scores = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
};

const content = fs.readFileSync("./02/02.input.txt", { encoding: "utf-8" });

const sum = (acc, cur) => acc + cur;

const isItAWin = ([opponent, me]) => {
  if (me === "X" && opponent === "A") return 3;
  if (me === "X" && opponent === "B") return 0;
  if (me === "Y" && opponent === "B") return 3;
  if (me === "Y" && opponent === "C") return 0;
  if (me === "Z" && opponent === "A") return 0;
  if (me === "Z" && opponent === "C") return 3;
  return 6;
};

const whatShouldIPlay = ([opponent, me]) => {
  if (me === "X") {
    if (opponent === "A") return "Z";
    if (opponent === "B") return "X";
    return "Y";
  }
  if (me === "Y") {
    if (opponent === "A") return "X";
    if (opponent === "B") return "Y";
    return "Z";
  }
  if (opponent === "A") return "Y";
  if (opponent === "B") return "Z";
  return "X";
};

const turns = content.split(/\r?\n/).map((line) => line.split(" "));

const totalScore = turns
  .map((turn) => {
    const result = isItAWin(turn);
    return result + scores[turn[1]];
  })
  .reduce(sum, 0);

const strategyScore = turns
  .map((turn) => {
    const play = whatShouldIPlay(turn);
    const result = isItAWin([turn[0], play]);
    return result + scores[play];
  })
  .reduce(sum, 0);

console.log("Part 1:", totalScore);

console.log("Part 2:", strategyScore);
