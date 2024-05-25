const f1 = require("./data/1.json");
const f2 = require("./data/2.json");
const f3 = require("./data/3.json");
const f4 = require("./data/4.json");
const f5 = require("./data/5.json");
const fs = require("fs");

allCandidates = JSON.stringify([
  ...f1.data,
  ...f2.data,
  ...f3.data,
  ...f4.data,
  ...f5.data,
]);

fs.writeFileSync(`../district-candidates-${Date.now()}.json`, allCandidates);
