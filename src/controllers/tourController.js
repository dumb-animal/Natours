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
		// BUILD QUERY
		// 1) Filtering
		let query = { ...req.query };
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach((field) => delete query[field]);

		// 2) Advanced filtering
		// Получаем: {difficult: 'easy', duration: { gte: 5 }}
		// Необходимо: {difficult: 'easy', duration: { $gte: 5 }}
		// gte, gt, lte, lt,
		query = JSON.stringify(query);
		query = query.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);
		query = JSON.parse(query);

		let result = Tour.find(query);

		// 3) Sorting
		// Пример: "maxGroupSize -ratingsAverage" - сперва сортирует по размеру
		// группы от меньшего к большему, и если размеры одинаковы то сортирует их
		// по среднему рейтингу с больше к меньшему. "-" означает инверсию.
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			result = result.sort(sortBy);
		} else {
			result = result.sort("-createdAt");
		}

		// 4) Field limiting
		//  "name price" - вернет только поля name и price
		//  "-__v" - вернет все поля кроме __v
		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			result = result.select(fields);
		} else {
			result = result.select("-__v");
		}

		// 5) Pagination
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;

		result = result.skip(skip).limit(limit);

		if (req.query.page) {
			const numberTours = await Tour.countDocuments();
			if (skip >= numberTours) throw new appError(errorsConfig.PageNotExist);
		}

		// EXECUTE QUERY

		const tours = await result;

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

	aliasTopTours = catchAsync(async (req, res, next) => {
		req.query.limit = "5";
		req.query.sort = "-ratingAverage,price";
		req.query.ratingsQuantity = { gte: "50" };
		next();
	});
}

module.exports = new TourController();
