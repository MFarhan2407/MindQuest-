const eduController = require('../controllers/eduController')

const route = require('express').Router()


route.get("/educator", eduController.dashBoard)

route.get("/educator/area", eduController.areaEducator)

module.exports = route