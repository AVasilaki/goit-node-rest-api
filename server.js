const app = require("./app");
const mongooss = require("mongoose");
const { DB_HOST } = process.env;

mongooss
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })

  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
