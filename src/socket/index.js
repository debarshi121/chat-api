const { userService } = require("../services");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const initializeSocketIO = (io) => {
	return io.on("connection", async (socket) => {
		try {
			const token = socket.handshake.headers.token;

			if (!token) {
				throw new Error(401, "Un-authorized handshake. Token is missing");
			}

			const decodedToken = jwt.verify(token, JWT_SECRET);

			const user = await userService.getUserById(decodedToken?.id);

			if (!user) {
				throw new Error(401, "Un-authorized handshake. Token is invalid");
			}
			socket.user = user;
			console.log("User connected -> userId:", user.id);
			socket.join(user.id.toString());

			socket.on("disconnect", () => {
				console.log("User disconnected -> userId:", socket.user?.id);
				socket.leave(socket.user?.id);
			});
		} catch (error) {
			console.log(error.message);
		}
	});
};

const emitSocketEvent = (req, room, event, payload) => {
	req.app.get("io").in(room).emit(event, payload);
};

module.exports = { initializeSocketIO, emitSocketEvent };
