const AWS = require('aws-sdk');

const s3 = new AWS.S3(); // This gives us an object that can do S3 things

// The main function that does it all!
exports.handler = async (event) => {
  
  // This gets the bucket name from the event object
  let bucketName = event.Records[0].s3.bucket.name;
  
  // This sets the main key, if it exists then we download the file, if it doesn't we add this key when uploading the newly created array
  let key = 'images.json';

  
  let imgArray = [];

  try {
    let object = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
    let json = JSON.parse(object.Body.toString());
    imgArray = json;
  } catch (error) {
    console.log('File Not Found')
  }

  // This deals with the images as they are uploaded 
  let photoKey = event.Records[0].s3.object.key;
  let photoSize = event.Records[0].s3.object.size;

  // Makes the new object that will be stored in the images.json file
  let photoObject = await s3.getObject({ Bucket: bucketName, Key: photoKey }).promise();
  let newObj = {
    image: photoKey,
    size: photoSize,
    type: 'image/jpg'
  }

  imgArray.push(newObj);

  const response = {
    statusCode: 200,
    body: JSON.stringify(imgArray)


  };

  // Sets the params for the putObject method
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: response.body,
    ContentType: 'application/json'
  }

  // This uploads the images.json file
  const result = await s3.putObject(params).promise();
  console.log('File uploaded successfully!', result);

  return response;
};
