const inputStr = require("fs").readFileSync("input.txt").toString();

const numbers = inputStr
  .split("\n")[0]
  .split(",")
  .map((x) => parseInt(x, 10));

const boardsStrs = inputStr.split("\n\n").slice(1);

const readBoard = (str) =>
  str.split("\n").map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((num) => parseInt(num.trim(), 10))
  );

let boards = boardsStrs.map(readBoard);

const markBoard = (number) => (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === number) {
        board[row][col] = null;
      }
    }
  }
};

const isAllNull = (array) => {
  return array.every((elem) => elem === null);
};

const isWinningBoard = (board) => {
  if (board.some(isAllNull)) return true;
  for (let col = 0; col < board.length; col++) {
    const colArray = [];
    for (let row = 0; row < board.length; row++) {
      colArray.push(board[row][col]);
    }
    if (isAllNull(colArray)) return true;
  }

  return false;
};

scoreBoard = (arr) =>
  arr
    .flat()
    .filter(Boolean)
    .reduce((acc, next) => acc + next);

const p1 = () => {
  for (let i = 0; i < numbers.length; i++) {
    const numToMark = numbers[i];
    const marker = markBoard(numToMark);
    boards.forEach(marker);
    for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
      if (isWinningBoard(boards[boardIdx]))
        return scoreBoard(boards[boardIdx]) * numToMark;
    }
  }
};

const p2 = () => {
  for (let i = 0; i < numbers.length; i++) {
    console.log(i);
    const numToMark = numbers[i];
    const marker = markBoard(numToMark);
    boards.forEach(marker);
    if (boards.length === 1 && isWinningBoard(boards[0])) {
      return scoreBoard(boards[0]) * numToMark;
    }
    boards = boards.filter((board) => !isWinningBoard(board));
  }
};

console.log(p2());
