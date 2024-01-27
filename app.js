const express = require("express");
const contactsRouter = require("./routes/contactsRouter");
const mongooss = require("mongoose");

const app = express();
const DB_HOST =
  "";
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

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
