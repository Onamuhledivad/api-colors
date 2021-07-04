const mongoose = require('mongoose');


const dbConn = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online ok');

    } catch (error) {
        console.log(error);
        throw new Error('Error con la conexion ');
    }
}



module.exports = { dbConn }