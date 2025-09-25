const StuController = require("../controllers/stuController");

const route = require('express').Router()

route.get('/student', StuController.dashboard)
route.get('/student/subject', StuController.showSubject)
route.get('/student/subject/challenge/:SubjectId', StuController.showChallenge)
route.post('/student/subject/challenge/:SubjectId', StuController.submitAnswer)

module.exports = route