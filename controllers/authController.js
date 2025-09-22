const { User } = require('../models')

class AuthController{
    static async registerForm(req, res){
        try {
            res.render('register')
            // res.send("halo")
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res){
        try {
            console.log(req.body);
            const { username, email, password } = req.body
            User.create({
                username,
                email,
                password
            })
            res.redirect('/auth')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AuthController