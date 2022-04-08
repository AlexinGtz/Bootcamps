import json
import boto3

dynamodb = boto3.client('dynamodb', region_name='us-west-1')

def lambda_handler(event, context):

    returnedVal = dynamodb.putItem(TableName='users', Item= {
        'id': {
            'S': '1234Fr'
        },
        'name': {
            'S': 'Alex'
        },
        'age': {
            'N': '26'
        }
    })

    return {
        'statusCode': 200,
        'body': json.dumps(returnedVal),
        'headers': {
            'Content-Type': 'application/json'
        },
    }