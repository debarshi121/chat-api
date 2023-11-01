const { v4: uuidv4 } = require("uuid");
const { chatRoomService } = require("../services");

const createRoom = async (req, res) => {
	try {
		const chatRoom = await chatRoomService.create(uuidv4(), req.user.id);
		return res.status(201).json(chatRoom);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const joinRoom = async (req, res) => {
	try {
		const { room } = req.body;

		const joinedRoom = await chatRoomService.join(room, req.user.id);

		return res.status(201).json(joinedRoom);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createRoom,
	joinRoom,
};
