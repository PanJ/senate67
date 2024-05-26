// const provinces = require("./province.json");
const provinces = require("../province-districts.json");
const fs = require("fs");
const sf = require("sync-fetch");
const provinceWithDistricts = [];
for (let province of provinces) {
  console.log(`Fetching ${province.name} districts`);
  if (province.districts) continue;
  const resp = sf(
    `https://senator.ect.go.th/api/getDistrict?province_id=${province.id}`
  ).json();
  province.districts = resp.data;
  provinceWithDistricts.push(province);
  console.log(`Fetched ${province.name} districts`);
  fs.writeFileSync("../province-districts.json", JSON.stringify(provinces));
}

fs.writeFileSync(
  "../province-districts.json",
  JSON.stringify(
    provinces.map((p) => ({
      ...p,
      districts: p.districts.map((d) => ({ id: d.value, name: d.label })),
    }))
  )
);
