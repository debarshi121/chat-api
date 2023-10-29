const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.signup = async (req, res) => {
	try {
		let user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (user) {
			return res.status(400).send({ error: "Email already exists." });
		}

		user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		return res.status(201).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).send({ error: "User Not found." });
		}

		const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

		if (!isPasswordValid) {
			return res.status(401).send({ error: "Password not valid." });
		}

		const token = jwt.sign({ id: user.id }, JWT_SECRET, {
			algorithm: "HS256",
			allowInsecureKeySizes: true,
			expiresIn: 86400, // 24 hours
		});

		return res.status(200).json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
