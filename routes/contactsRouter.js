const express = require("express");
const validateBody = require("../helpers/validateBody");
const { createContactSchema, updateContactSchema, updateFavoriteSchema } = require("../models/contact");
const contacts = require("../controllers/contactsControllers");
const isValidId = require("../middlewares/isValidId");

const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", isValidId, contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contacts.createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), contacts.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), contacts.updateStatusContact);

module.exports = contactsRouter;
