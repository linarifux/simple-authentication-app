const mongoose = require('mongoose')


const conn = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected to: ${dbConnection.connection.host}`);
    } catch (error) {
        console.log('Errow while connecting to DB', error.message);
    }
}


module.exports = conn