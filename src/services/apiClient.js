import axios from 'axios'

class ApiClient {
  constructor () {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      withCredentials: true
    })
  }

  get (endpoint) {
    return this.apiClient.get(endpoint)
  }

  post (endpoint, data) {
    return this.apiClient.post(endpoint, data)
  }

  put (endpoint, data) {
    return this.apiClient.put(endpoint, data)
  }

  delete (endpoint, data) {
    return this.apiClient.delete(endpoint, data)
  }
}

const apiClient = new ApiClient()
export default apiClient
