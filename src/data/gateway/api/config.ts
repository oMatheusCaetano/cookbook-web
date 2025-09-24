import { Storage } from "@/lib"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

api.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.getApiToken()
export { api }
