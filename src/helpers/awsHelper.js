let AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_ACCESS_SECRET,
  region: 'eu-central-1',
});

const AwsHelper = {
  getAWSUrl: (key) => {
    let s3 = new AWS.S3();
    const result = s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_AWS_S3_IMAGE_BUCKET,
      Key: key,
    });

    return result;
  },
};

export default AwsHelper;
