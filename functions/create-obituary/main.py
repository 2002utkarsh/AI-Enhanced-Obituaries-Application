import requests
import boto3

# STEP 1
def lambda_handler(event, context):
    
    print("Initialize generation")
    print(event)

    prompt = create_prompt(event["name"], event["birth_date"], event["death_date"])
    print("Prompt: " + prompt)

    obituary = create_obituary(prompt)
    print(obituary)

    return {
        "id": event["id"],
        "name": event["name"],
        "birth_date": event["birth_date"],
        "death_date": event["death_date"],
        "image_url": event["image_url"],
        "obituary": obituary.replace("\n", "")
    }

def create_prompt(name, birth_date, death_date):

    return f'write an obituary about a fictional character named {name} who was born on {birth_date} and died on {death_date}.'

def create_obituary(prompt):

    open_ai_url = "https://api.openai.com/v1/completions"
    body = {
        "model": "text-curie-001",
        "prompt": prompt,
        "max_tokens": 650,
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        "stream": False,
    }

    ssm_client = boto3.client('ssm')
    api_key = ssm_client.get_parameter(Name="/openai/apikey", WithDecryption=True)

    headers = {"Authorization": "Bearer " + api_key['Parameter']['Value']}

    response = requests.post(open_ai_url, json=body, headers=headers)

    print(response.json())

    text = response.json()["choices"][0]["text"]

    return text

