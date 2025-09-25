const AuthController = require('../controllers/authController')

const route = require('express').Router()

// const upload = multer({ dest: 'uploads/' })
const upload = require("../middlewares/upload")

route.get("/profile", AuthController.showProfile)
route.get("/profile/student", AuthController.showProfileStudent)

route.get('/profile/add', AuthController.profileForm)

route.post('/profile/add', upload.single('avatar'), AuthController.profile)

module.exports = route