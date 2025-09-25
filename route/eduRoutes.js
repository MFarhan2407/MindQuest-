const eduController = require('../controllers/eduController')

const route = require('express').Router()


route.get("/educator", eduController.dashBoard)

route.get("/educator/area", eduController.areaEducator)

route.post("/educator/question/create", eduController.createQuestion)

route.get("/educator/student/area", eduController.myStudents)

route.post("/educator/question/:id/delete", eduController.deleteQuestion)

route.get("/educator/profile/:id/edit", eduController.showEditFormPage)

route.post("/educator/profile/:id/edit", eduController.editProfile)

module.exports = route