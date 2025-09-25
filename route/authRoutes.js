const AuthController = require('../controllers/authController')

const route = require('express').Router()



route.get('/', AuthController.home)

route.get('/register', AuthController.registerForm)

route.post(`/register`, AuthController.register)

route.get(`/login`, AuthController.loginForm)

route.post(`/login`, AuthController.login)

module.exports = route