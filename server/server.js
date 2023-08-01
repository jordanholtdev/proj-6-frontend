const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const port = process.env.PORT || 3000; // Use environment variable for port if available

const uploadRoutes = require('./routes/uploadRoutes');

// express app
const app = express();

// middleware
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(multer().single('file')); // file handling middleware

// turn off etag header
app.set('etag', false); // turn off

// routes
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// upload route
app.use('/api/upload', uploadRoutes);

// retrieve route
app.use('/api/retrieve', require('./routes/retrieveRoutes'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
