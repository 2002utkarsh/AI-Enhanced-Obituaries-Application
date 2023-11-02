def lambda_handler(event, context):
    image_url = event["image_url"].split("image/upload/")
    new_image_url = f"{image_url[0]}image/upload/e_art:zorro/{image_url[1]}"

    return {
        "id": event["id"],
        "name": event["name"],
        "birth_date": event["birth_date"],
        "death_date": event["death_date"],
        "obituary": event["obituary"],
        "image_url": new_image_url,
        "mp3_url": event["mp3_url"]
    }
