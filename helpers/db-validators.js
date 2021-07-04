//Importar el modelo
const Color = require('../models/color');


const colorValid = () => {

}


const exitUid = async(uid) => {

    //Validar si uid existe
    const existe = await Color.findOne({ uid });
    if (existe) {
        //Retornar error perzonalizado
        throw new Error(`El uid: ${uid} ya esta registrado en la BD`);
    }
}

const existIdMongo = async(id) => {

    //Validar si id existe
    const existe = await Color.findOne({ id });
    if (existe) {
        //Retornar error perzonalizado
        throw new Error(`El _id: ${id} ya fue registrado en la BD`);
    }
}




module.exports = {
    exitUid,
    existIdMongo
}