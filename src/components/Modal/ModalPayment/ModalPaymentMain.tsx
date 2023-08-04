'use client'
import useComponentStore from '@/stores/components.store'
import URLQuery from '@/tools/urlquery.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SetStateAction, useEffect, useState } from 'react'
import { ModalPaymentAdd } from './ModalPaymentAdd'
import { ModalPaymentCheck } from './ModalPaymentCheck'
import { ModalPaymentRetrieveMain } from './ModalPaymentRetrieve/ModalPaymentRetrieveMain'

export function ModalPaymentMain() {
  const { status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<string | undefined>('')
  const [modalType, setModalType] = useState<string | undefined>('')

  const {
    paymentGeneralIndex,
    setPaymentGeneralIndex,
    setPaymentRetrieveIndex,
  } = useComponentStore()

  useEffect(() => {
    const open = searchParams.get('modalopen') as SetStateAction<
      string | undefined
    >
    const type = searchParams.get('modaltype') as SetStateAction<
      string | undefined
    >

    setModalOpen(open)
    setModalType(type)

    if (status !== 'authenticated') {
      router.push(URLQuery.removeQuery(['modalopen', 'modaltype']))
    }

    setPaymentGeneralIndex(0)
    setPaymentRetrieveIndex(0)
  }, [
    searchParams,
    setPaymentGeneralIndex,
    setPaymentRetrieveIndex,
    status,
    router,
  ])

  const removeDomainQuery = () => {
    router.push(URLQuery.removeQuery(['modalopen', 'modaltype']))
  }

  const handleModalOnClose = () => {
    setPaymentGeneralIndex(0)
    setPaymentRetrieveIndex(0)
  }

  return (
    <Dialog.Root
      modal
      open={
        modalOpen === 'true' &&
        modalType === 'payment' &&
        status === 'authenticated'
      }
      defaultOpen={false}
      onOpenChange={() => handleModalOnClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-20 flex bg-black/70 transition-all"
          onClick={() => removeDomainQuery()}
        />
        {paymentGeneralIndex === 0 && <ModalPaymentCheck />}
        {paymentGeneralIndex === 1 && <ModalPaymentAdd />}
        {paymentGeneralIndex === 2 && <ModalPaymentRetrieveMain />}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
