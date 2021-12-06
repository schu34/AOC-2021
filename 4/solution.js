const inputStr = require("fs").readFileSync("input.txt").toString();
const readLines = require("../shared.js");

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

const boards = boardsStrs.map(readBoard);

const markBoard = (number) => (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === number) {
        board[row][col] = null;
      }
    }
  }
};




console.log(boards);
