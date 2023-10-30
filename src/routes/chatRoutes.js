const express = require("express");
const chatController = require("../controllers/chatController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/room/create", protect, chatController.createRoom);
router.post("/room/join", protect, chatController.joinRoom);

module.exports = router;