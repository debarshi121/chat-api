const { Message } = require("../models");

const create = async (room, userId, message) => {
	try {
		message = await Message.create({
			room,
			message,
			sentBy: userId,
		});

		return message;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	create,
};
