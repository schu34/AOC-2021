const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    return line.split("").map((digit) => parseInt(digit, 10));
  });

const numberFromBinaryArray = (array) => {
  return parseInt(array.join(""), 2);
};

const getMostAndLeastCommon = (numbers) => {
  const totals = numbers.reduce((acc, next) => {
    for (let i = 0; i < 12; i++) {
      acc[i] += next[i];
    }
    return acc;
  }, new Array(12).fill(0));

  const mostCommon = totals.map((total) =>
    total >= numbers.length / 2 ? 1 : 0
  );
  const leastCommon = mostCommon.map((total) => (total === 1 ? 0 : 1));
  return { mostCommon, leastCommon };
};

const p1 = () => {
  const { mostCommon, leastCommon } = getMostAndLeastCommon(input);
  return numberFromBinaryArray(mostCommon) * numberFromBinaryArray(leastCommon);
};

const p2 = () => {
  const doFilter = (mostOrLeast) => {
    let remainingItems = input.slice();
    let currentDigit = 0;

    while (remainingItems.length > 1) {
      const mostAndLeast = getMostAndLeastCommon(remainingItems);
      const searchTerm = mostAndLeast[mostOrLeast];
      console.log(remainingItems.length);
      remainingItems = remainingItems.filter(
        (item) => item[currentDigit] === searchTerm[currentDigit]
      );
      currentDigit++;
    }
    return numberFromBinaryArray(remainingItems[0]);
  };

  const oxygen = doFilter("mostCommon");
  const co2 = doFilter("leastCommon");
  console.log(co2, oxygen);
  return co2 * oxygen;
};

if (p1() !== 3969000) {
  console.error("wrong answer!");
}

if (p2() === 3977498) {
  console.error("wrong, too low");
}

console.log(p1());
console.log(p2());
