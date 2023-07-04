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
const receiveSQSMessage = async (): Promise<string[] | null> => {
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
            console.log('Success', data.Messages[0].Body);

            // Extract and filter out any undefined messages
            const messages = data.Messages.map(
                (message) => message.Body
            ).filter((message): message is string => message !== undefined);
            // Delete all received messages
            const deletePromises = data.Messages.map((message) =>
                deleteSQSMessage(message.ReceiptHandle as string)
            );
            await Promise.all(deletePromises);

            return messages;
        } else {
            console.log('No messages to delete');
        }
    } catch (error) {
        console.log('Error', error);
    }

    // Return null when there are no messages or in case of an error
    return null;
};

const deleteSQSMessage = async (receiptHandle: string) => {
    const deleteParams = {
        QueueUrl: import.meta.env.VITE_IMAGE_RESULTS_SQS_QUEUE_URL,
        ReceiptHandle: receiptHandle,
    };

    try {
        await sqs.deleteMessage(deleteParams);
        console.log('Message deleted successfully');
    } catch (error) {
        console.log('Error deleting message', error);
    }
};

export { sendSQSMessage, receiveSQSMessage, deleteSQSMessage };
