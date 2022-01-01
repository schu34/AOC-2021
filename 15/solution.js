const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((x) => parseInt(x, 10)));

const isValid = ([row, col]) => {
  return row >= 0 && row < input.length && col >= 0 && col < input[0].length;
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const serialize = ([row, col]) => `${row}|${col}`;

const sorter = (a, b) => a - b;

const p1 = () => {
  const minDistances = [];
  const visited = [];
  for (var i = 0; i < input.length; i++) {
    minDistances[i] = [];
    visited[i] = [];
    for (var j = 0; j < input[0].length; j++) {
      minDistances[i][j] = Number.MAX_SAFE_INTEGER;
      visited[i][j] = false;
    }
  }
  const queue = [[0, 0]];

  while (queue.length) {
    const [nextRow, nextCol] = queue.pop();
    console.log(nextRow, nextCol)
    console.log(minDistances)
    directions.forEach(([dRow, dCol]) => {
      const newRow = dRow + nextRow;
      const newCol = dCol + nextCol;
      if (!isValid([newRow, newCol]) || visited[newRow][newCol]) {
        return;
      }
      const newGuess = minDistances[nextRow][nextCol] + input[nextRow][nextCol];
      minDistances[newRow][newCol] = Math.min(
        minDistances[newRow][newCol],
        newGuess
      );
      queue.push([newRow, newCol]);
      queue.sort(sorter);
    });
    visited[nextRow][nextCol] = true;
  }

  return minDistances[input.length - 1][input[0].length - 1];

  //const recursive = ([startRow, startCol], visited) => {
  //console.log(startRow, startCol);
  //if (startRow === input.length - 1 && startCol === input[0].length - 1) {
  //return 0;
  //}
  //if (!isValid([startRow, startCol])) {
  //return 10000000;
  //}
  //const key = serialize([startRow, startCol]);
  //if (visited[key] !== undefined) {
  //return 10000000;
  //}
  //const newVisited = { ...visited, [key]: true };
  //
  //const options = directions.map(([dRow, dCol]) => {
  //return recursive([startRow + dRow, startCol + dCol], newVisited);
  //});
  //const ret = input[startRow][startCol] + Math.min(...options);
  //console.log(startRow, startCol, options, ret, visited);
  ////memo[key] = ret;
  //return ret;
  // };

  //return recursive([0, 0], {});

  // const dp = [[0]];
  // for (var i = 0; i < input.length; i++) {
  //   if (!dp[i]) dp[i] = [];
  //   for (var j = 0; j < input[0].length; j++) {
  //     if (dp[i][j] === undefined) {
  //       const possibilities = [];
  //       if (i > 0) possibilities.push(dp[i - 1][j]);
  //       if (j > 0) possibilities.push(dp[i][j - 1]);
  //       console.log(possibilities, i, j);
  //       dp[i][j] = input[i][j] + Math.min(...possibilities);
  //     }
  //   }
  // }

  // for (var i = input.length - 1; i >= 0; i--) {
  //   for (var j = input[0].length - 1; j >= 0; j--) {
  //     const possibilities = [];
  //     if (i < input.length - 1) possibilities.push(dp[i + 1][j]);
  //     if (j < input[0].length - 1) possibilities.push(dp[i][j + 1]);
  //     const newCandidate = input[i][j] + Math.min(...possibilities);
  //     dp[i][j] = Math.min(dp[i][j], newCandidate);
  //   }
  // }
  // console.log(
  //   dp
  //     .map((line) => line.map((ch) => ("" + ch).padStart(4)).join("|"))
  //     .join("\n")
  // );
  // return dp[input.length - 1][input[0].length - 1];
};

console.log(p1());
