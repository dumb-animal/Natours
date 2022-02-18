const Tour = require("../models/tourModel");

const errorsConfig = require("../configs/errors.config");

const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

class TourController {
	createTour = catchAsync(async (req, res, next) => {
		const newTour = await Tour.create(req.body);

		res.status(200).json({
			status: "success",
			data: { tour: newTour },
		});
	});

	getAllTours = catchAsync(async (req, res, next) => {
		const tours = await Tour.find();

		res.status(200).json({
			status: "success",
			data: { results: tours.length, tours },
		});
	});

	getTour = catchAsync(async (req, res, next) => {
		const tour = await Tour.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: { tour },
		});
	});

	updateTour = catchAsync(async (req, res, next) => {
		const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		});

		res.status(200).json({
			status: "success",
			data: { tour: updatedTour },
		});
	});

	deleteTour = catchAsync(async (req, res, next) => {
		const deletedTour = await Tour.findByIdAndDelete(req.params.id, req.body);

		res.status(200).json({
			status: "success",
			data: { tour: deletedTour },
		});
	});
}

module.exports = new TourController();
