const validFields = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const validRole = require('../middlewares/valid-role');


module.exports = {
    ...validFields,
    ...validJWT,
    ...validRole
}