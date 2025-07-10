require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI ,{
  
    });
    console.log("database connected succesfully")
    // logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;