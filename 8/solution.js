const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((line) => {
    const [firstPart, secondPart] = line.split("|");
    return [
      firstPart
        .split(" ")
        .filter(Boolean)
        .sort((a, b) => a.length - b.length)
        .map((s) => s.split("").sort().join("")),
      secondPart
        .split(" ")
        .filter(Boolean)
        .map((s) => s.split("").sort().join("")),
    ];
  });

const p1 = () => {
  const lengths = [2, 4, 3, 7];
  return input
    .map(([_, secondPart]) => {
      return secondPart.filter((item) => lengths.indexOf(item.length) !== -1);
    })
    .reduce((acc, next) => acc + next.length, 0);
};

const numbersToLetters = {
  0: "abcefg".split(""),
  1: "cf".split(""),
  2: "acdeg".split(""),
  3: "acdfg".split(""),
  4: "bcdf".split(""),
  5: "abdfg".split(""),
  6: "abdefg".split(""),
  7: "acf".split(""),
  8: "abcdefg".split(""),
  9: "abcdfg",
};

const p2 = () => {
  return input.map(decode).reduce((acc, next)=>acc+next)
};

const decode = ([map, numbers]) => {
  const possibilities = {
    a: "abcdefg".split(""),
    b: "abcdefg".split(""),
    c: "abcdefg".split(""),
    d: "abcdefg".split(""),
    e: "abcdefg".split(""),
    f: "abcdefg".split(""),
    g: "abcdefg".split(""),
  };

  const nums = [];

  const mm = map.reduce((acc, next) => {
    if (acc[next.length]) {
      acc[next.length].push(next);
    } else acc[next.length] = [next];
    return acc;
  }, {});


  nums[1] = mm[2][0];
  nums[7] = mm[3][0];
  nums[4] = mm[4][0];
  nums[8] = mm[7][0];
  console.log(nums[1][0], nums[1][1])
  nums[6] = mm[6].find(
    (str) => str.indexOf(nums[1][0]) === -1 || str.indexOf(nums[1][1]) === -1
  );
  nums[3] = mm[5].find(
    (str) => str.indexOf(nums[1][0]) > -1 && str.indexOf(nums[1][1]) > -1
  );

  const allLetters = "abcdefg";
  let missingFrom3 = allLetters
    .split("")
    .filter((letter) => nums[3].indexOf(letter) === -1)
    .join("");

  nums[9] = mm[6].find((str) => {
    console.log(str, missingFrom3);
    return str.indexOf(missingFrom3[0]) === -1 || str.indexOf(missingFrom3[1]) === -1;
  });
  nums[0] = mm[6].find((str) => str !== nums[6] && str !== nums[9]);

  let missingFrom9 = allLetters
    .split("")
    .filter((letter) => nums[9].indexOf(letter) === -1)
    .join("");

  nums[2] = mm[5].find((str) => {
    return str.indexOf(missingFrom9) !== -1 && str !== nums[3];
  });

  if (!nums[2]) {
    throw new Error(
      "nums[2] is undefined! " +
        "mm5: " +
        mm[5] +
        " missingFrom9 " +
        missingFrom9
    );
  }

  nums[5] = mm[5].find((str) => {
    return str !== nums[2] && str !== nums[3];
  });

  const reversNums = nums.reduce((acc, str, idx) => {
    console.log(acc, str, idx);
    acc[str] = idx;
    return acc;
  }, {});

  if (nums.length !== Array.from(new Set(nums)).length) {
    console.log(nums, reversNums);
    throw new Error(
      "duplicate " + " \nmm5: " + mm[5] + "\nmissingFrom9 " + missingFrom9
    );
  }

  const number = numbers.reduce((acc, next) => {
    console.log(next, reversNums, reversNums[next]);
    return acc + reversNums[next];
  }, "");

  //console.log(number);
  return parseInt(number, 10);
  //return numbers.forEach();
};

//p2();
console.log(p1(), p2());
