const app = require("./src/app");

const serverConfig = require("./src/configs/server.config");

const PORT = serverConfig.PORT || 3000;
const HOST = serverConfig.HOST || "localhost";

app.listen(PORT, HOST, () => console.log(`App running on ${HOST}:${PORT}...`));
