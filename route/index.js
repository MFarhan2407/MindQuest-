const route = require('express').Router()
const authRoutes = require('./authRoutes')
const profileRoute = require('./profile')

route.get('/', (req, res) => {
    res.redirect('/auth')
})

const requireAuth = (req, res, next) => {
    if(req.session.userId) {
        next()
    } else {
        res.redirect('/auth/login')
    }
}

route.use('/auth', authRoutes)

route.use('/',requireAuth, profileRoute)





module.exports = route