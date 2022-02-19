const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A tour must have a name"],
		unique: true,
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, "A tour must have a duration"],
	},
	maxGroupSize: {
		type: Number,
		required: [true, "A tour must have a grop size"],
	},
	difficulty: {
		type: String,
		required: [true, "A tour must have a difficulty"],
		trim: true,
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: [true, "A tour must have a price"],
	},
	priceDiscount: {
		type: Number,
	},
	summary: {
		type: String,
		trim: true,
		required: [true, "A tour must have a summary"],
	},
	description: {
		type: String,
		trim: true,
	},
	imageCover: {
		type: String,
		required: [true, "A tour must have a cover image"],
	},
	images: {
		type: [String],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false, //Не возвращает поле createdAt при запросе
	},
	startDates: {
		type: [Date],
	},
});

module.exports = mongoose.model("Tour", schema);
