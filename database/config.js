const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)

        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Habla conmigo');
    }
}

//exportaciones con nombre para acceder a las funcionalidades más encap`suladamente
module.exports = {
    dbConnection
}