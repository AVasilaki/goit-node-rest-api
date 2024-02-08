const express = require("express");
const validateBody = require("../helpers/validateBody");
const { createContactSchema, updateContactSchema, updateFavoriteSchema } = require("../models/contact");
const contacts = require("../controllers/contactsControllers");
const isValidId = require("../middlewares/isValidId");
const authentificate = require("../middlewares/authentificate");

const contactsRouter = express.Router();

contactsRouter.get("/", authentificate, contacts.getAllContacts);

contactsRouter.get("/:id", authentificate, isValidId, contacts.getOneContact);

contactsRouter.delete("/:id", authentificate, isValidId, contacts.deleteContact);

contactsRouter.post("/", authentificate, validateBody(createContactSchema), contacts.createContact);

contactsRouter.put("/:id", authentificate, isValidId, validateBody(updateContactSchema), contacts.updateContact);

contactsRouter.patch(
  "/:id/favorite",
  authentificate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contacts.updateStatusContact
);

module.exports = contactsRouter;
