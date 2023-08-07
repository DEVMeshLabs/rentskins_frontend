'use client'
import KYCMessage from '@/components/Others/KYCMessage'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ModalPaymentRetrieveWarning() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOnProceed = () => {
    router.push('/pagamento/saque')
    setIsLoading(true)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <KYCMessage handleOnProceed={handleOnProceed} isLoading={isLoading} />
    </div>
  )
}
