const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

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
      required: [(true, "Set password for user")],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
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
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});
const updateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const User = model("user", userSchema);

const schemas = { loginSchema, registerSchema, updateSubscription };

module.exports = {
  User,
  schemas,
};
