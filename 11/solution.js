const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((char) => parseInt(char, 10)));

const isValid = ([row, col]) =>
  row >= 0 && row < input.length && col >= 0 && col < input[0].length;

const p1 = () => {
  let totalFlashes = 0;
  //increment
  let nines = [];
  for (var turn = 0; turn < 100; turn++) {
    // console.log(totalFlashes);
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        input[row][col]++;
        if (input[row][col] === 10) nines.push([row, col]);
      }
    }

    // console.log(
    //   input
    //     .map((line) => line.map((char) => `${char}`.padStart(2)).join("|"))
    //     .join("\n"),
    //   "\n"
    // );

    while (nines.length) {
      const [row, col] = nines.pop();
      totalFlashes++;

      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (!i && !j) {
            continue;
          }
          const newRow = row + i;
          const newCol = col + j;
          if (
            isValid([newRow, newCol]) &&
            input[newRow][newCol] < 10 &&
            input[newRow][newCol] > 0
          ) {
            input[newRow][newCol]++;
            if (input[newRow][newCol] === 10) nines.unshift([newRow, newCol]);
          }
        }
      }
      input[row][col] = 0;

      //   console.log(
      //     input
      //       .map((line) => line.map((char) => `${char}`.padStart(2)).join("|"))
      //       .join("\n"),
      //     "\n"
      //   );
      // }
      // console.log(input.map((line) => line.join("")).join("\n"));
    }
    return totalFlashes;
  }
};

const isInSync = () => {
  return input.flat().every((x) => x === 0);
};
const p2 = () => {
  //increment
  let nines = [];
  let turn = 0;
  while (!isInSync()) {
    // console.log(totalFlashes);
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        input[row][col]++;
        if (input[row][col] === 10) nines.push([row, col]);
      }
    }

    // console.log(
    //   input
    //     .map((line) => line.map((char) => `${char}`.padStart(2)).join("|"))
    //     .join("\n"),
    //   "\n"
    // );

    while (nines.length) {
      const [row, col] = nines.pop();

      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (!i && !j) {
            continue;
          }
          const newRow = row + i;
          const newCol = col + j;
          if (
            isValid([newRow, newCol]) &&
            input[newRow][newCol] < 10 &&
            input[newRow][newCol] > 0
          ) {
            input[newRow][newCol]++;
            if (input[newRow][newCol] === 10) nines.unshift([newRow, newCol]);
          }
        }
      }
      input[row][col] = 0;

      //   console.log(
      //     input
      //       .map((line) => line.map((char) => `${char}`.padStart(2)).join("|"))
      //       .join("\n"),
      //     "\n"
      //   );
      // }
      // console.log(input.map((line) => line.join("")).join("\n"));
    }
    turn++;
  }
  return turn;
};

console.log(p2());
