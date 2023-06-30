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

export { sendSQSMessage };
