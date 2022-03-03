const express = require("express");

const router = express.Router();

const { userRoutes } = require("../configs/routes.config");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post(userRoutes.signup, authController.signup);
router.post(userRoutes.login, authController.login);
router.post(userRoutes.forgot, authController.forgotPassword);
router.patch(userRoutes.reset, authController.resetPassword);


router
	.route(userRoutes.users)
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route(userRoutes.user)
	.get(userController.getUser)
	.put(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
