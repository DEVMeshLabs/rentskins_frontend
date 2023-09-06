import axios from 'axios'

const configValue = process.env.NEXT_STRIPE_API_KEY_SECRET

export const Stripe = axios.create({
  headers: {
    Authorization: `Bearer ${configValue}`,
  },
  baseURL: 'https://api.stripe.com/v1/',
})
