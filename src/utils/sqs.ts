import { SQS } from '@aws-sdk/client-sqs';

const sqs = new SQS({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

const sendSQSMessage = async (message: object) => {
    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: import.meta.env.VITE_SQS_QUEUE_URL,
    };

    try {
        const data = await sqs.sendMessage(params);
        console.log('Success', data.MessageId);
    } catch (error) {
        console.log('Error', error);
    }
};

// function to retrieve messages from SQS queue
const receiveSQSMessage = async () => {
    const params = {
        AttributeNames: ['SentTimestamp'],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ['All'],
        QueueUrl: import.meta.env.VITE_IMAGE_RESULTS_SQS_QUEUE_URL,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0,
    };

    try {
        const data = await sqs.receiveMessage(params);
        if (data.Messages) {
            const deleteParams = {
                QueueUrl: import.meta.env.VITE_IMAGE_RESULTS_SQS_QUEUE_URL,
                ReceiptHandle: data.Messages[0].ReceiptHandle,
            };
            await sqs.deleteMessage(deleteParams);
            console.log('Success', data.Messages[0].Body);
        } else {
            console.log('No messages to delete');
        }
    } catch (error) {
        console.log('Error', error);
    }
};

export { sendSQSMessage, receiveSQSMessage };
