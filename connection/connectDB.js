// Dependencies 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './env'})

// DB
const connectDB = async () => { 
    await mongoose.connect(
        ("mongodb://localhost:27017/api" || process.env.MONGO_URI)
    )
        .then(() => console.log("MONGODB CONNECTION SUCCESSFUL..."))
        .catch((err) => console.log("MONGODB CONNECTION ERROR..."))
}

module.exports = connectDB