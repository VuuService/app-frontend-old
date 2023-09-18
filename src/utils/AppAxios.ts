import axios from 'axios'
import { userStore } from '@/stores/AuthStore'

const appAxios = axios.create({
  baseURL: 'https://localhost:3000',
  withCredentials: true
})
appAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      const user = userStore()
      user.logout()
    }
    return Promise.reject(error)
  }
)

export default appAxios
