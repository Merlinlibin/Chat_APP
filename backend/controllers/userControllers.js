const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registeredUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password)
      return res.status(400).send({ error: "please Enter all fields" });

    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).send({ error: "Email is already taken." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send({ error: "Failed to create user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed  to connect" });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        return res.status(401).json({
          message: "password is incorrect",
        });
      }
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res
        .status(400)
        .send({ error: "User dosent exist, Please signup and continue" });
    }
  } catch (error) {}
};

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  return res.send(users);
};

module.exports = { registeredUser, authUser, allUsers };
