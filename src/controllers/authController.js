const bcryptjs = require('bcryptjs')
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
        return res.render('auth/register')
    },
    register: function(req, res) {
        //validar los datos


        //si hay errores, retornarlos a la vista


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