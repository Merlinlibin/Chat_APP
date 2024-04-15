const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { authorization } = require("../middleware/authMiddleware");

const messageRouter = express.Router();

messageRouter.get("/:chatId", authorization, allMessages);
messageRouter.post("/", authorization, sendMessage);

module.exports = messageRouter;
