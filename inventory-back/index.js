const express = require('express');
const connectDB = require('./config/db');

// Create a new express application instance

const app = express();

// Connect to MongoDB

connectDB();

app.use('/api/products', require('./routes/product'));

// Define main route

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});