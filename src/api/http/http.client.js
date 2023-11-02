import axios from "axios"

export async function get(url, headers) {
  const response = await axios({
    method: "get",
    url,
    headers,
  })

  return response.data
}

export async function post(url, body) {
  const response = await axios({
    method: "post",
    url,
    data: body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  return response.data
}

export async function postFormData(url, form) {
  const response = await axios({
    method: "post",
    url,
    data: form,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}