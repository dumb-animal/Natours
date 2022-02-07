// LOADING .ENV FILE
require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello json!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });

app.get('/api/v1/touts', (req, res) => {});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
