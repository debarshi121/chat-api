const { userService } = require("../services");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const mountJoinRoomEvent = (socket) => {
	socket.on("joinedRoom", (room) => {
		console.log(`User joined the room: `, room);
		socket.join(room);
		socket.to(room).emit('UserJoinedRoom', socket.user);
	});
};

const emitSocketEvent = (req, room, event, payload) => {
	req.app.get("io").in(room).emit(event, payload);
};

const decryptAndStoreUserData = async (socket, io) => {
	try {
		const token = socket.handshake.headers.token;
		const decodedToken = jwt.verify(token, JWT_SECRET);
		const user = await userService.getUserById(decodedToken?.id);
		if (!user) {
			throw new Error(401, "Un-authorized handshake. Token is invalid");
		}
		socket.user = user;
	} catch (error) {
		throw error;
	}
};

const initializeSocketIO = (io) => {
	try {
		io.on("connection", async (socket) => {
			await decryptAndStoreUserData(socket, io);

			socket.emit("connected", "You are connected!");
			console.log("User connected -> userId:", socket.user?.id);

			mountJoinRoomEvent(socket);

			socket.on("disconnect", (reason) => {
				console.log("User disconnected -> userId:", socket.user?.id);
				if (socket.user?.id) {
					socket.leave(socket.user.id);
				}
			});
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { initializeSocketIO, emitSocketEvent };
