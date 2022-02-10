const express = require('express');

const router = express.Router();

const routesConfig = require('../configs/routesConfig');
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

router
   .route(routesConfig.tours.getAll)
   .get(getAllTours)
   .post(checkBody, createTour);
router
   .route(routesConfig.tours.getOne)
   .get(getTour)
   .patch(updateTour)
   .delete(deleteTour);

module.exports = router;
