'use client'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useEffect } from 'react'
import { ModalBuySkin } from './ModalBuySkin'
import { ModalExchangeSkin } from './ModalExchange'
import { ModalProcessing } from '../ModalProcessing'
import ModalPaymentMade from './ModalPamentMade'
import ModalPaymentRefused from './ModalPaymentRefused'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/stores/user.store'

interface IProps {
  updateSkin: {
    userName: string
    userId: string
    skinId: string
    skinPrice: number
    token: string
  }
}

export function ModalBuyMain({
  updateSkin: { skinId, token, userId, userName, skinPrice },
}: IProps) {
  const {
    openModalBuySkin,
    setOpenModalBuySkin,
    whatModalOpenToBuySkin,
    setWhatModalOpenToBuySkin,
  } = useSkinsStore()
  const { wallet } = useUserStore()

  const onOpenChange = () => {
    setOpenModalBuySkin(!openModalBuySkin)
  }

  const { data: updatedSkin, refetch: refetchUpdatedSkin } = useQuery({
    queryKey: ['updatedSkin'],
    queryFn: () => SkinService.updateSkin(userName, userId, skinId, token),
    enabled: false,
    cacheTime: 0,
  })

  useEffect(() => {
    if (wallet.value && wallet.value < skinPrice) {
      setWhatModalOpenToBuySkin(4)
    } else if (updatedSkin?.status === 204) {
      setWhatModalOpenToBuySkin(3)
    }
  }, [updatedSkin, refetchUpdatedSkin])

  return (
    <Dialog.Root open={openModalBuySkin} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex bg-black/70 transition-all">
          {whatModalOpenToBuySkin === 0 && (
            <ModalBuySkin onClick={() => refetchUpdatedSkin()} />
          )}
          {whatModalOpenToBuySkin === 1 && <ModalExchangeSkin />}
          {whatModalOpenToBuySkin === 2 && <ModalProcessing />}
          {whatModalOpenToBuySkin === 3 && <ModalPaymentMade />}
          {whatModalOpenToBuySkin === 4 && <ModalPaymentRefused />}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
