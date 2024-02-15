const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://devasaravanan2511:OjcXVXD1J8kuQs40@cluster0.dtjtuc9.mongodb.net/devabikes?retryWrites=true&w=majority')
        //   await mongoose.connect('mongodb://localhost:27017/devbikes');

        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
module.exports = connectDB;
