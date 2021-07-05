const { response } = require('express');
//Import Bcrypt
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
//Import Model
const User = require('../models/user');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar los datos existen
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Datos incorrectos'
            });
        }
        //Verificar password
        const passOk = bcrypt.compareSync(password, user.password);
        if (!passOk) {
            return res.status(400).json({
                msg: 'Datos incorrectos'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en la autenticacion'
        });
    }



};


const newUser = async(req, res = response) => {

    //Obtener datos del request
    const { name, email, password, img, role, status, google } = req.body;
    //Enviar datos obligatorios al modelo
    const newUser = new User({ name, email, password, role });

    //bcrypt para proteger password
    const key = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, key);

    //Guardar en la BD
    await newUser.save();

    res.json({
        newUser
    });
};

const getUser = async(req, res = response) => {

    const { limit = 6, since = 0 } = req.query;


    const [total, users] = await Promise.all([
        //obtener el total de registro
        User.countDocuments(),
        //Obtener registros
        User.find()
        //convertir string to number para paginacion y limite
        .skip(Number(since))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

module.exports = {
    login,
    newUser,
    getUser
};