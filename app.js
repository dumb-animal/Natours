// LOADING .ENV FILE
require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();

// MIDDLEWARE
app.use(express.json());

const PORT = process.env.PORT || 3000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
   });
});

app.post('/api/v1/tours', (req, res) => {
   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({ id: newId }, req.body);

   tours.push(newTour);

   res.status(200).json({
      status: 'success',
      data: { tour: newTour },
   });
});

app.get('/api/v1/tours/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const tour = tours.find((el) => el.id === id);

   if (tour) {
      res.status(200).json({
         status: 'success',
         data: { tour },
      });
   } else {
      res.status(404).json({
         status: 'fail',
         massage: 'Not Found',
      });
   }
});

app.listen(PORT, () => {
   console.log(`App running on port ${PORT}...`);
});
