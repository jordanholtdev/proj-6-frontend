const { SQS } = require('@aws-sdk/client-sqs');

const sqs = new SQS({
    region: process.env.AWS_REGION,
    credetianls: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const sendMessage = async (message) => {
    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl:
            'https://sqs.us-east-1.amazonaws.com/149256189456/image-processing-queue',
    };

    try {
        const data = await sqs.sendMessage(params);
        console.log('Success:', data);
        return data;
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error sending message to SQS', err);
    }
};

const deleteMessage = async (receiptHandle) => {
    const params = {
        QueueUrl: process.env.AWS_SQS_URL,
        ReceiptHandle: receiptHandle,
    };

    try {
        const data = await sqs.deleteMessage(params);
        console.log('Success:', data);
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error deleting message from SQS', err);
    }
};

module.exports = { sendMessage, deleteMessage };
