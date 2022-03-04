require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const router = require('./router')
const PORT = process.env.PORT
const session = require('express-session')
const flash = require('connect-flash')

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(router)
app.use((req, res, next) => {
    res.status(404).render('404NotFound', {
        title: "404 Not Found"
    })
})

db.sequelize.sync({
    // force: true
}).then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server Running at PORT ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})
