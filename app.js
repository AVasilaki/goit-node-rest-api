const express = require("express");
const contactsRouter = require("./routes/contactsRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
