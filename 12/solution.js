const addToGraph = (graph, key, value) => {
  if (graph[key]) {
    graph[key].push(value);
  } else {
    graph[key] = [value];
  }
};

const graph = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("-"))
  .reduce((graph, [start, end]) => {
    addToGraph(graph, start, end);
    addToGraph(graph, end, start);
    return graph;
  }, {});

const p1 = () => {
  const recursive = (start, visited) => {
    if (visited[start]) return 0;
    if (start === "end") {
      return 1;
    }
    if (start.toLowerCase() === start) {
      visited = { ...visited, [start]: true };
    }
    return graph[start]
      .map((path) => recursive(path, visited))
      .reduce((a, b) => a + b);
  };

  return recursive("start", {});
};

const p2 = () => {
  const recursive = (start, visited, didDoubleVisit) => {
    //console.log(start, visited);
    if (start === "end") {
      return 1;
    }
    if (start.toLowerCase() === start) {
      visited = { ...visited, [start]: true};
    }
    return graph[start]
      .map((path) => {
        if (!didDoubleVisit && visited[path] && path !== "start") {
          return recursive(path, visited, true)
        }else if(!visited[path]){
					return recursive(path, visited, didDoubleVisit);
				}
				return 0
      })
      .reduce((a, b) => a + b);
  };

  return recursive("start", {});
};

console.log(p1(), p2());
