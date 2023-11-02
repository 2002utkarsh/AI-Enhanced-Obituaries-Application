import json
from requests_toolbelt.multipart import decoder
import base64
import hashlib
import requests
import time
import boto3
import os
from boto3.dynamodb.conditions import Key

# STEP 0
'''
response
{
    "id": "ec876a8c-d37a4fe2-b7a1-7fbd2d23046a",
    "name": "Test name",
    "birth_date": "04/12/2023, 12:00 AM",
    "death_date": "2023-04-16T04:51:05.816Z",
    "image_url": "http://res.cloudinary.com/du5wbd7af/image/upload/v1681624029/i0dvv2et87hntuqrmgqg.png"
}
'''


def lambda_handler(event, context):
    # get the request body and headers
    headers = event['headers']
    # decode the multipart/form-data request
    postdata = base64.b64decode(event['body'])

    request = {}
    
    for part in decoder.MultipartDecoder(postdata, headers['content-type']).parts:
        # head.append(part.headers)
        # cont.append(part.content)  # content in binary format

        decoded_header = part.headers[b'Content-Disposition'].decode('utf-8')
        key = get_key(decoded_header)

        if (key == "image"):
            request[key] = part.content
        else:
            request[key] = part.content
        
    print(request)

    upload_response = upload(request["image_data"], request["id"].decode('utf-8') + ".png")

    result = {
        "id": request["id"].decode('utf-8'),
        "name": request["name"].decode('utf-8'),
        "birth_date": request["birth_date"].decode('utf-8'),
        "death_date": request["death_date"].decode('utf-8'),
        "image_url": upload_response["url"]
    }

    print("Initiate step function")
    sf_response = initiateSteps(result) # Initiate Step function

    time.sleep(9) # Wait 9s

    item = get_item(result["id"])

    item_found = False
    if (len(item) > 0):
        print("Item added")
        print(item)
        item_found = True
        
    else:
        for i in range(8):
            item = get_item(result["id"])
            if (len(item) > 0):
                print("Item added")
                print(item)
                item_found = True
                break
            else:
                print("New obituary not yet added")
                time.sleep(3)

    print(sf_response)

    if item_found == True:
        print("Adding fields to response")
        result["obituary"] = item[0]["obituary"]
        result["mp3_url"] = item[0]["mp3_url"]

    return json.dumps(result)



def get_key(form_data):
    # 'form-data; name="birth_date"', 'content': b'2012-123'
    key = form_data.split(";")[1].split("=")[1].replace('"', '')

    print(key)

    return key


def upload(image_data, filename):

    print("Intiating upload with filename " + filename )

    ssm_client = boto3.client('ssm')
    cloud_name = ssm_client.get_parameter(Name="/cloudinary/cloudname")
    api_key = ssm_client.get_parameter(Name="/cloudinary/apikey", WithDecryption=True)
    api_secret = ssm_client.get_parameter(Name="/cloudinary/apisecret", WithDecryption=True)

    cloud_name = cloud_name['Parameter']['Value']
    api_key = api_key['Parameter']['Value']
    api_secret = api_secret['Parameter']['Value']

    url = f"https://api.cloudinary.com/v1_1/{cloud_name}/image/upload"
    timestamp = str(int(time.time()))

    request = {
        "signature": "",
        "api_key": api_key,
        "timestamp": timestamp,
    }

    # Generate the signature for the request
    signature = hashlib.sha1(f"timestamp={request['timestamp']}{api_secret}".encode()).hexdigest()
    request['signature'] = signature

    response = requests.post(url, params=request, files={'file': (filename, image_data)})

    if (response.status_code != 200):
        print(response)
        raise Exception("Unable to upload img")
    
    print(response.json())

    return response.json()

def get_item(id):

    dynamo = boto3.resource('dynamodb')
    print("Looking up item with id: " + id)
    table = dynamo.Table(os.environ["TABLE_NAME"])

    item = table.query(
        KeyConditionExpression=Key('id').eq(id)
    )

    print(item)
    return item['Items']

def initiateSteps(request):
    sf = boto3.client('stepfunctions')

    response = sf.start_execution(
        stateMachineArn = os.environ["STEP_FN_ARN"],
        input = json.dumps(request)
    )
    return response

