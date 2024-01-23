const express = require("express");

const contacts = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post("/", contacts.createContact);

contactsRouter.put("/:id", contacts.updateContact);

module.exports = contactsRouter;
