console.log('Loading function');
const AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
  console.log('event= ' + JSON.stringify(event));
  console.log('context= ' + JSON.stringify(context));

  const runContext = event.ExecutionContext;
  console.log('runContext= ' + runContext);

  const runContextName = runContext.Execution.Name;
  console.log('runContextName= ' + runContextName);

  const statemachineName = runContext.StateMachine.Name;
  console.log('statemachineName= ' + statemachineName);

  const taskToken = runContext.Task.Token;
  console.log('taskToken= ' + taskToken);

  const apigwEndpint = event.APIGatewayEndpoint;
  console.log('apigwEndpint = ' + apigwEndpint)

  const approveEndpoint = apigwEndpint + "?action=approve&ex=" + runContextName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
  console.log('approveEndpoint= ' + approveEndpoint);

  const rejectEndpoint = apigwEndpint + "?action=reject&ex=" + runContextName + "&sm=" + statemachineName + "&taskToken=" + encodeURIComponent(taskToken);
  console.log('rejectEndpoint= ' + rejectEndpoint);

  const contestSnsTopic = process.env.contestSnsTopic;
  console.log('contestSnsTopic= ' + contestSnsTopic);

  var emailMessage = 'Welcome! \n\n';
  emailMessage += 'This is an email requiring an approval for a step functions execution. \n\n'
  emailMessage += 'Please check the following information and click "Approve" link if you want to approve. \n\n'
  emailMessage += 'Run Context Name -> ' + runContextName + '\n\n'
  emailMessage += 'Approval Link: ' +'\n\n'
  emailMessage +=  approveEndpoint  + '\n\n'
  emailMessage += 'Reject Link: ' +'\n\n'
  emailMessage +=  rejectEndpoint  + '\n\n'

  const sns = new AWS.SNS();
  var params = {
    Message: emailMessage,
    Subject: "Required approval from AWS Step Functions",
    TopicArn: contestSnsTopic
  };

  sns.publish(params)
    .promise()
    .then(function(data) {
      console.log("MessageID is " + data.MessageId);
      callback(null);
    }).catch(
      function(err) {
      console.error(err, err.stack);
      callback(err);
    });
}
