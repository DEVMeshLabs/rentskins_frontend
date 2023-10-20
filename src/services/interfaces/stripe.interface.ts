export interface IStripeCreatePayment {
  owner_id: string
  email: string
  success_url: string
  cancel_url: string
  cpf: string
  amount: number | string
  payment_method: 'card' | 'boleto' | 'pix'
}

export interface IStripeCreatePaymentResponse {
  url: string
}
