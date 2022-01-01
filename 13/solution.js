const [dots, instructions] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n\n")
  .map((part) => part.split("\n"));

const countCells = (sheet) => sheet.flat().filter(Boolean).length;
const printGrid = (grid) =>
  console.log(
    grid.map((row) => row.map((cell) => (cell ? "#" : ".")).join("")).join("\n")
  );

const grid = [];

let maxCol = 0;

dots
  .map((dot) => dot.split(",").map((x) => parseInt(x, 10)))
  .forEach(([col, row]) => {
    maxCol = Math.max(maxCol, col);
    if (!grid[row]) {
      grid[row] = [];
    }
    grid[row][col] = true;
  });
console.log(grid);

console.log(countCells(grid));

for (let row = 0; row < grid.length; row++) {
  if (!grid[row]) grid[row] = [];
  for (let col = 0; col <= maxCol; col++) {
    if (!grid[row][col]) grid[row][col] = false;
  }
}

console.log(countCells(dots));

/**
 *
 * @param {*} direction
 * @param {*} position
 * @param {boolean[][]} sheet
 */
const fold = (direction, position, sheet) => {
  if (direction === "x") {
    return sheet.map((row) => {
      const firstHalf = row.slice(0, position);
      const secondHalf = row.slice(position + 1).reverse();

      const offset = firstHalf.length - secondHalf.length;
      for (var i = 0; i < secondHalf.length; i++) {
        firstHalf[i + offset] = firstHalf[i + offset] || secondHalf[i];
      }

      return firstHalf;
    });
  } else {
    const firstHalf = sheet.slice(0, position);
    const secondHalf = sheet.slice(position + 1).reverse();

    for (var i = 0; i < firstHalf.length; i++) {
      for (var j = 0; j < firstHalf[0].length; j++) {
        firstHalf[i][j] = firstHalf[i][j] || secondHalf[i][j];
      }
    }
    return firstHalf
  }
};
console.log(grid.length, grid[0].length);

const p1 = () => {
  const ret = fold("x", 655, grid);
  //printGrid(ret);
  return countCells(ret);
};

const p2 = () => {
  let nextGrid = grid;
  instructions.forEach((ins) => {
    const [direction, positionStr] = ins.replace("fold along ", "").split("=");
    const position = parseInt(positionStr, 10);
    console.log(direction, position, nextGrid.length, nextGrid[0].length);
    nextGrid = fold(direction, position, nextGrid);
  });
  printGrid(nextGrid);
};

//console.log(grid.length, grid[0].length);

console.log(p1(), p2());
