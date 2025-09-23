const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const route = require('./route')
const app = express()

const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'mindquest-secret',
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

app.use(route)

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
    
})