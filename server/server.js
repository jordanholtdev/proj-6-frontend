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

// create a new instance of multer with fileSize limit
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024, // Maximum file size is 100MB
    },
});

// middleware

app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(upload.single('file')); // file handling middleware with increased file size limit

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
