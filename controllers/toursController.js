const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.checkID = (req, res, next, val) => {
   console.log('ID: ', val);
   if (val >= tours.length) {
      return res.status(404).json({
         status: 'fail',
         massage: 'Ivalid ID',
      });
   }
   next();
};
exports.checkBody = (req, res, next) => {
   if (!req.body.name || !req.body.price) {
      return res.status(400).json({
         status: 'fail',
         massage: 'Missing name or price',
      });
   }
   next();
};
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
   const id = req.params.id;
   const tour = tours.find((el) => el.id === id);
   res.status(200).json({
      status: 'success',
      data: { tour },
   });
};
exports.updateTour = (req, res) => {
   const modifiedTour = req.body;
   res.status(200).json({
      status: 'success',
      data: { tour: modifiedTour },
   });
};
exports.deleteTour = (req, res) => {
   // 204 No Content - запрос успешный, но не возвращает никаких данных.
   res.status(204).json({
      status: 'success',
      data: null,
   });
};
