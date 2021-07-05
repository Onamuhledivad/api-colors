const { response, request } = require('express');
//Import JWT
const jwt = require('jsonwebtoken');
//Import Model
const User = require('../models/user');


const validJWT = async(req = request, res = response, next) => {
    //tomar token del header
    const token = req.header('x-token');

    //Validar si existe 
    if (!token) {
        return res.status(401).json({
            msg: 'Autenticación necesaria'
        });
    }

    try {
        //Extraer id de user
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        //Verificar si existe user
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'User no registrado'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        });
    }



}

module.exports = {
    validJWT
}