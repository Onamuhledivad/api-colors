//Modelo para el objeto Color
const { Schema, model } = require('mongoose');

const ColorShema = Schema({
    uid: {
        type: Number,
        require: [true, 'El Id es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    color: {
        type: String,
        require: [true, 'El color es obligatorio']
    },
    pantone: {
        type: String,
        require: [true, 'El pantone es obligatorio']
    },
    year: {
        type: Number,
        require: [true, 'El pantone es obligatorio']
    }
});

//Editar datos de respuesta
ColorShema.methods.toJSON = function() {
    const { __v, ...color } = this.toObject();
    return color;
}

module.exports = model('Color', ColorShema);