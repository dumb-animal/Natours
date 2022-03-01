// MODULES
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// MODELS
const User = require("../models/userModel");

// CONFIGS
const errorsConfig = require("../configs/errors.config");
const { secret, expiration } = require("../configs/token.config");

// UTILS
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => jwt.sign({ id }, secret, { expiresIn: expiration });

class AuthController {
	signup = catchAsync(async (req, res, next) => {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		const token = signToken(newUser._id);

		res.status(200).json({ status: "success", data: { user: newUser, token } });
	});

	login = catchAsync(async (req, res, next) => {
		const { email, password } = req.body;

		//  1) Check if email an password exist
		if (!email || !password) throw new AppError(errorsConfig.invalidData);

		// 2) Check if user exists && password is correct
		const user = await User.findOne({ email });
		const isCorrect = await user.correctPassword(password);
		if (!isCorrect) throw new AppError(errorsConfig.incorrectData);

		// 3) If everything ok, send token to client
		const token = signToken(user._id);

		res.status(200).json({ status: "success", data: { user, token } });
	});

	isAuthorized = catchAsync(async (req, res, next) => {
		// 1) Getting token and check of it's there
		const isProvided =
			req.headers.authorization &&
			req.headers.authorization.startWith("Bearer");
		if (!isProvided) throw new AppError(errorsConfig.tokenNotProvided);

		const token = req.headers.authorization.split(" ")[1];
		if (!token) throw new AppError(errorsConfig.tokenNotProvided);

		// 2) Verification token
		const { id } = await promisify(jwt.verify)(token, secret).catch(
			(err) => new AppError(errorsConfig.invalidToken)
		);

		// 3) Check if user still exists
		const user = await User.findById(id);
		if (!user) throw new AppError(errorsConfig.userNotExist);

		// 4) Check if user change password after the token was issued

		next();
	});
}

module.exports = new AuthController();
