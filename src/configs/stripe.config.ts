import { loadStripe } from '@stripe/stripe-js'

const configValue = process.env.NEXT_PUBLIC_STRIPE_KEY as string

export async function getStripe() {
  return await loadStripe(configValue)
}
