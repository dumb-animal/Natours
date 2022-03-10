const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// name email photo password passwordConfirm
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: validator.isEmail,
	},
	photo: {
		type: String,
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "guide", "lead-guide", "admin"],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		// select: false, // Возвращается поле при поиске или нет
	},
	passwordConfirm: {
		type: String,
		required: true,
		validate: {
			validator: function (el) {
				return el === this.password;
			},
		},
	},
	passwordChangedAt: {
		type: Date,
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});

schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.passwordConfirm = undefined;
});

schema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

schema.methods.correctPassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

schema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
		return changedTimestamp >= JWTTimestamp;
	}
	return false;
};

schema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 минут

	return resetToken;
}

module.exports = mongoose.model("User", schema);
