const express = require("express");
const contactsRouter = require("./routes/contactsRouter");
require("dotenv").config();
const app = express();
const DB_HOST =
  "mongodb+srv://Oleksandr:3bDefBrne2d1BVeb@cluster0.m7p62sz.mongodb.net/contacts_holder?retryWrites=true&w=majority";
mongooss
  .connect(DB_HOST)
  .then(() => console.log("Database connect succes"))
  .catch((error) => console.log(error.message));
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
