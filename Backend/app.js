const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const router = require("./routes");
const selectErrors = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const enableCors = require("./middlewares/cors");
const mime = require("mime");

const { PORT = 3003, DB_URL = "mongodb://127.0.0.1:27017/modelsdb" } =
  process.env;
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect(DB_URL);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(enableCors);

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  // Определение типа файла на основе его расширения
  const contentType = mime.getType(filePath);

  // Установка правильного Content-Type заголовка
  res.setHeader("Content-Type", contentType);

  // Отправка файла обратно клиенту
  res.sendFile(filePath, { root: __dirname }, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File not found");
    }
  });
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(selectErrors);

app.listen(PORT, () => {
  console.log(`start server at port ${PORT}`);
});
