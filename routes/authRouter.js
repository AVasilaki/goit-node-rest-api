const express = require("express");
const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/authControllers");
const authentificate = require("../middlewares/authentificate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout);

module.exports = router;
