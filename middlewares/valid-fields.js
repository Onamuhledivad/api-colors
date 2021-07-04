//importar validacion
const { validationResult } = require('express-validator');


const validFields = (req, res, next) => {

    //Validaciones
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors);

    }

    next();

}



module.exports = {
    validFields
}