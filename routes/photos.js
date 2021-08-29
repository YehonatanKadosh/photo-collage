const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");
const upload = multer({
  storage: new MulterAzureStorage({
    containerName: "photos",
    containerSecurity: "Blob",
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  }),
});
const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  "userPhotos.json"
);
const got = require("got");
const imagesDir = path.join(path.dirname(require.main.filename), "Images");

router.post("/addPhotos", upload.array("new_images", 100), async (req, res) => {
  let jsonFile = await setJsonFileIfNotExist();
  let itemsProcessed = 0;
  req.body.photos.forEach(async (photo) => {
    if (!(await checkIfExistsInJson(photo.url, jsonFile))) {
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

  if (req.query.isPrivate == "false") {
    jsonFile = jsonFile.filter((photo) => photo.isPrivate == false);
  }

  if (req.query.query || req.query.category) {
    if (req.query.query)
      jsonFile = jsonFile.filter((photo) =>
        photo.caption.toLowerCase().includes(req.query.query.toLowerCase())
      );
    if (req.query.category)
      jsonFile = jsonFile.filter(
        (photo) =>
          photo.categories &&
          photo.categories.find(
            (category) => category.name == req.query.category
          )
      );
  }
  if (jsonFile.length == 0) res.send([]);
  else res.send(jsonFile);
});

router.post("/setFavorite", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let designatedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    designatedPhoto.favorite = req.body.favorite;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
    res.send(designatedPhoto);
  }
  res.end();
});

router.post("/setPrivate", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let designatedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    designatedPhoto.isPrivate = req.body.isPrivate;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
    res.send(designatedPhoto);
  }
  res.end();
});

router.post("/setCategories", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let designatedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    designatedPhoto.categories = req.body.categories;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
    res.send(designatedPhoto);
  }
  res.end();
});

router.post("/setName", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let designatedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    designatedPhoto.caption = req.body.name;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
    res.send(designatedPhoto);
  }
  res.end();
});

router.post("/setDeprecated", async (req, res) => {
  jsonFile = await setJsonFileIfNotExist();
  if (jsonFile.length) {
    let designatedPhoto = jsonFile.find((photo) => photo.id == req.body.id);
    designatedPhoto.linkDeprecated = true;
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonFile));
    res.send(designatedPhoto);
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

router.get("/photos-from-web", async (req, res) => {
  if (req.query.query) {
    res.send(
      (
        await got(
          process.env.PIXABAY_API_URL +
            `&q=${req.query.query}&per_page=${req.query.amountOfResults}`
        )
      ).body
    );
  } else res.status(400).send("no query provided");
});

const addFileToDB = async (photo) => {
  // const uploadBlob = await BlockBlobClient.upload(photo)
  let res = photo.url.replace(/^data:image\/\w+;base64,/, "");
  let buf = Buffer.from(res, "base64");
  let PhotoAbsoluteUrl = path.join(imagesDir, photo.caption);
  await fs.writeFile(PhotoAbsoluteUrl, buf);
  photo.url = photo.caption;
};

const checkIfExistsInJson = async (fileName, jsonFile) => {
  return new Promise((resolve) => {
    if (jsonFile.length)
      if (jsonFile.find((photo) => photo.url === fileName)) resolve(true);
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
