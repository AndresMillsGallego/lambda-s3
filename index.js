const AWS = require('aws-sdk');

const s3 = new AWS.S3(); // This gives us an object that can do S3 things

exports.handler = async (event) => {

  let bucketName = event.Records[0].s3.bucket.name;
  let key = 'images.json';

  let object = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
  let json = JSON.parse(object.Body.toString());

  let photoKey = event.Records[0].s3.object.key;
  let photoSize = event.Records[0].s3.object.size;

  let photoObject = await s3.getObject({ Bucket: bucketName, Key: photoKey }).promise();
  let newObj = {
    image: photoKey,
    size: photoSize
  }

  json.images.push(newObj);

  console.log(newObj, json.images);
  const response = {
    statusCode: 200,
    body: JSON.stringify(json)
  };
  console.log(json, response.body, json.images)
  console.log(response.body.toString())
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: response.body,
    ContentType: 'json'
  }

  s3.putObject(params, function (error, data) {
    if (error) console.log(error.message)
    else console.log(`File successfully uploaded to ${bucketName}`)
  })

  return response;
};