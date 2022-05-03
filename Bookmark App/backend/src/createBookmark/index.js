// var AWSXRay = require('aws-xray-sdk');
// var AWS = AWSXRay.captureAWS(require('aws-sdk'));
// var dynamodb = AWSXRay.captureAWSClient(new AWS.DynamoDB());

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var sqs = new AWS.SQS();

exports.handler = async message => {
  console.log(message);

  // //Fail the messages randomly to see those errors in X-Ray tracing. It's for testing only.
  // if(Math.random() < 0.3)
  //   throw new Error('An unknown error occurred');
  
  // //Timeout failures about 10%
  // if(Math.random() < 0.2) {
  //    await new Promise(resolve => setTimeout(resolve, 10000));
  // };  

  if (message.body) {
    let bookmark = JSON.parse(message.body);
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: bookmark.id },
        bookmarkUrl: { S: bookmark.bookmarkUrl },
        name: { S: bookmark.name },
        description: { S: bookmark.description },
        username: { S: bookmark.username },
        shared: { BOOL: bookmark.shared },
        contest: {S: "na"}
      }
    };
    
    // var segment = AWSXRay.getSegment();
    // await addSegment(segment,message);
    
    console.log(`Adding bookmark to table ${process.env.TABLE_NAME}`);
    await dynamodb.putItem(params).promise()
    console.log(`New bookmark added to the inventory`);

    const SQSParams = {
      MessageBody: JSON.stringify({
          Item: bookmark
      }),
      QueueUrl: process.env.QUEUE,
      MessageAttributes: {
          user: {
              DataType: "String",
              StringValue: "Alex"
          }
      }
  }
  
   await sqs.sendMessage(SQSParams).promise();
  }

  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": '*'},
    body: JSON.stringify({})
  };
}

// const addSegment = (segment,message) => {

//   let bookmark = JSON.parse(message.body);
//   const f = async (subsegment) => {

//       subsegment.addAnnotation('uid',bookmark.id);
//       subsegment.addAnnotation('name',bookmark.name);
//       subsegment.addMetadata('bookmarkUrl', bookmark.bookmarkUrl);
//       subsegment.addMetadata('username', bookmark.username);

//       subsegment.close();
//   };
//   AWSXRay.captureAsyncFunc("adding annotations and metadata", f, segment);
// };