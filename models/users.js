const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

// const emailRegexp = /^[w-.]+@([w-]+.)+[w-]{2,4}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: emailRegex,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).pattern(emailRegex),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

const schemas = { loginSchema, registerSchema };

module.exports = {
  User,
  schemas,
};
