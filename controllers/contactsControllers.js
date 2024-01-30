const contactsService = require("../services/contactsServices");
const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const Joi = require("joi");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.removeContact(id);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const createContact = async (req, res, next) => {
  console.log("🚀 ~ createContact ~ req:", req.body);
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsService.updateById(id, req.body);

    if (result === "empty") {
      return res.status(400).json({ message: "Body must have at least one field" });
    }
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  // deleteContact,
  createContact,
  updateContact,
};
