const { Router } = require('express');

//import controller
const { getColor, getColors } = require('../controllers/user');

const router = Router();

router.get('/', getColor);





module.exports = router;