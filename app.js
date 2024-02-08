const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./routes/contactsRouter");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
