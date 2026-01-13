//tools
const {Router}= require('express');
//controllers
const userController = require('../controllers/indexController.js')

const userRouter =Router();

//get
userRouter.get('/',userController.userListGet);
userRouter.get('/create', userController.userCreateGet)

//post
userRouter.post('/create',userController.userCreatePost);


module.exports = userRouter
