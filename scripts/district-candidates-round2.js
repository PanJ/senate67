const fs = require("fs");
const sf = require("sync-fetch");

const files = fs.readdirSync("data");
// console.log(files);
let allCandidates = [];
for (let page = 1; page <= 1183; page++) {
  let found = false;
  try {
    const dataBytes = fs.readFileSync(`data/round2-${page}.json`);
    const dataJson = JSON.parse(dataBytes);
    if (dataJson && dataJson.data) {
      if (dataJson.data.length > 0) {
        allCandidates = allCandidates.concat(dataJson.data);
        found = true;
      } else {
        console.log("empty: " + page);
      }
    } else {
      console.log("nodata: " + page);
    }
  } catch (e) {
    console.log("error: " + page);
  }
  try {
    if (found === false) {
      console.log(`page ${page} not found fetching...`);
      const resp = sf(
        `https://senator.ect.go.th/api/senator?province&district&job&tier=2&page=${page}&limit=20&round=2`
      ).json();
      allCandidates = allCandidates.concat(resp.data);
      fs.writeFileSync(`data/round2-${page}.json`, JSON.stringify(resp));
    }
  } catch (e) {
    console.log("error: " + e);
  }
}

console.log(`Total length: ${allCandidates.length}`);
fs.writeFileSync(
  `../district-candidates-round2-${Date.now()}.json`,
  JSON.stringify(allCandidates)
);
