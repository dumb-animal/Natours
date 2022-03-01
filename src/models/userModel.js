const mongoose = require("mongoose");
const validator = require("validator");
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
});

schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.passwordConfirm = undefined;
});

schema.methods.correctPassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", schema);
