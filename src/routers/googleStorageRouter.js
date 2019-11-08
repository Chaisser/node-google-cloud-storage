const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  listGoogleStorageFiles,
  downloadGoogleStorageFile,
  uploadGoogleStorageFile,
  makePublicFiles
} = require("./../utils/googleStorageFunctions");

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 //4mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be an image"));
    }
    cb(undefined, true);
  }
});

router.get("/files", async (req, res) => {
  const files = await listGoogleStorageFiles();
  if (files) {
    return res.send(files);
  }

  return res.status(400).send({ status: "error" });
});

router.get("/download/:file", async (req, res) => {
  const fileName = req.params.file;
  if (!fileName) {
    return res.status(401).send({
      status: "error",
      message: "File name is required"
    });
  }

  try {
    const file = await downloadGoogleStorageFile(fileName);
    res.send(file);
  } catch (error) {
    res.status(401).send({ status: "error", message: "File not found" });
  }
});

router.post("/upload", upload.array("file"), async (req, res) => {
  if (req.files.length === 0) {
    return res.status(401).send({
      status: "error",
      message: "At least one file is required"
    });
  }
  const uploadedFiles = [];
  const errors = [];

  await Promise.all(
    req.files.map(async file => {
      const uploadFile = await uploadGoogleStorageFile(file);
      if (uploadFile.status === "success") {
        delete uploadFile.status;
        uploadedFiles.push(uploadFile);
      } else {
        delete uploadFile.status;
        errors.push(uploadFile);
      }
    })
  );

  res.send({
    status: "success",
    message: `${uploadedFiles.length} file(s) uploaded and ${errors.length} file(s) not uploaded`,
    uploadedFiles,
    errors
  });
});

router.post("/makePublic/:file", async (req, res) => {
  const fileName = req.params.file;
  try {
    const changeFilePermission = await makePublicFiles(fileName);

    if (changeFilePermission) {
      return res.send({
        status: "success",
        message: `${fileName} is now public access`
      });
    }
    res.status(401).send({
      status: "error",
      message: "File not found"
    });
  } catch (error) {
    res.status(401).send({
      status: "error",
      message: error
    });
  }
});

module.exports = router;
