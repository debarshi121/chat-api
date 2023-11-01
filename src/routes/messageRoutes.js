const express = require("express");
const messageController = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// isRoomUser
router.post("/send", protect, messageController.sendMessage);
router.get("/history", protect, messageController.getHistory);

module.exports = router;