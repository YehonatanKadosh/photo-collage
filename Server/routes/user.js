const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  "userData.json"
);

router.get("/", async (req, res, next) => {
  let jsonFile = await setJsonFileIfNotExist();
  if (!jsonFile) res.send({});
  else res.send(jsonFile);
});

router.put("/setPassword", async (req, res, next) => {
  jsonFile = await setJsonFileIfNotExist();
  jsonFile.privateModePassword = req.body.password;
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  res.end();
});

router.put("/setPreferedTheme", async (req, res, next) => {
  jsonFile = await setJsonFileIfNotExist();
  jsonFile.preferedTheme = req.body.preferedTheme;
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  res.end();
});

router.put("/setExtraDetails", async (req, res, next) => {
  jsonFile = await setJsonFileIfNotExist();
  jsonFile.libraryName = req.body.libraryName;
  jsonFile.template = req.body.template;
  if (req.body.description) jsonFile.description = req.body.description;
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  res.end();
});

router.put("/setCategory", async (req, res, next) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.categories) jsonFile.categories.push(req.body.category);
  else jsonFile.categories = [req.body.category];
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  res.end();
});

const setJsonFileIfNotExist = async () => {
  return new Promise(async (res) => {
    try {
      let jsonFile = await fs.readFile(jsonFilePath);
      res(JSON.parse(jsonFile));
    } catch (err) {
      await fs.writeFile(jsonFilePath, "{}");
      res({});
    }
  });
};
module.exports = router;
