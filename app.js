// Configurações locais
require('dotenv').config()

// Importando
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRouter');
const path = require('path')
const app = express()

// Conectando banco de dados
mongoose.connect(process.env.MONGO_CONECTION_URL, {}, (error)=>{
    if(error) console.log(error)
    else(console.log('Mongo Conectado'))
})

// Configurando Rotas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))
app.use(express.static(path.join(__dirname, 'templates')))
app.use('/', userRoute)

//Iniciando aplicação
app.listen(process.env.PORT, ()=>{
    console.log('Servidor na porta: ' + process.env.PORT);
})