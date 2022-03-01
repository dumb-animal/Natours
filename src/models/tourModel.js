const mongoose = require("mongoose");
const slugify = require("slugify");

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A tour must have a name"],
			unique: true,
			trim: true,
		},
		slug: {
			type: String,
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
			enum: {
				values: ["easy", "medium", "difficult"],
				message: "Difficulty is either: easy, medium, difficult",
			},
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1"],
			max: [5, "rating must be below 5"],
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
			validate: {
				validator: function (discount) {
					return discount < this.price;
				},
				message: "Discount price ({VALUE}) should be below regular price",
			},
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
		isSecret: {
			type: Boolean,
			default: false,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.virtual("durationWeeks").get(function () {
	return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: run before .save() and .create()
schema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// DOCUMENT MIDDLEWARE: run after .save() and .create()
// schema.post("save", function (doc, next) {});

// QUERY MIDDLEWARE
// schema.pre("find", function (next) {
schema.pre(/^find/, function (next) {
	this.find({ isSecret: { $ne: true } });
	next();
});

// AGGREGATION MIDDLEWARE
schema.pre("aggregate", function (next) {
	this.pipeline().unshift({ $match: { isSecret: { $ne: true } } });
	next();
});

module.exports = mongoose.model("Tour", schema);
