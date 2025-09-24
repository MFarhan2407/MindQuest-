const eduController = require('../controllers/eduController')

const route = require('express').Router()


route.get("/educator", eduController.dashBoard)

route.get("/educator/area", eduController.areaEducator)

route.post("/educator/question/create", eduController.createQuestion)

module.exports = route