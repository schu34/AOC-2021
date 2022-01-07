const input = require("fs").readFileSync("./input.txt").toString();

const hexToBinary = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const binary = input
  .split("")
  .map((x) => hexToBinary[x])
  .join("");

console.log(binary)

const decodePacket = (start) => {
  const version = binary.slice(start, start + 3);
  const type = binary.slice(start + 3, start + 6);
  const bodyStart = start + 6;
  console.log("version:", version);
  console.log("type:", type);
  console.log("body:", bodyStart);

  if (type === "100") {
    let current = bodyStart;
    let fullBinaryString = "";

    let nextNumber = null;
    while (!nextNumber || nextNumber[0] === "1") {
      nextNumber = binary.slice(current, current + 5);

      const numberPart = nextNumber.slice(1);
      fullBinaryString += numberPart;
      current += 5;
    }
    console.log(parseInt(fullBinaryString, 2), current + 6, binary[current]);
    return current;
  } else {
    let lengthType = binary[bodyStart];
    console.log("lengthType:", lengthType);
    if (lengthType === "0") {
      const bodyLengthBin = binary.slice(bodyStart + 1, bodyStart + 16);
      const bodyLength = parseInt(bodyLengthBin, 2);
      console.log(bodyLengthBin, bodyLength);
    }
  }
};

const nextStart = decodePacket(0);
