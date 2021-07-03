//Para manipular mejor la respuesta
const { response } = require('express');


const getColors = (req, res = response) => {

    res.json({
        msg: 'Get Colores controller User'
    });
}


const getColor = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Get Color controller User',
        body
    });
}

module.exports = { getColors, getColor }