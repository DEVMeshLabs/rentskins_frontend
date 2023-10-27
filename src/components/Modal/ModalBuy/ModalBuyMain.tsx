'use client'
import TransactionsService from '@/services/transactions.service'
import useSkinsStore from '@/stores/skins.store'
import Toast from '@/tools/toast.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ModalProcessing } from '../ModalProcessing'
import { ModalBuySkin } from './ModalBuySkin'
import { ModalExchangeSkin } from './ModalExchange'
import ModalPaymentMade from './ModalPaymentMade'
import ModalPaymentRefused from './ModalPaymentRefused'

interface IProps {
  createTransaction: {
    userId: string
    skinId: string
    skinPrice: number
    token: string
    sellerId: string
  }
}

export function ModalBuyMain({
  createTransaction: { skinId, token, userId, skinPrice, sellerId },
}: IProps) {
  const router = useRouter()
  const {
    openModalBuySkin,
    setOpenModalBuySkin,
    whatModalOpenToBuySkin,
    setWhatModalOpenToBuySkin,
  } = useSkinsStore()

  const onOpenChange = () => {
    setOpenModalBuySkin(!openModalBuySkin)
  }

  const { data: createTrasaction, refetch: refetchCreateTrasaction } = useQuery(
    {
      queryKey: ['createTrasaction'],
      queryFn: () =>
        TransactionsService.createTransaction({
          skinsToBuy: [
            { skin_id: skinId, seller_id: sellerId, buyer_id: userId },
          ],
          token,
        }),
      enabled: false,
      cacheTime: 0,
    },
  )

  useEffect(() => {
    if (createTrasaction?.status === 201) {
      setWhatModalOpenToBuySkin(3)
    } else if (createTrasaction?.request.status === 400) {
      setWhatModalOpenToBuySkin(4)
    } else if (createTrasaction?.request.status === 409) {
      setWhatModalOpenToBuySkin(0)
      Toast.Error('Desculpe, esse item já foi vendido.', 2000)

      setTimeout(() => router.replace('/'), 2000)
    }
  }, [createTrasaction, refetchCreateTrasaction])

  return (
    <Dialog.Root open={openModalBuySkin} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all">
          {whatModalOpenToBuySkin === 0 && (
            <ModalBuySkin onClick={() => refetchCreateTrasaction()} />
          )}
          {whatModalOpenToBuySkin === 1 && <ModalExchangeSkin />}
          {whatModalOpenToBuySkin === 2 && <ModalProcessing />}
          {whatModalOpenToBuySkin === 3 && (
            <ModalPaymentMade sellerId={sellerId} token={token} />
          )}
          {whatModalOpenToBuySkin === 4 && <ModalPaymentRefused />}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
