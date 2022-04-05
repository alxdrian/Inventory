const express = require('express');
const connectDB = require('./config/db');

// Create a new express application instance

const app = express();

// Connect to MongoDB

connectDB();

app.use(express.json());

app.use('/api/products', require('./routes/product'));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});