const express = require("express");
const chatRoomController = require("../controllers/chatRoomController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", protect, chatRoomController.createRoom);
router.post("/join", protect, chatRoomController.joinRoom);
router.delete("/delete/:room", protect, chatRoomController.deleteRoom);

module.exports = router;