const fs = require("fs");
const readLines = (filename) => readFileSync(filename).toString().split("\n");

module.exports = {
  readLines,
};
