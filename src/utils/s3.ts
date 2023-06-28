import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

export const main = async (key: string, file: File, bucketName: string) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
    });

    try {
        const response = await s3.send(command);
        console.log(response);
        //optionally return the response data to handle in the React component
    } catch (error) {
        console.log(error);
        // optionally return the error to handle in the React component
    }
};
