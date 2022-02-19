const serverConfig = require("../configs/server.config");

const NODE_ENV = serverConfig.NODE_ENV || "development";

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	// if acceptable, will show unhandled error messages
	if (NODE_ENV === "development") {
		console.log(err.message);
		console.log(err.stack);
	}

	res.status(err.statusCode).json({
		status: err.status,
		message: err.isOperational ? err.message : "Внутренняя ошибка",
	});
};
