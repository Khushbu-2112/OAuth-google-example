const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;
// createConnection - for multiple connection n normaly used is connect() for single connection.
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=> {
    console.log('Database connected');
});