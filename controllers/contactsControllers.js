const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const Joi = require("joi");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }, "", { skip, limit }).populate("owner", "name");
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

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    console.log("🚀 ~ createContact ~ owner:", owner);
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

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

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

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
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
