const { Schema, model } = require('mongoose');

const UserShema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Editar datos de respuesta
UserShema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserShema);