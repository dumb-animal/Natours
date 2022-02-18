const express = require("express");

const router = express.Router();

const { userRoutes } = require("../configs/routes.config");
const userController = require("../controllers/userController");

const {} = userController;

router.route(userRoutes.users).get((req, res) => {});
router.route(userRoutes.user).get((req, res) => {});

module.exports = router;
