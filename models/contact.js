const Joi = require("joi");
const { Schema, model } = require("mongoose");

const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  phone: Joi.string().required().min(5),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, date, next) => {
  console.log(error);
  error.status = 400;
  next();
});

const Contact = model("contact", contactSchema);

module.exports = { createContactSchema, updateContactSchema, updateFavoriteSchema, Contact };
