//Para manipular mejor la respuesta
const { response } = require('express');


const getColors = (req, res = response) => {

    res.json({
        msg: 'Get Colores controller Admin'
    });
}


const postColor = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Post Colores controller Admin',
        body
    });
}


const putColor = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'Put Colores controller Admin',
        id
    });
}

const deleteColor = (req, res = response) => {

    res.json({
        msg: 'Delete Colores controller Admin',
    });
}

module.exports = {
    getColors,
    postColor,
    putColor,
    deleteColor
}