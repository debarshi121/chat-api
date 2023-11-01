const config = require("./config");
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const PORT = config.SERVER.PORT;
const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const authRouter = require("./routes/authRoutes");
const chatRoomRouter = require("./routes/chatRoomRoutes");
const messageRouter = require("./routes/messageRoutes");

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/chatroom`, chatRoomRouter);
app.use(`/api/v1/message`, messageRouter);

app.all("*", (req, res) => {
	res.status(404).json({ message: "Page not found!" });
});

app.listen(PORT, async () => {
	try {
		console.log(`Server running on port: ${PORT}`);
		await sequelize.authenticate();
		console.log("DB connected!");
		await sequelize.sync();
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.log(error);
	}
});
