const mongoose = require('mongoose')

// connecnting to db
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/health';

function connectToDb() {
const connectionOptions = {
    useNewUrlParser:true, 
    useUnifiedTopology: false,
    useUnifiedTopology: true, 
    // useCreateIndex: true 
}

mongoose.connect(mongodbUrl, connectionOptions)
const db = mongoose.connection;
db.on('error', () => console.log('Error occured while Connecting to DB'))
db.once('open', () => console.log('Successfully connected to Database'))

}

module.exports = connectToDb