const express = require('express');
const router = express.Router();
const { uploadToS3 } = require('../services/s3');

router.post('/', async (req, res) => {
    console.log('req.file', req.file);
    const file = req.file; // assuming you're using multer for file handling

    try {
        const response = await uploadToS3(req.body['key'], file.buffer);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
