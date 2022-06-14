const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const databaseJson = require('../database/databaseJson')

const databaseFilename = '../database/users.json';

const controller = {
    showLogin: function(req, res) {
        return res.render('auth/login')
    },
    login: function(req, res) {
        return res.send('logeando')
    },
    showRegister: function(req, res) {
        res.locals.errors = { cosa: "nombre" }
        return res.render('auth/register')
    },
    register: function(req, res) {

        console.log(req.body)
        //validar los datos
        let errores = validationResult(req)

        //si hay errores, retornarlos a la vista
        if (!errores.isEmpty()) {
            let errors = errores.mapped()
            console.log(errors)
            return res.render('auth/register', {errors: errors, olds: req.body})
        }


        //si esta bien registro al usuario
        //leer el json
        const users = databaseJson.readJson(databaseFilename) 

        const idCalculated = databaseJson.lastElementId(users) + 1

        //si hay imagen
        let image = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir
            image = req.file.filename;
        }

        //para mayor seguridad guardo el password de manera encriptada
        // spoiler alert bcryptjs
        const pass = bcryptjs.hashSync(req.body.password, 10)

        //guardo el nuevo usuario con la estructura
        users.push({ id: idCalculated, email: req.body.email, password: pass, img: image })

        //reescribo el json
        databaseJson.writeJson(users, databaseFilename)

        //luego a donde redirijo?
        return res.send('registrado')
    },
    logout: function(req, res) {
        return res.send('deslogeando')
    }
}


module.exports = controller