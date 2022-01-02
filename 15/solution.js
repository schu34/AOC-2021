const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map((x) => parseInt(x, 10)));

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const p1 = () => {
  const isValid = ([row, col]) => {
    return row >= 0 && row < input.length && col >= 0 && col < input[0].length;
  };
  const minDistances = [];
  const visited = [];
  for (let i = 0; i < input.length; i++) {
    minDistances[i] = [];
    visited[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      minDistances[i][j] = Number.MAX_SAFE_INTEGER;
      visited[i][j] = false;
    }
  }
  const queue = [[0, 0]];
  minDistances[0][0] = 0;

  while (queue.length) {
    const [nextRow, nextCol] = queue.pop();
    if (visited[nextRow][nextCol]) continue;
    console.log(nextRow, nextCol, queue.length);
    directions.forEach(([dRow, dCol]) => {
      const newRow = dRow + nextRow;
      const newCol = dCol + nextCol;
      if (!isValid([newRow, newCol]) || visited[newRow][newCol]) {
        return;
      }
      const newGuess = minDistances[nextRow][nextCol] + input[nextRow][nextCol];
      if (newGuess < minDistances[newRow][newCol]) {
        minDistances[newRow][newCol] = newGuess;
        queue.push([newRow, newCol]);
        queue.sort(
          ([row1, col1], [row2, col2]) =>
            minDistances[row2][col2] - minDistances[row1][col1]
        );
      }
    });
    visited[nextRow][nextCol] = true;
  }
  console.log(minDistances.map((line) => line.join("|")).join("\n"));

  return (
    minDistances[input.length - 1][input[0].length - 1] +
    input[input.length - 1][input[0].length - 1] -
    input[0][0]
  );
};

const p2 = () => {
  const bigGrid = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[0].length; col++) {
          let number = input[row][col] + (i + j);
          if (number > 9) {
            number -= 9;
          }

          const finalRow = row + input.length * i;
          const finalCol = col + input[0].length * j;
          if (!bigGrid[finalRow]) bigGrid[finalRow] = [];

          bigGrid[finalRow][finalCol] = number;
        }
      }
    }
  }

  const isValid = ([row, col]) => {
    return (
      row >= 0 && row < bigGrid.length && col >= 0 && col < bigGrid[0].length
    );
  };

  const minDistances = [];
  const visited = [];
  for (let i = 0; i < bigGrid.length; i++) {
    minDistances[i] = [];
    visited[i] = [];
    for (let j = 0; j < bigGrid[0].length; j++) {
      minDistances[i][j] = Number.MAX_SAFE_INTEGER;
      visited[i][j] = false;
    }
  }
  const queue = [[0, 0]];
  minDistances[0][0] = 0;

  while (queue.length) {
    const [nextRow, nextCol] = queue.pop();
    if (visited[nextRow][nextCol]) continue;
    console.log(nextRow, nextCol, queue.length);
    directions.forEach(([dRow, dCol]) => {
      const newRow = dRow + nextRow;
      const newCol = dCol + nextCol;
      if (!isValid([newRow, newCol]) || visited[newRow][newCol]) {
        return;
      }
      const newGuess =
        minDistances[nextRow][nextCol] + bigGrid[nextRow][nextCol];
      if (newGuess < minDistances[newRow][newCol]) {
        minDistances[newRow][newCol] = newGuess;
        queue.push([newRow, newCol]);
        queue.sort(
          ([row1, col1], [row2, col2]) =>
            minDistances[row2][col2] - minDistances[row1][col1]
        );
      }
    });
    visited[nextRow][nextCol] = true;
  }
  console.log(minDistances.map((line) => line.join("|")).join("\n"));

  return (
    minDistances[bigGrid.length - 1][bigGrid[0].length - 1] +
    bigGrid[bigGrid.length - 1][bigGrid[0].length - 1] -
    bigGrid[0][0]
  );
};

console.log(p1(), p2());
