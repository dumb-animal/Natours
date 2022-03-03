// MODULES
const express = require("express");

// CONFIGS
const { tourRoutes } = require("../configs/routes.config");

// CONTROLLERS
const tourController = require("../controllers/tourController");
const { isAuthorized, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
	.route(tourRoutes.topFive)
	.get(tourController.aliasTopTours, tourController.getAllTours);

router
	.route(tourRoutes.stats)
	.get(tourController.getTourStat);

router
	.route(tourRoutes.monthlyPlan)
	.get(tourController.getMonthlyPlan);

router
	.route(tourRoutes.tours)
	.get(isAuthorized, tourController.getAllTours)
	.post(isAuthorized, restrictTo("admin", "lead-guide"), tourController.createTour);

router
	.route(tourRoutes.tour)
	.get(tourController.getTour)
	.put(isAuthorized, restrictTo("admin", "lead-guide"), tourController.updateTour)
	.delete(isAuthorized, restrictTo("admin", "lead-guide"), tourController.deleteTour);

module.exports = router;
