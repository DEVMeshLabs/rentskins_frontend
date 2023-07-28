import axios from 'axios'

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api-rentskin-backend-on.onrender.com/v1'

export const Api = axios.create({ baseURL })
