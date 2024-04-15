const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const { authorization } = require("../middleware/authMiddleware");

const chatRouter = express.Router();

chatRouter.post("/", authorization, accessChat);
chatRouter.get("/", authorization, fetchChats);
chatRouter.post("/group", authorization, createGroupChat);
chatRouter.put("/rename", authorization, renameGroup);
chatRouter.put("/groupadd", authorization, addToGroup);
chatRouter.put("/groupremove", authorization, removeFromGroup);

module.exports = chatRouter;
