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
const sendEmail = require("../utils/email");


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
		const isProvided = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
		if (!isProvided) throw new AppError(errorsConfig.tokenNotProvided);

		const token = req.headers.authorization.split(" ")[1];
		if (!token) throw new AppError(errorsConfig.tokenNotProvided);

		// 2) Verification token
		const decoded = await promisify(jwt.verify)(token, secret).catch(
			(err) => new AppError(errorsConfig.invalidToken)
		);

		// 3) Check if user still exists
		const user = await User.findById(decoded.id);
		if (!user) throw new AppError(errorsConfig.userNotExist);

		// 4) Check if user change password after the token was issued
		if (user.changedPasswordAfter(decoded.iat)) throw new AppError(errorsConfig.passwordWasChanged);

		req.user = user;
		next();
	});

	restrictTo = (...roles) =>
		catchAsync(async (req, res, next) => {
			if (!roles.includes(req.user.role)) throw new AppError(errorsConfig.noPermission);
			next();
		});

	forgotPassword = catchAsync(async (req, res, next) => {
		// 1) Get user based on POSTed email
		const user = await User.findOne({ email: req.body.email });
		if (!user) throw new AppError(errorsConfig.userNotExist);

		// 2) Generate the random reset token
		const token = user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });

		// 3) Send it to user's email
		const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${token}`
		console.log(resetURL)

		await sendEmail({
			email: user.email,
			subject: "Reset Password",
			message: resetURL
		}).catch(async (err) => {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });
			throw new AppError(errorConfig.mailError);
		})

		res.status(200).json({ status: "success", data: { token } });
	})

	resetPassword = catchAsync(async (req, res, next) => {
	})
}

module.exports = new AuthController();
