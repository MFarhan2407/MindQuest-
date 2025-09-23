const StuController = require("../controllers/stuController");

const route = require('express').Router()

route.get('/student', StuController.readQuestion)

module.exports = route