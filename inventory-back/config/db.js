const mongoose = require('mongoose');

require ('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
    process.exit(1); // exit process with failure
  }
}

module.exports = connectDB;