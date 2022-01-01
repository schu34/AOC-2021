const input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .split(",")
  .map((x) => parseInt(x, 10));

const getFuelCostP1 = (i, j) => Math.abs(input[i] - input[j]);

const getFuelCostP2 = (i, j) => {
  let distance = Math.abs(i - input[j]);

  let ret = 0;
  while (distance) {
    ret += distance;
    distance--;
  }
  return ret;
};

const p1 = () => {
  let minCost = 10000000000;
  for (var i = 0; i < input.length; i++) {
    let cost = 0;
    for (var j = 0; j < input.length; j++) {
      cost += getFuelCostP1(i, j);
    }
    minCost = Math.min(minCost, cost);
  }
  return minCost;
};

const p2 = () => {
  let minVal = Math.min(...input);
  let maxVal = Math.max(...input);
  console.log(minVal, maxVal);

  let minCost = 10000000000;
  for (var i = minVal; i < maxVal; i++) {
    let cost = 0;
    for (var j = 0; j < input.length; j++) {
      cost += getFuelCostP2(i, j);
    }
    minCost = Math.min(minCost, cost);
  }
  return minCost;
};
console.log(p1(), p2());
