const express = require("express");
const validateBody = require("../helpers/validateBody");
const { createContactSchema, updateContactSchema } = require("../models/contact");
const contacts = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

// contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contacts.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), contacts.updateContact);

module.exports = contactsRouter;
