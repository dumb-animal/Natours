const express = require('express');
const router = express.Router();

const toursController = require('../controllers/toursController');

const {
   getAllTours,
   createTour,
   getTour,
   updateTour,
   deleteTour,
   checkID,
   checkBody,
} = toursController;

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
