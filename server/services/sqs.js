const { SQS } = require('@aws-sdk/client-sqs');

const sqs = new SQS({
    region: process.env.AWS_REGION,
    // credetianls: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // },
});

const sendMessage = async (message) => {
    console.log('Sending message to SQS');
    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: process.env.SQS_QUEUE_URL,
    };

    try {
        const data = await sqs.sendMessage(params);
        console.log('Status:', data.$metadata.httpStatusCode);
        return data;
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error sending message to SQS', err);
    }
};

const deleteMessage = async (receiptHandle) => {
    console.log('Deleting message with receipt handle:', receiptHandle);
    const params = {
        QueueUrl: process.env.IMAGE_RESULTS_SQS_QUEUE_URL,
        ReceiptHandle: receiptHandle,
    };

    try {
        const data = await sqs.deleteMessage(params);
        console.log('Success deleting message:', data.$metadata.httpStatusCode);
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error deleting message from SQS', err);
    }
};

const receiveMessage = async (userId) => {
    console.log('Receiving messages from SQS');
    console.log('User ID:', userId);
    let messages = [];
    let isQueueEmpty = false;

    const params = {
        QueueUrl: process.env.IMAGE_RESULTS_SQS_QUEUE_URL,
        AttributeNames: ['SentTimestamp'],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ['All'],
        VisibilityTimeout: 30,
        WaitTimeSeconds: 0,
    };

    try {
        const data = await sqs.receiveMessage(params);

        if (data.Messages) {
            console.log('Messages received:', data.Messages.length);
            for (const msg of data.Messages) {
                const msgBody = JSON.parse(msg.Body);
                console.log('Message received:', msg);
                console.log(typeof msgBody['user'], typeof userId);
                if (msgBody['user'] === userId) {
                    console.log('Message belongs to user:', msgBody['user']);
                    // Add message to array if it belongs to the user
                    messages.push(msgBody);

                    // Delete the message after processing
                    await deleteMessage(msg.ReceiptHandle);
                }
            }
        } else {
            isQueueEmpty = true;
        }
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error receiving message from SQS', err);
    }
    return { messages, isQueueEmpty };
};

module.exports = { sendMessage, deleteMessage, receiveMessage };
