import boto3
import os
import json

def lambda_handler(event, context):

    dynamodb = boto3.resource("dynamodb")
    table_name = os.environ["TABLE_NAME"]

    status = 200

    table = dynamodb.Table(table_name)

    response = table.scan()

    print(response)
    
    return json.dumps({ 
        "status": status,
        "body": {
            "count": response["Count"],
            "items": response["Items"]
        }
    })