const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  "userPhotos.json"
);
const imagesDir = path.join(path.dirname(require.main.filename), "Images");
const ServerName = "http://localhost:3000/";

router.post("/addPhotos", async (req, res) => {
  let jsonFile = await setJsonFileIfNotExist();
  let itemsProcessed = 0;
  req.body.forEach(async (photo) => {
    if (
      !(await checkIfExistsInJson(
        photo.isBase64,
        photo.isBase64 ? photo.caption : photo.url,
        jsonFile
      ))
    ) {
      if (photo.isBase64) await addImageToDB(photo);
      jsonFile.push(photo);
      itemsProcessed++;
    } else itemsProcessed++;
    if (itemsProcessed === req.body.length) {
      await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
      res.end();
    }
  });
});

router.get("/getPhotos", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (req.query.query || req.query.category) {
    if (req.query.query)
      jsonFile = jsonFile.filter((photo) =>
        photo.caption.toLowerCase().includes(req.query.query.toLowerCase())
      );
    if (req.query.category)
      jsonFile = jsonFile.filter((photo) =>
        photo.categories?.find(
          (category) => category.name == req.query.category
        )
      );
  }
  if (jsonFile.length == 0) res.send([]);
  else res.send(jsonFile);
});

router.put("/setFavorite", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    jsonFile.find((photo) => photo.id == req.body.id).favorite =
      req.body.favorite;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.put("/setPrivate", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    jsonFile.find((photo) => photo.id == req.body.id).isPrivate =
      req.body.isPrivate;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.put("/setCategory", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let selectedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    if (selectedPhoto.categories)
      selectedPhoto.categories.push(req.body.category);
    else {
      selectedPhoto.categories = [req.body.category];
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.put("/setCategories", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let selectedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    selectedPhoto.categories = req.body.categories;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.put("/setName", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    jsonFile.find((photo) => photo.id == req.body.id).caption = req.body.name;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.put("/setDeprecated", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    jsonFile.find((photo) => photo.id == req.body.id).linkDeprecated = true;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

router.post("/removeImage", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let imageToRemove = jsonFile.find((image) => image.id == req.body.id);
    let imageLocation = jsonFile.indexOf(imageToRemove);
    jsonFile.splice(imageLocation, 1);
    if (imageToRemove.isBase64 && !imageToRemove.linkDeprecated)
      await fs.unlink(path.join(imagesDir, imageToRemove.caption));
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
  }
  res.end();
});

const addImageToDB = async (photo) => {
  let res = photo.url.replace(/^data:image\/\w+;base64,/, "");
  let buf = Buffer.from(res, "base64");
  let PhotoAbsoluteUrl = path.join(imagesDir, photo.caption);
  await fs.writeFile(PhotoAbsoluteUrl, buf);
  photo.url = ServerName + photo.caption;
};

const checkIfExistsInJson = async (isBase64, fileName, jsonFile) => {
  return new Promise((resolve) => {
    if (jsonFile.length)
      if (
        jsonFile.find((photo) =>
          isBase64 ? photo.caption == fileName : photo.url == fileName
        )
      )
        resolve(true);
      else resolve(false);
    else resolve(false);
  });
};

const setJsonFileIfNotExist = async () => {
  return new Promise(async (res) => {
    try {
      let jsonFile = await fs.readFile(jsonFilePath);
      res(JSON.parse(jsonFile));
    } catch (err) {
      await fs.writeFile(jsonFilePath, "[]");
      res([]);
    }
  });
};
module.exports = router;
