//tools
const {Router}= require('express');
//controllers
const {getHome} = require('../controllers/indexController.js')

const indexRouter =Router();
//get
indexRouter.get('/',getHome)

module.exports = indexRouter
