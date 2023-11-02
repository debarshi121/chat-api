const { Server, Socket } = require("socket.io");

const initializeSocketIO = (io) => {
	return io.on("connection", async (socket) => {
        console.log('socket is ready for connection');
		try {
			// const token = socket.handshake.auth?.token;

            // console.log(socket);

            // return socket;

			// if (!token) {
			// 	// Token is required for the socket to work
			// 	throw new Error(401, "Un-authorized handshake. Token is missing");
			// }

			// const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // decode the token

			// const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

			// // retrieve the user
			// if (!user) {
			// 	throw new ApiError(401, "Un-authorized handshake. Token is invalid");
			// }
			// socket.user = user; // mount te user object to the socket

			// // We are creating a room with user id so that if user is joined but does not have any active chat going on.
			// // still we want to emit some socket events to the user.
			// // so that the client can catch the event and show the notifications.
			// socket.join(user._id.toString());
			// socket.emit(ChatEventEnum.CONNECTED_EVENT); // emit the connected event so that client is aware
			// console.log("User connected 🗼. userId: ", user._id.toString());

			// // Common events that needs to be mounted on the initialization
			// mountJoinChatEvent(socket);
			// mountParticipantTypingEvent(socket);
			// mountParticipantStoppedTypingEvent(socket);

			// socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
			// 	console.log("user has disconnected 🚫. userId: " + socket.user?._id);
			// 	if (socket.user?._id) {
			// 		socket.leave(socket.user._id);
			// 	}
			// });
		} catch (error) {
			// socket.emit(ChatEventEnum.SOCKET_ERROR_EVENT, error?.message || "Something went wrong while connecting to the socket.");
		}
	});
};

module.exports = { initializeSocketIO };
