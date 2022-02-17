const serverConfig = require("../configs/server.config");

const NODE_ENV = serverConfig.NODE_ENV || "development";

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	// if acceptable, will show unhandled error messages
	const isAcceptable = NODE_ENV === "development" && !err.isOperational;

	res.status(err.statusCode).json({
		status: err.status,
		message: isAcceptable ? err.message : "Внутренняя ошибка",
	});
};
