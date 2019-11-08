const path = require("path");
const express = require("express");

const publicDirectoryPath = path.join(__dirname, "..", "public");
const googleStorageRouter = require("./routers/googleStorageRouter");
const app = express();

app.use(express.json());
app.use(googleStorageRouter);
app.use(express.static(publicDirectoryPath));

module.exports = app;
