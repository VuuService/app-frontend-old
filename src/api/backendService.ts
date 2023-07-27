import axios from 'axios'

const BASE_URL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// bearer token
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export { api }
