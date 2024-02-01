const handleMongooseError = (error, date, next) => {
  console.log(error);
  error.status = 400;
  next();
};

module.exports = handleMongooseError;
