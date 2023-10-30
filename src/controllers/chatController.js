const { ChatRoom } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.createRoom = async (req, res) => {
	try {
		room = await ChatRoom.create({
			room: uuidv4(),
			createdBy: req.userId,
		});
		return res.status(201).json({ room });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.joinRoom = async (req, res) => {
	try {
		return res.status(201).json({});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};