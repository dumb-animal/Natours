module.exports = class appError extends Error {
	constructor(errorObject) {
		super(errorObject.message);
		this.statusCode = errorObject.statusCode;
		this.status = this.statusCode >= 500 ? "error" : "fail";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
};
