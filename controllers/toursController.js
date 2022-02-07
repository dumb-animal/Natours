const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
   });
};
exports.createTour = (req, res) => {
   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({ id: newId }, req.body);

   tours.push(newTour);
   // 201 Created - запрос успешный, и привел к созданию нового ресурса.
   res.status(201).json({
      status: 'success',
      data: { tour: newTour },
   });
};
exports.getTour = (req, res) => {
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
};
exports.updateTour = (req, res) => {
   const id = parseInt(req.params.id);
   const modifiedTour = req.body;
   const tour = tours.find((el) => el.id === id);

   if (tour) {
      res.status(200).json({
         status: 'success',
         data: { tour: modifiedTour },
      });
   } else {
      res.status(404).json({
         status: 'fail',
         massage: 'Not Found',
      });
   }
};
exports.deleteTour = (req, res) => {
   const id = parseInt(req.params.id);

   if (id >= tours.length) {
      res.status(404).json({
         status: 'fail',
         massage: 'Not Found',
      });
   } else {
      // 204 No Content - запрос успешный, но не возвращает никаких данных.
      res.status(204).json({
         status: 'success',
         data: null,
      });
   }
};
