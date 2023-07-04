// component responsible for retrieving messages from SQS, processing them and updating application state
// path: src/components/retrieve/RetrieveSQS.tsx
import { useEffect, useState } from 'react';
import { receiveSQSMessage } from '../../utils/sqs';
import { Message } from './types';

const RetrieveSQS = () => {
    const [messages, setMessages] = useState<Message[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const receivedMessages = await receiveSQSMessage();
            const parsedMessages = receivedMessages?.map(
                (message) => JSON.parse(message) as Message
            ) as Message[]; // Add a type assertion here

            setMessages(parsedMessages);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Retrieve SQS Messages</h1>
            <ul>
                {messages?.map((message, index) => (
                    <li key={index}>
                        <h3>Label: {message.Labels[0].Name}</h3>
                        <p>Confidence: {message.Labels[0].Confidence}</p>
                        <ul>
                            {message.Labels.map((label, labelIndex) => (
                                <li key={labelIndex}>
                                    <h4>Label: {label.Name}</h4>
                                    <p>Confidence: {label.Confidence}</p>
                                    <ul>
                                        {label.Aliases.length > 0 && (
                                            <li>
                                                Aliases:{' '}
                                                {label.Aliases.join(', ')}
                                            </li>
                                        )}
                                        <li>
                                            Categories:
                                            <ul>
                                                {label.Categories.map(
                                                    (
                                                        category,
                                                        categoryIndex
                                                    ) => (
                                                        <li key={categoryIndex}>
                                                            {category.Name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </li>
                                        {label.Instances.length > 0 && (
                                            <li>
                                                Instances:
                                                <ul>
                                                    {label.Instances.map(
                                                        (
                                                            instance,
                                                            instanceIndex
                                                        ) => (
                                                            <li
                                                                key={
                                                                    instanceIndex
                                                                }
                                                            >
                                                                BoundingBox:{' '}
                                                                {JSON.stringify(
                                                                    instance.BoundingBox
                                                                )}
                                                                <br />
                                                                Confidence:{' '}
                                                                {
                                                                    instance.Confidence
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        )}
                                        {label.Parents.length > 0 && (
                                            <li>
                                                Parents:
                                                <ul>
                                                    {label.Parents.map(
                                                        (
                                                            parent,
                                                            parentIndex
                                                        ) => (
                                                            <li
                                                                key={
                                                                    parentIndex
                                                                }
                                                            >
                                                                {parent.Name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RetrieveSQS;
