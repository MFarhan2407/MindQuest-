const StuController = require("../controllers/stuController");

const route = require('express').Router()

route.get('/student', StuController.dashboard)
route.get('/student/subject', StuController.showSubject)
route.get('/student/subject/challenge/:SubjectId', StuController.showChallenge)

module.exports = route