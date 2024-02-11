const { User } = require("../models/users");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, "../", "public", "avatars");
console.log("🚀 ~ avatarDir:", avatarDir);

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "email already in use ");
  }

  const avatarUrl = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "email or password is not valid");
  }
  const compearePassword = await bcrypt.compare(password, user.password);
  if (!compearePassword) {
    throw HttpError(401, "email or password is not valid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email: user.email, subscription: user.subscription } });
};

const getCurrent = (req, res) => {
  const { email, name, subscription } = req.user;
  res.json({
    email,
    name,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ massage: "logout success" });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription: subscription });
  res.json({ massage: `update subscription to ${subscription}` });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  // console.log("🚀 ~ updateAvatar ~ _id:", _id);
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  // console.log("🚀 ~ updateAvatar ~ tempUpload:", tempUpload);
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.json({ avatarUrl });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
