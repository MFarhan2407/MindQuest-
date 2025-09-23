const route = require('express').Router()
const authRoutes = require('./authRoutes')
const profileRoute = require('./profile')

route.get('/', (req, res) => {
    res.redirect('/auth')
})

route.use('/auth', authRoutes)

route.use('/', profileRoute)





module.exports = route