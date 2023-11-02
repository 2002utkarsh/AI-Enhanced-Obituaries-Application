import { post, get, postFormData } from "./http/http.client"

export async function createObituary(
    id,
    name,
    birthDate,
    deathDate,
    imageData
) {
    const url =
        "https://a6ffd4mo5m6hp4uru4h32iyfuy0wehzr.lambda-url.ca-central-1.on.aws/"
    const request = {
        name: name,
        birth_date: birthDate,
        death_date: deathDate,
        imageData,
    }

    const formData = new FormData()
    formData.append("id", id)
    formData.append("name", name)
    formData.append("birth_date", birthDate)
    formData.append("death_date", deathDate)
    formData.append("image_data", imageData)

    console.log("posting..", request)
    const response = await postFormData(url, formData)
    return response
}

export async function getAll() {
    const url =
        "https://xy2esrfeoofimfuiy7q6asgbxm0yesdt.lambda-url.ca-central-1.on.aws/"

    const response = await get(url)
    console.log(response)
    return response.body.items
}