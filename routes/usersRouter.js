const express = require('express');

const router = express.Router();

const routesConfig = require('../configs/routesConfig');
const usersController = require('../controllers/usersController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
   usersController;

router.route(routesConfig.users.getAll).get(getAllUsers).post(createUser);

router
   .route(routesConfig.users.getOne)
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser);

module.exports = router;
