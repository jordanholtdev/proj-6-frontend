// component responsible for retrieving messages from SQS, processing them and updating application state
import { useEffect, useState } from 'react';
import { Message } from './types';
import { formatNumber } from '../../utils/helper';
import Pool from '../../utils/UserPool';

const RetrieveSQS = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<Message[] | null>(null);

    useEffect(() => {
        // get current user from Pool and determine userId to use in API call
        const user = Pool.getCurrentUser();
        const userId = user?.getUsername();

        setIsLoading(true);
        // Call the endpoint every 5 seconds
        const fetchMessages = async () => {
            const response = await fetch(`/api/retrieve?userId=${userId}`);

            // Be sure to handle errors and check if the response is ok
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            } else {
                const sqsMessages = await response.json();

                console.log('messages', sqsMessages);
                setMessages(sqsMessages.messages);
            }
        };

        fetchMessages();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='overflow-x-auto lg:overflow-visible'>
            <h1>Retrieve SQS Messages</h1>
            {messages && messages.length > 0 ? (
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Confidence</th>
                            <th>Categories</th>
                            {/* <th>Instances</th> */}
                            <th>Parents</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message, index) => (
                            <tr key={index}>
                                <td>
                                    {message.Labels ? (
                                        <ul>
                                            {message.Labels.map(
                                                (label, labelIndex) => (
                                                    <li key={labelIndex}>
                                                        <h4 className='text-md'>
                                                            {label.Name}
                                                        </h4>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p>No labels available</p>
                                    )}
                                </td>
                                <td>
                                    {message.Labels ? (
                                        <ul>
                                            {message.Labels.map(
                                                (label, labelIndex) => (
                                                    <li key={labelIndex}>
                                                        <p>
                                                            {formatNumber(
                                                                label.Confidence
                                                            )}
                                                        </p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </td>
                                <td>
                                    {message.Labels ? (
                                        <ul>
                                            {message.Labels.map(
                                                (label, labelIndex) => (
                                                    <li key={labelIndex}>
                                                        {label.Categories
                                                            .length > 0 ? (
                                                            <ul>
                                                                {label.Categories.map(
                                                                    (
                                                                        category,
                                                                        categoryIndex
                                                                    ) => (
                                                                        <li
                                                                            className='text-md'
                                                                            key={
                                                                                categoryIndex
                                                                            }
                                                                        >
                                                                            {
                                                                                category.Name
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        ) : null}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </td>
                                {/* <td>
                                    {message.Labels ? (
                                        <ul>
                                            {message.Labels.map(
                                                (label, labelIndex) => (
                                                    <li key={labelIndex}>
                                                        {label.Instances
                                                            .length > 0 ? (
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
                                                                            {JSON.stringify(
                                                                                instance.BoundingBox
                                                                            )}
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        ) : null}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </td> */}
                                <td>
                                    {message.Labels ? (
                                        <ul>
                                            {message.Labels.map(
                                                (label, labelIndex) => (
                                                    <li key={labelIndex}>
                                                        {label.Parents.length >
                                                        0 ? (
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
                                                                            {
                                                                                parent.Name
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        ) : null}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>no messages</div>
            )}
        </div>
    );
};

export default RetrieveSQS;
