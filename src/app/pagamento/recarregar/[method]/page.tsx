import PagePaymentRecharge from '@/components/Pages/PagePayment/PagePaymentRecharge/PagePaymentRecharge'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export default function PaymentAddPage() {
  const referer = headers().get('referer')

  if (referer === null) {
    notFound()
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-start bg-mesh-color-others-black text-white">
      <PagePaymentRecharge />
    </main>
  )
}
