import boto3
import os
import json
import time
def lambda_handler(event, context):

    dynamodb = boto3.resource("dynamodb")
    table_name = os.environ["TABLE_NAME"]
    table = dynamodb.Table(table_name)

    status = 201

    response = table.put_item(Item = {
        'id': event["id"],
        'name': event["name"],
        'birth_date': event["birth_date"],
        'death_date': event["death_date"],
        'obituary': event["obituary"],
        'image_url': event["image_url"],
        'mp3_url': event["mp3_url"],
        'created_at': str(int(time.time()))
        })
    
    return json.dumps({ 
        "status": status,
    })

