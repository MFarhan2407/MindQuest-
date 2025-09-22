const AuthController = require('../controllers/authController')

const route = require('express').Router()

route.get('/', AuthController.registerForm)
route.post(`/`, AuthController.register)

module.exports = route