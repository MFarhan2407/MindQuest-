const route = require('express').Router()
const authRoutes = require('./authRoutes')
const profileRoute = require('./profile')
const eduRoute = require('./eduRoutes')

const studentRoute = require(`./stuRoutes`)

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

route.use('/', profileRoute)

route.use('/mindquest', eduRoute)






route.use(`/mindquest`, requireAuth, studentRoute)





module.exports = route