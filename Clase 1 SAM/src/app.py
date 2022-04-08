import json
import uuid
import boto3

dynamodb = boto3.client('dynamodb', region_name='us-west-1')

def lambda_handler(event, context):

    returnedVal = dynamodb.put_item(TableName='users', Item= {
        'id': {
            'S': uuid.uuid4()
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