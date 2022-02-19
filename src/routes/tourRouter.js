const express = require("express");

const router = express.Router();

const { tourRoutes } = require("../configs/routes.config");
const tourController = require("../controllers/tourController");

const {} = tourController;

router
	.route("/top-5")
	.get(tourController.aliasTopTours, tourController.getAllTours);

router
	.route(tourRoutes.tours)
	.get(tourController.getAllTours)
	.post(tourController.createTour);

router
	.route(tourRoutes.tour)
	.get(tourController.getTour)
	.put(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
