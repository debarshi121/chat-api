const { messageService } = require("../services");

const sendMessage = async (req, res) => {
	try {
		const { room, message } = req.body;
		const newMessage = await messageService.create(room, req.user.id, message);
		return res.status(201).json(newMessage);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getHistory = async (req, res) => {
	try {
		const { room } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const messages = await messageService.getMessagesByRoom(room, page, limit);
		return res.status(200).json(messages);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	sendMessage,
	getHistory,
};
