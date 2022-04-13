# Lambda-S3

![class 17 UML](./class-17-uml.png)

## How To Use The Lambda

Add an image to the s3 bucket and that triggers the function.
If the `images.json` file exists, then the function will download it and update it with the new image.  
If it does not exist, then an empty array is created, the uploaded image is added to that array, then the array is uploaded to the s3 Bucket.

## Issues Encountered

There wasn't really direction given during class in terms of the "upload the file back to the bucket", maybe this was on purpose?  A test to see if we could figure it out?  It took some time and some googling, but I did figure it out using hte `putObject` method.  
I needed to update the policy, but it is all working as intended.  

Below you can see that I was able to download the `images.json` file, then add the freshly uploaded image to the list, and finally send the list back to the bucket.

## Images File

![Working Lambda](./lambdaImage.png)

[Link to s3 Images](https://image-lambda-lab17.s3.us-west-2.amazonaws.com/images.json)
