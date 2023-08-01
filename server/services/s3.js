const { PutObjectCommand, S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
    region: process.env.AWS_REGION,
    credetianls: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadToS3 = async (fileName, fileContent) => {
    console.log('Uploading file to S3');
    const command = new PutObjectCommand({
        Bucket: 'images-bucket-project6',
        Key: fileName,
        Body: fileContent,
    });

    try {
        const data = await s3.send(command);
        console.log('Successfully uploaded file to S3. File name:', fileName);
        return data;
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Error uploading file to S3', err);
    }
};

module.exports = {
    uploadToS3,
};
