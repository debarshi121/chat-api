const config = require("./config");
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const { sync } = require("./models");

const PORT = config.SERVER.PORT;
const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.all("*", (req, res) => {
	res.status(404).json({ message: "Page not found!" });
});

app.listen(PORT, async () => {
	try {
		console.log(`Server running on port: ${PORT}`);
		await sequelize.authenticate();
		sync();
	} catch (error) {
		console.log(error);
	}
});
