const express = require("express");
const messageController = require("../controllers/messageController");
const { protect, isRoomUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send", protect, isRoomUser, messageController.sendMessage);
router.get("/history/:room", protect, isRoomUser, messageController.getHistory);

module.exports = router;