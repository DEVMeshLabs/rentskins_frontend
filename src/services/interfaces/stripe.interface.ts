export interface IStripeCreatePayment {
  owner_id: string
  success_url: string
  cancel_url: string
  amount: number | string
  payment_method: 'card' | 'boleto' | 'pix'
}

export interface IStripeCreatePaymentResponse {
  url: string
}
