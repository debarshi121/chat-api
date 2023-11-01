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

module.exports = {
	sendMessage,
};