const Joi = require("joi");

const signupValidator = (req, res, next) => {
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

    return next();
};

module.exports = signupValidator;