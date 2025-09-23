const AuthController = require('../controllers/authController')

const route = require('express').Router()

route.get('/profile', AuthController.profileForm)
route.post('/profile', AuthController.profile)

module.exports = route