import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3002;
const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.all("*", (req, res) => {
	res.status(404).json({ message: "Page not found!" });
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
 