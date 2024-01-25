const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  phone: Joi.string().required().min(5),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
});

module.exports = { createContactSchema, updateContactSchema };
