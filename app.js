const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')

const multer = require('multer')


const route = require('./route')
const app = express()
const path = require('path');

const port = 3000

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));





app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'mindquest-secret',
    resave: false,
    saveUninitialized: false
}))

app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('public/images'))

app.use(flash())

app.use(route)

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);

})