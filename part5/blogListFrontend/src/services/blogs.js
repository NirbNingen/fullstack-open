import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  console.log(`New Object is: ${JSON.stringify(newObject)}`)
  const config = {
    headers: { Authorization: token },
  }
  console.log(`Config: ${JSON.stringify(config)}`)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)

  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteBlog, setToken }
