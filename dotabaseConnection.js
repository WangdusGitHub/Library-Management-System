const mongoose = require('mongoose');

function dbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL)

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, "Connection Error"));
    db.once("open", function() {
        console.log("db Connected...")
    })
}

module.exports = dbConnection;