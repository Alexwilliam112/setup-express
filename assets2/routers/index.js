'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const Controller = require('../controllers/Controller.js')

router.use(authentication)



router.use(errorHandler)

module.exports = router