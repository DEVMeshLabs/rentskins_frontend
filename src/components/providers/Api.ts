import axios from 'axios'

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333'

export const Api = axios.create({ baseURL })
