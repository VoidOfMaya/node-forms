//tools
const {Router}= require('express');
//controllers
const usersController = require('../controllers/indexController.js')

const userRouter =Router();

userRouter.get("/", usersController.usersListGet);
userRouter.get("/create", usersController.usersCreateGet);
userRouter.post("/create", usersController.usersCreatePost);

userRouter.get("/:id/update", usersController.usersUpdateGet);
userRouter.post("/:id/update", usersController.usersUpdatePost);

userRouter.post("/:id/delete", usersController.usersDeletePost);

userRouter.get('/search',usersController.usersFindGet);


module.exports = userRouter
