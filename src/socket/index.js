const { userService } = require("../services");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
=======
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

>>>>>>> d08a460f0d08a93a842b36db9c497ee299de663c
const initializeSocketIO = (io) => {
	try {
		io.on("connection", async (socket) => {
			await decryptAndStoreUserData(socket, io);

<<<<<<< HEAD
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
=======
			socket.emit("connected", "You are connected!");
			console.log("User connected -> userId:", socket.user?.id);
>>>>>>> d08a460f0d08a93a842b36db9c497ee299de663c

			socket.on("disconnect", () => {
				console.log("User disconnected -> userId:", socket.user?.id);
				socket.leave(socket.user?.id);
			});
<<<<<<< HEAD
		} catch (error) {
			console.log(error.message);
		}
	});
};

const emitSocketEvent = (req, room, event, payload) => {
	req.app.get("io").in(room).emit(event, payload);
=======
		});
	} catch (error) {
		console.log(error.message);
	}
>>>>>>> d08a460f0d08a93a842b36db9c497ee299de663c
};

module.exports = { initializeSocketIO, emitSocketEvent };
