//Para manipular mejor la respuesta
const { response } = require('express');

//importar modelo
const Color = require('../models/color');

const getColors = async(req, res = response) => {

    const { limit = 6, since = 0 } = req.query;


    const [total, colors] = await Promise.all([
        //obtener el total de registro
        Color.countDocuments(),
        //Obtener registros
        Color.find()
        //convertir string to number para paginacion y limite
        .skip(Number(since))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        colors
    });
}

const getColor = async(req, res = response) => {
    //obtener uid
    const { uid } = req.params;
    //buscar mediante un objeto 
    const color = await Color.findOne({ uid });

    res.json({
        color
    });

}


const postColor = async(req, res = response) => {


    //Obtener datos del request
    const { uid, name, color, pantone, year } = req.body;
    //Enviar datos al modelo
    const data = new Color({ uid, name, color, pantone, year });

    //Guardar en la BD
    await data.save();

    res.json({
        data
    });
}


const putColor = async(req, res = response) => {

    const { id } = req.params;
    const { _id, uid, ...rest } = req.body;
    //Validar id

    const color = await Color.findByIdAndUpdate(id, rest);

    res.json({
        color
    });
}

const deleteColor = async(req, res = response) => {

    const { id } = req.params;

    const color = await Color.findByIdAndDelete(id);

    res.json({
        color
    });
}


module.exports = {
    getColors,
    getColor,
    postColor,
    putColor,
    deleteColor
}