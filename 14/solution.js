const [string, rulesStr] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n\n");

const charArray = string.split([]);
const rules = Object.fromEntries(
  rulesStr.split("\n").map((line) => line.split(" -> "))
);

const pairs = {};
for (var i = 0; i < charArray.length - 1; i++) {
  const nextPair = charArray[i] + charArray[i + 1];
  if (pairs[nextPair]) {
    pairs[nextPair]++;
  } else {
    pairs[nextPair] = 1;
  }
}
console.log(pairs);

console.log(rules);

const addToPairs = (pairs, key, val) => {
  if (pairs[key]) {
    pairs[key] += val;
  } else {
    pairs[key] = val;
  }
};
const getNext = (pairs) => {
  const newPairs = {};

  Object.entries(pairs).forEach(([key, value]) => {
    const letterToInsert = rules[key];
    const firstNewPair = key[0] + letterToInsert;
    const secondNewPair = letterToInsert + key[1];
    addToPairs(newPairs, firstNewPair, value);
    addToPairs(newPairs, secondNewPair, value);
  });
  return newPairs;

  // for (var i = 0; i < newArray.length - 1; i += 2) {
  //   const pair = newArray[i] + newArray[i + 1];
  //   const letterToInsert = rules[pair];
  //   newArray.splice(i + 1, 0, letterToInsert);
  // }
  // return newArray;
};

const getCounts = (pairsToCount) => {
  const counts = {};
  Object.entries(pairsToCount).forEach(([key, val]) => {
    addToPairs(counts, key[0], val);
    addToPairs(counts, key[1], val);
  });

  return counts;
};

const p1 = () => {
  let current = pairs;
  console.log(current);
  for (var i = 0; i < 10; i++) {
    current = getNext(current);
    console.log(current);
  }
  const frequencies = getCounts(current);
  console.log(frequencies);

  const values = Object.values(frequencies);
  console.log(values);
  return (Math.max(...values) - Math.min(...values)) / 2;
};

const p2 = () => {
  let current = pairs;
  for (var i = 0; i < 40; i++) {
    console.log(i);
    current = getNext(current);
  }
  const frequencies = getCounts(current);
  console.log(frequencies);

  const values = Object.values(frequencies);
  console.log(values);
  return (Math.max(...values) - Math.min(...values)) / 2;
};

console.log(p1(), p2());
