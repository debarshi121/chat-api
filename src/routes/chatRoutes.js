const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/room/create", chatController.createRoom);

module.exports = router;