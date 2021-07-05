//Import JWT
const jwt = require('jsonwebtoken');


const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            //tiempo de expiracion
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Error al generar token')
            } else {
                resolve(token);
            }
        })
    });

}

module.exports = {
    generateJWT
}