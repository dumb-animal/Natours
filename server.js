const mongoose = require("mongoose");
const app = require("./src/app");

const dbConfig = require("./src/configs/db.config");
const serverConfig = require("./src/configs/server.config");

const PORT = serverConfig.PORT || 3000;
const HOST = serverConfig.HOST || "localhost";

const uri = dbConfig.uri.replace("<PASSWORD>", dbConfig.password);

mongoose.connect(uri).then(() => {
	console.log("DB connection successful!");
	app.listen(PORT, HOST, () =>
		console.log(`App running on ${HOST}:${PORT}...`)
	);
});
