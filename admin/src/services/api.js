import axios from 'axios'

const getBaseURL = () => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000') {
    return 'http://localhost:3000/api'
  }
  return import.meta.env.VITE_API_URL || '/api'
}

const api = axios.create({ baseURL: getBaseURL(), timeout: 5000 })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kebun_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem('kebun_token')
    if (error.response?.status === 401 && token !== 'demo-token') {
      localStorage.removeItem('kebun_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api
