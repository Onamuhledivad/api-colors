const { Router } = require('express');
//import validation
const { check } = require('express-validator');
//import mmiddleware y validacion personalizado
const { validFields } = require('../middlewares/valid-fields');
const { exitUid, existIdMongo } = require('../helpers/db-validators');

//import controller
const {
    getColors,
    getColor,
    postColor,
    putColor,
    deleteColor
} = require('../controllers/user');

const router = Router();

router.get('/', getColors);

router.get('/:uid', [
    check('uid').isNumeric().not().isEmpty(),
    validFields
], getColor);

router.post('/', [
    check('uid').isNumeric().not().isEmpty(),
    check('uid').custom(exitUid),
    check('name').not().isEmpty().isLength({ min: 3 }),
    check('color').not().isEmpty().isLength({ min: 3 }),
    check('pantone').not().isEmpty().isLength({ min: 3 }),
    check('year').isNumeric().not().isEmpty(),
    validFields
], postColor);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existIdMongo),
    validFields
], putColor);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existIdMongo),
    validFields
], deleteColor);

module.exports = router;