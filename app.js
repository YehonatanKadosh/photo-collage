const express = require("express");
const app = express();
const photos = require("./routes/photos");
const user = require("./routes/user");
const notFound = require("./routes/notFound");
const cors = require("cors");

app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/Photos", photos);
app.use("/User", user);
app.use(express.static("Images"));
app.use("/**", notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("app is Up");
});
