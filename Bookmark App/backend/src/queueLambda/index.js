const AWS = require('aws-sdk');
var sqs = new AWS.SQS()

exports.handler = async () => {
  const params = {
      QueueUrl: process.env.QUEUE,
  }

  const messages = await sqs.receiveMessage(params).promise();

  console.log("Messages", messages);
  
  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": '*'},
    body: JSON.stringify(messages)
    };
}