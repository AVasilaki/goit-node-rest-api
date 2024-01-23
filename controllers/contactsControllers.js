const contactsService = require("../services/contactsServices");

// const express = require("express");

const getAllContacts = async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const getOneContact = (req, res) => {};

const deleteContact = (req, res) => {};

const createContact = (req, res) => {};

const updateContact = (req, res) => {};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
