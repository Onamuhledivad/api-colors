const { Router } = require('express');

//import controller
const {
    getColors,
    postColor,
    putColor,
    deleteColor
} = require('../controllers/admin');

const router = Router();

router.get('/', getColors);

router.post('/', postColor);

router.put('/:id', putColor);

router.delete('/:id', deleteColor);

module.exports = router;