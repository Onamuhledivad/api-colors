const { response } = require('express');

//Verificar si el usuario es Admin
const isAdmin = (req, res = response, next) => {
    //Verificar si existe el rol
    if (!req.user) {
        return res.status(500).json({
            msg: 'Varificar user role en jwt'
        });
    }

    const { role } = req.user;
    //Verificar si el rol es Admin
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Usuario no autorizado'
        });
    }

    next();
}

//Validar usurio con rol en especifico
const userOk = (...role) => {

    return (req, res = response, next) => {
        //Verificar role
        if (!req.user) {
            return res.status(500).json({
                msg: 'Verificar user role en jwt'
            });
        }

        //Verificar si es un usuario con role valido

        if (!role.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'El servicio require un usuario especifico'
            });
        }

        next();
    }

}

module.exports = {
    isAdmin,
    userOk
}