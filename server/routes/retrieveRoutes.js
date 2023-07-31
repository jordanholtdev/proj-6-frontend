const express = require('express');
const router = express.Router();
const { receiveMessage } = require('../services/sqs');

router.get('/', async (req, res) => {
    console.log(req.query.userId);
    try {
        const { messages, isQueueEmpty } = await receiveMessage(
            req.query.userId
        );
        console.log('checked for messages', messages.length, isQueueEmpty);
        res.json({ messages, isQueueEmpty });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to receive messages from SQS' });
    }
});

module.exports = router;
