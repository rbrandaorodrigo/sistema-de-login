require('dotenv').config()
const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {registerValidate, loginValidate} = require('./validadeController')

const userController = {
    register: async function(req, res){
        // Valida entradas
        const {error} = registerValidate(req.body)
        if(!error){
            // Recebe dados
            const {name, email, password} = req.body     

            // Busca se email já existe no banco de dados
            const selectedUser = await User.findOne({email})

            if(!selectedUser){
                // Protege a senha
                const passwordCrypt = bcrypt.hashSync(password, 10)
                const user = new User({name, email, password:passwordCrypt});

                // Salva Usuário no banco de dados
                try {
                    const savedUser = await user.save()
                    console.log('novo usuário criado: ' + savedUser)
                    return res.redirect('login')
                } catch (error) {
                    return res.status(400).send(error.message)
                }
            } else return res.status(422).send("Erro: email já cadastrado, tente um email diferente ou recupere sua senha")
        }
    },

    login: async function (req, res){
        
        // Valida entrada de dados
        const {error} = loginValidate(req.body)
        if(error) return res.send("Dados invalidos")

        // Captura os dados
        const { email, password } = req.body
    
        // Busca usuário
        const selectedUser = await User.findOne({email})
        if(selectedUser){
            // Compara a senha
            const checkPassword = await bcrypt.compareSync(password, selectedUser.password)
            if(checkPassword){
                // Cria token
                token = await jwt.sign({
                    id: selectedUser._id,
                    name: selectedUser.name,
                    data: new Date(),
                    
                }, process.env.TOKEN_SECRET, { expiresIn: '24h' })

                res.cookie('Token', token)
                res.redirect('/')
            }else return res.send("Usuário ou senha invalida")

        }else return res.send("Usuário ou senha invalida")
    },

    logout: async function(req, res){
        res.cookie('Token', null)
        res.redirect('/')
    }
}

module.exports = userController