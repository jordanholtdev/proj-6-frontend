// component responsible for retrieving messages from SQS, processing them and updating application state
// path: src/components/retrieve/RetrieveSQS.tsx
import { useEffect, useState } from 'react';
import { receiveSQSMessage } from '../../utils/sqs';
import { RetrieveState } from './types';

const RetrieveSQS = () => {
    const [messages, setMessages] = useState<RetrieveState['messages']>([]);

    useEffect(() => {
        const fetchData = async () => {
            const receivedMessages = await receiveSQSMessage();
            setMessages(receivedMessages);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Retrieve SQS Messages</h1>
            <ul>
                {messages?.map((message) => (
                    <li key={message}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default RetrieveSQS;
