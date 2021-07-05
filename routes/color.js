const { Router } = require('express');
//import validation
const { check } = require('express-validator');
//import mmiddleware, validacion personalizado, JWT, validar Admin y validar Role especifico
const { validFields, validJWT, isAdmin, userOk } = require('../middlewares');
//import validacion de id
const { exitUid, existIdMongo } = require('../helpers/db-validators');


//import controller
const {
    getColors,
    getColor,
    postColor,
    putColor,
    deleteColor
} = require('../controllers/color');

const router = Router();

//Rutas
router.get('/', [
    validJWT,
    userOk('ADMIN_ROLE', 'USER_ROLE'),
    validFields
], getColors);

router.get('/:uid', [
    validJWT,
    userOk('ADMIN_ROLE', 'USER_ROLE'),
    check('uid').isNumeric().not().isEmpty(),
    validFields
], getColor);

router.post('/', [
    validJWT,
    isAdmin,
    check('uid').isNumeric().not().isEmpty(),
    check('uid').custom(exitUid),
    check('name').not().isEmpty().isLength({ min: 3 }),
    check('color').not().isEmpty().isLength({ min: 3 }),
    check('pantone').not().isEmpty().isLength({ min: 3 }),
    check('year').isNumeric().not().isEmpty(),
    validFields
], postColor);

router.put('/:id', [
    validJWT,
    isAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existIdMongo),
    validFields
], putColor);

router.delete('/:id', [
    validJWT,
    isAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existIdMongo),
    validFields
], deleteColor);

module.exports = router;