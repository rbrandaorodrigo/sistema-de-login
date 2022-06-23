const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')

router.use(cookieParser());

router.get('/', authController, (req, res)=>{res.render('home')})
router.get('/login', (req, res)=>{res.render('login')})
router.get('/signup', (req, res)=>{res.render('signUp')})

router.get('/logout', userController.logout)

router.post('/signup', express.urlencoded({extended: true}), userController.register)
router.post('/login', express.urlencoded({extended: true}), userController.login)

module.exports = router