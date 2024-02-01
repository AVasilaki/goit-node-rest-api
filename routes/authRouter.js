const express = require("express");
const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/authControllers");
// console.log("🚀 ~ schemas:", schemas.loginSchema);

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
