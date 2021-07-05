const { Router } = require('express');
//import validation
const { check } = require('express-validator');
const { validFields } = require('../middlewares/valid-fields');
//Import Controller
const { login, newUser, getUser } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email incorrecto').isEmail(),
    check('password', 'Password obligatoria').not().isEmpty(),
    validFields
], login);

router.post('/new', newUser);

//test
router.get('/', getUser);

module.exports = router;