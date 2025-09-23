const eduController = require('../controllers/eduController')

const route = require('express').Router()


route.get("/educator", eduController.dashBoard)

module.exports = route