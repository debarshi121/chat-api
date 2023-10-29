const { ChatRoom } = require("../models")
exports.createRoom = (req, res) => {
	try {

	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};