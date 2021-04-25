const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('DATBASE CONNECTED');
    } catch (error) {
        console.log(error);
        // Detener la app
        process.exit(1); 
    }
}



module.exports = conectarDB;