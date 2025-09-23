const { User, Profile } = require('../models')
const bcrypt = require('bcryptjs')

class AuthController {
    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }

    static async registerForm(req, res) {
        try {
            res.render('register')
            // res.send("halo")
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res) {
        try {
            // console.log(req.body);
            const { username, email, password } = req.body
            User.create({
                username,
                email,
                password
            })
            res.redirect('/auth/login')
        } catch (error) {
            res.send(error)
        }
    }

    static async profileForm(req, res) {
        try {
            res.render('profile')
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            const { alamat, bio, avatar, namaLengkap } = req.body
            // console.log(req.body);
            
            await Profile.create({
                address: alamat,
                bio,
                avatar,
                fullName: namaLengkap
            })
            res.redirect('/profile')
        } catch (error) {
            // console.log(error);
            
            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const { username, email, password } = req.body
            const users = [{ email: email, username: username, password: bcrypt.hashSync(password, 8) }] //data dummy
            const user = users.find(u => u.username === username);
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id
                
                    res.redirect('/mindquest/student')
                
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            // console.log(error);
            
            res.send(error)
        }
    }
}

module.exports = AuthController