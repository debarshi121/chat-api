const express = require("express");
const authController = require("../controllers/authController");
const signupValidator = require("../middlewares/signupValidator");
const loginValidator = require("../middlewares/loginValidator");

const router = express.Router();

router.post("/signup", signupValidator, authController.signup);
router.post("/login", loginValidator, authController.login);

module.exports = router;