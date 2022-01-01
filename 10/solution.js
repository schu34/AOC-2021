const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(""));

const openingBracket = {
  "}": "{",
  "]": "[",
  ")": "(",
  ">": "<",
};

const closingBraces = Object.entries(openingBracket).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {}
);

const p1 = () => {
  const bracketScores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  return input
    .map((line) => {
      const stack = [];
      for (var i = 0; i < line.length; i++) {
        if (openingBracket[line[i]]) {
          const previousOpeningBracket = stack.pop();
          if (previousOpeningBracket !== openingBracket[line[i]]) {
            return bracketScores[line[i]];
          }
        } else {
          stack.push(line[i]);
        }
      }
      return 0;
    })
    .reduce((acc, next) => acc + next);
};

const p2 = () => {
  const bracketScores = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const scores = input
    .map((line) => {
      const stack = [];
      for (var i = 0; i < line.length; i++) {
        if (openingBracket[line[i]]) {
          const previousOpeningBracket = stack.pop();
          if (previousOpeningBracket !== openingBracket[line[i]]) {
            return null;
          }
        } else {
          stack.push(line[i]);
        }
      }
      console.log("stack", stack);

      const closingBracesList = [];
      while (stack.length) {
        closingBracesList.push(closingBraces[stack.pop()]);
      }
      console.log("closing", closingBracesList);
      return closingBracesList.reduce((acc, next) => {
        return 5 * acc + bracketScores[next];
      }, 0);
    })
    .filter(Boolean)
    .sort((a, b) => a - b);

  const middle = Math.floor(scores.length / 2);
	return scores[middle];
};

console.log(p1(), p2());
