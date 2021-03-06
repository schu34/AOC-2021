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

const operations = {
  0: (operands) => operands.reduce((a, b) => a + b),
  1: (operands) => operands.reduce((a, b) => a * b),
  2: (operands) => Math.min(...operands),
  3: (operands) => Math.max(...operands),
  5: ([first, second]) => (first > second ? 1 : 0),
  6: ([first, second]) => (first < second ? 1 : 0),
  7: ([first, second]) => (first === second ? 1 : 0),
};

const binary = input
  .split("")
  .map((x) => hexToBinary[x])
  .join("");

console.log(binary);

let versionTotal = 0;

const decodePacket = (start) => {
  const version = binary.slice(start, start + 3);
  const type = binary.slice(start + 3, start + 6);
  const bodyStart = start + 6;
  console.log("version:", version);
  console.log("type:", type);
  console.log("body:", bodyStart);

  const versionInt = parseInt(version, 2);
  versionTotal += versionInt;

  const typeInt = parseInt(type, 2);
  console.log("typeInt:", typeInt)

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
    const val = parseInt(fullBinaryString, 2);
    console.log(val, current + 6, binary[current]);
    return { val, offset: current };
  } else {
    let lengthType = binary[bodyStart];
    console.log("lengthType:", lengthType);
    if (lengthType === "0") {
      const bodyLengthBin = binary.slice(bodyStart + 1, bodyStart + 16);
      const bodyLength = parseInt(bodyLengthBin, 2);
      console.log(bodyLengthBin, bodyLength);

      const subPacketStart = bodyStart + 1 + 15;
      let next = subPacketStart;

      const vals = [];
      while (next < subPacketStart + bodyLength) {
        const { val, offset } = decodePacket(next);
        vals.push(val);
        next = offset;
        console.log("offset after read: ", next);
      }

      console.log("----", typeInt, operations[typeInt])
      const val = operations[typeInt](vals);

      return { val, offset: next };
    } else {
      const bodyLengthBin = binary.slice(bodyStart + 1, bodyStart + 12);
      const bodyLength = parseInt(bodyLengthBin, 2);
      console.log(bodyLengthBin, bodyLength);

      const subPacketStart = bodyStart + 1 + 11;
      let next = subPacketStart;

      const vals = [];

      for (var i = 0; i < bodyLength; i++) {
        const { val, offset } = decodePacket(next);
        vals.push(val);
        next = offset;
      }
      const val = operations[typeInt](vals);
      return { val, offset: next };
    }
  }
};

const {val} =decodePacket(0);


console.log(versionTotal);

console.log(val);
