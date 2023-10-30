const { ChatRoom } = require("../models")
exports.createRoom = async (req, res) => {
	try {
		room = await ChatRoom.create({
			room: 123,
			createdBy: req.user.id
		});
		return res.status(201).json({ room });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};