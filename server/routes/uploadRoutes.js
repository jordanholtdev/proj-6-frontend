const express = require('express');
const router = express.Router();
const { uploadToS3 } = require('../services/s3');
const { sendMessage } = require('../services/sqs');

router.post('/', async (req, res) => {
    console.log('req.file', req.file);
    console.log('req.body', req.body);
    const file = req.file; // assuming you're using multer for file handling

    const user = req.body['userId'];
    console.log('user', user);

    const message = {
        bucket: 'images-bucket-project6',
        key: req.body['key'],
        user,
    };

    try {
        const s3Response = await uploadToS3(req.body['key'], file.buffer);
        console.log('s3Response', s3Response);
        try {
            const sqsResponse = await sendMessage(message);
            console.log('sqsResponse', sqsResponse);

            res.json({
                message: 'File uploaded successfully queued for processing',
            });
        } catch (sqsError) {
            console.error(sqsError);
            // Respond with a 500 error and provide a specific error message
            res.status(500).json({ error: 'Failed to send SQS message' });
        }
    } catch (s3Error) {
        console.error(s3Error);
        // Respond with a 500 error and provide a specific error message
        res.status(500).json({ error: 'Failed to upload file to S3' });
    }
});

module.exports = router;
