const input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((x) => parseInt(x, 10)))
  .filter((x) => x.length);

//console.log(input);

const isValidCoord = ([row, col]) => {
  return row >= 0 && row < input.length && col >= 0 && col < input[0].length;
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const p1 = () => {
  let total = 0;

  for (var row = 0; row < input.length; row++) {
    for (var col = 0; col < input[0].length; col++) {
      let isValley = true;
      for (var i = 0; i < 4; i++) {
        const [dRow, dCol] = directions[i];
        const check = [row + dRow, col + dCol];

        if (
          isValidCoord(check) &&
          input[check[0]][check[1]] <= input[row][col]
        ) {
          isValley = false;
          break;
        }
      }
      if (isValley) {
        console.log(row, col, input[row][col]);
        total += input[row][col] + 1;
      }
    }
  }
  return total;
};

const getBasinSize = (start) => {
  const queue = [start];
  const visited = {};
  let totalSize = 0;

  while (queue.length) {
    const [nextRow, nextCol] = queue.pop();
    const key = `${nextRow}|${nextCol}`;
    if (visited[key] || !isValidCoord([nextRow, nextCol])) continue;
    visited[key] = true;
    if (input[nextRow][nextCol] === 9) continue;

    totalSize++;

    directions.forEach(([dRow, dCol]) => {
      queue.push([nextRow + dRow, nextCol + dCol]);
    });
  }
  return totalSize
};

const p2 = () => {
  const basinSizes = [];

  for (var row = 0; row < input.length; row++) {
    for (var col = 0; col < input[0].length; col++) {
      let isValley = true;
      for (var i = 0; i < 4; i++) {
        const [dRow, dCol] = directions[i];
        const check = [row + dRow, col + dCol];

        if (
          isValidCoord(check) &&
          input[check[0]][check[1]] <= input[row][col]
        ) {
          isValley = false;
          break;
        }
      }
      if (isValley) {
        basinSizes.push(getBasinSize([row, col]));
      }
    }
  }

  console.log(basinSizes);
  
  return basinSizes.sort((a,b)=>b-a).slice(0,3).reduce((acc, next)=>acc*next);

};

console.log(p1(), p2());
