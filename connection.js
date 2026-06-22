const mongoose = require('mongoose');

async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
}

module.exports = { connectMongoDB };