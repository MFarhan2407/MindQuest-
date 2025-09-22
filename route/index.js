const route = require('express').Router()
const authRoutes = require('./authRoutes')

route.get('/', (req, res) => {
    res.redirect('/auth')
})
route.use('/auth', authRoutes)

module.exports = route