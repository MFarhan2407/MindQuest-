const AuthController = require('../controllers/authController')

const route = require('express').Router()

route.get("/profile", AuthController.showProfile)

route.get('/profile/add', AuthController.profileForm)
route.post('/profile/add', AuthController.profile)

module.exports = route