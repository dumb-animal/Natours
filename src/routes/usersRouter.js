const express = require("express");

const router = express.Router();

const { usersRoutes } = require("../configs/routes.config");
const usersController = require("../controllers/usersController");

const {} = usersController;

router.route(usersRoutes.getAll).get((req, res) => {});
router.route(usersRoutes.getOne).get((req, res) => {});

module.exports = router;
