const { User } = require("../models");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.signup = async (req, res) => {
	try {
		const signupSchema = Joi.object({
			name: Joi.string().min(3).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
			confirmPassword: Joi.ref("password"),
		}).with("password", "confirmPassword");

		const { error } = signupSchema.validate(req.body);

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		const user = await User.create({
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
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});

		const { error } = loginSchema.validate(req.body);

		if (error) {
			return res.status(400).json({ error: error.message });
		}

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
