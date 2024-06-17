'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController.js')
const MainController = require('../controllers/mainController.js')

router.use(authentication)



router.use(errorHandler)

module.exports = router