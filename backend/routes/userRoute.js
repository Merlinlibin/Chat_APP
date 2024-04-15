const express = require("express");
const {
  registeredUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { authorization } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.get("/", authorization, allUsers);
userRouter.post("/", registeredUser);
userRouter.post("/login", authUser);

module.exports = userRouter;
