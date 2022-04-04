const express = require('express');

// Create a new express application instance

const app = express();

// Define main route

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});