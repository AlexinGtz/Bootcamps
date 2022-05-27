const AWS = require('aws-sdk');

exports.handler = async event => {
  console.log(event.Records);

  for(const record of event.Records) {
    console.log(record)
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
    console.log(payload);
  }
}

