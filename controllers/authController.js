const { where } = require('sequelize')
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
            let errors // undefined
            console.log(req.query);

            if (req.query.errors) { // masih dalam bentuk string
                errors = req.query.errors.split(",") // Array
            }
            res.render('register', { errors })
            // res.send("halo")
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res) {
        try {
            // console.log(req.body);
            // console.log(req.body);
            const { username, email, password } = req.body

            if (!username, !email, !password) {
                return res.redirect("/auth/register?errors=All field are required")
            }

            await User.create({
                username,
                email,
                password
            })
            res.redirect('/auth/login')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map((el) => el.message)
                res.redirect(`/auth/register?errors=${errors}`)
            }
            res.send(error)
        }
    }

    static async showProfile(req, res) {
        try {
            // console.log(req.session);
            const user = await User.findByPk(req.session.userId, {
                include: [{
                    model: Profile
                }]
            })

            const profile = await Profile.findOne({
                where: { UserId: req.session.userId }
            });

            res.render("edu-profile", { user, profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async showProfileStudent(req, res) {
        try {
            // console.log(req.session);
            const user = await User.findByPk(req.session.userId, {
                include: [{
                    model: Profile
                }]            })

            const profile = await Profile.findOne({
                where: { UserId: req.session.userId }
            });

            res.render("stu-profile", { user, profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async profileForm(req, res) {
        try {
            const profile = await Profile.findOne({
                where: { UserId: req.session.userId }
            });
            res.render('profile', { profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            const { alamat, bio, namaLengkap } = req.body
            // console.log(req.body);
            const avatar = req.file ? '/uploads/' + req.file.filename : null;

            await Profile.create({
                address: alamat,
                bio,
                avatar,
                fullName: namaLengkap,
                UserId: req.session.userId
            })
            // res.send(req.session.role)
            const role = req.session.role.toLowerCase()
            // console.log(req.session.role)
            res.redirect(`/mindquest/${role}`) //gimana caranya biar dinamis antara student dan educator
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
            // const users = [{id: 1, email: email, username: username, password: bcrypt.hashSync(password, 8), role:'STUDENT'}] //data dummy
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            // res.send(user)
            console.log(user);
            
            

            req.session.userId = user.id
            req.session.role = user.role

            // const userName = users.find(u => u.username === username);
            // res.send(user)
            if (!username || !password) {
                return res.redirect('/auth/login?error=Username and password are required')
            }

            const profile = await Profile.findOne({
                where: {
                    UserId: user.id
                }
            })



            if (user && bcrypt.compareSync(password, user.password)) {


                if (!profile) {
                    return res.redirect('/profile/add')
                }
                if (user.role === 'STUDENT') {
                    return res.redirect(`/mindquest/student`)

                    // res.send('success login')
                } else {
                    return res.redirect('/mindquest/educator')
                }
            } else {
                return res.send('Invalid credentials');
            }
        } catch (error) {
            // console.log(error);

            res.send(error)
            // res.redirect('/auth/login?error=An error occured during login')
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(() => {
                res.redirect('/auth')
            });

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AuthController