const express = require('express');
const router = express.Router();

const toursController = require('../controllers/toursController');

const { getAllTours, createTour, getTour, updateTour, deleteTour } =
   toursController;

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
