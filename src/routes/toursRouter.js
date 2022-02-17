const express = require("express");

const router = express.Router();

const { toursRoutes } = require("../configs/routes.config");
const toursController = require("../controllers/toursController");

const {} = toursController;

router.route(toursRoutes.getAll).get((req, res) => {});
router.route(toursRoutes.getOne).get((req, res) => {});

module.exports = router;
