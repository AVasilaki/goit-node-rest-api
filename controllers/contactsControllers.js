const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const Joi = require("joi");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }, "", { skip, limit }).populate("owner", "name _id subscription email");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { id } = req.params;

    const result = await Contact.findOne({ _id: id, owner: _id }).populate("owner", "_id subscription email name");
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
    const { _id } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndDelete({ _id: id, owner: _id }).populate("owner", "_id subscription email");
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
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id, owner: _id }, req.body, { new: true }).populate(
      "owner",
      "_id subscription email"
    );
    function isEmpty(data) {
      for (let key in data) {
        return false;
      }
      return true;
    }
    const empty = isEmpty(req.body);

    if (empty) {
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
    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate({ _id: id, owner: _id }, req.body, { new: true }).populate(
      "owner",
      "_id subscription email"
    );

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
