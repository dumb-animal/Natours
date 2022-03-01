const express = require("express");

const router = express.Router();

const { tourRoutes } = require("../configs/routes.config");

const tourController = require("../controllers/tourController");
const { isAuthorized } = require("../controllers/authController");

router
	.route(tourRoutes.topFive)
	.get(tourController.aliasTopTours, tourController.getAllTours);

router.route(tourRoutes.stats).get(tourController.getTourStat);

router.route(tourRoutes.monthlyPlan).get(tourController.getMonthlyPlan);

router
	.route(tourRoutes.tours)
	.get(isAuthorized, tourController.getAllTours)
	.post(isAuthorized, tourController.createTour);

router
	.route(tourRoutes.tour)
	.get(tourController.getTour)
	.put(isAuthorized, tourController.updateTour)
	.delete(isAuthorized, tourController.deleteTour);

module.exports = router;
