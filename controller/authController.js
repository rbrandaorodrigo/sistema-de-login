require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
  token = req.cookies.Token

  if(!token) return res.status(422).redirect('/login')
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    return res.status(422).redirect('/login')
  }
}