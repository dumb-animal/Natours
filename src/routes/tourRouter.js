const express = require("express");

const router = express.Router();

const { tourRoutes } = require("../configs/routes.config");
const tourController = require("../controllers/tourController");

const {} = tourController;

router
	.route(tourRoutes.tours)
	.get((req, res) => {})
	.post(tourController.createTour);

router.route(tourRoutes.tour).get((req, res) => {});

module.exports = router;
