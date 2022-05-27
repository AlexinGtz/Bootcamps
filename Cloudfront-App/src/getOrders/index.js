const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB();

const transformResponse = (current) => {
        let newItem;
        const type = Object.keys(current)[0];
        switch(type){
            case 'S':
                newItem = current.S;
            break;
            case 'N':
                newItem = parseFloat(current.N);
                break;
            case 'BOOL':
                newItem = current.BOOL;
            break;
            case 'L': 
                newItem = [];
                for (const item of current.L) {
                    newItem.push(this.itemFactory(item));
                }
            break;
            case 'M': 
                newItem = {};
                for (const key in current.M) {
                    newItem[key] = this.itemFactory(current.M[key]);
                }
            break;
        }
        return newItem;
};

exports.handler = async (event) => {    
    const config = {
        TableName: 'Orders',
        KeyConditionExpression: "#custom_name = :n",
        ExpressionAttributeValues: {
            ":n": {
                S: event.pathParameters.orderId
            }
        },
        ExpressionAttributeNames: { "#custom_name": "name" },
        IndexName: "name-query-index",
    };
    
    const res = await dynamoDB.query(config).promise();
    
    const returnArray = [];

    for (const item of res.Items) {
        const returnObj = {};
        for (const key in item) {
            returnObj[key] = transformResponse(item[key]);
        }
        
        returnArray.push(returnObj);
    }
        
    const response = {
        statusCode: 200,
        body: JSON.stringify(returnArray),
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
    };
    return response;
};
