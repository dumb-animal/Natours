require('dotenv').config({ path: './configs/.env' }); // Loading .env file

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`App running on port ${PORT}...`);
});
