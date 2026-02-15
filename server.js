if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const methodOverride = require('method-override')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => { return users.find(users => users.email === email) },
    id => {return users.find(users => users.id === id)}
)

//local variable for easy purposes
const users = []

app.set('view-engine', 'ejs')
//allows for access in the post method => req.body.name -> example
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated,  (req, res) => { 
    res.render('index.ejs', {name : req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
}
))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        //asynchronous function
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id : Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
        res.redirect('/login')
    }catch {
        res.redirect('/register')
    }
    console.log(users)
})

app.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
} 

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/')
    }

    next()
}
app.listen(3000)