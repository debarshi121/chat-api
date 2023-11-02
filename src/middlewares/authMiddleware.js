const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { User, ChatRoom } = require("../models");

const protect = (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return res.status(401).json({ error: "You are not logged in!" });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		req.user = decoded;
		return next();
	});
};

const isRoomUser = async (req, res, next) => {
	try {
		let room;

		if (req.body && req.body.room) {
			room = req.body.room;
		} else if (req.params && req.params.room) {
			room = req.params.room;
		}

		const user = await User.findByPk(req.user.id, {
			include: ChatRoom,
		});

		if (user) {
			const chatRooms = user.ChatRooms;
			const isAssociatedWithRoom = chatRooms.some((chatRoom) => chatRoom.room === room);

			if (isAssociatedWithRoom) {
				return next();
			}
		}
		return res.status(403).json({ error: "You are not authorized to perform this!" });
	} catch (error) {
		throw error;
	}
};

module.exports = { protect, isRoomUser };
