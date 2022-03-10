const User = require("../models/userModel");

const errorsConfig = require("../configs/errors.config");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

class UserController {
	getAllUsers = catchAsync(async (req, res, next) => {
		const users = await User.find();

		res.status(200).json({
			status: "success",
			results: users.length,
			data: { users },
		});
	});

	getUser = catchAsync(async (req, res, next) => { });

	createUser = catchAsync(async (req, res, next) => { });

	updateUser = catchAsync(async (req, res, next) => { });

	deleteUser = catchAsync(async (req, res, next) => { });
}

module.exports = new UserController();
