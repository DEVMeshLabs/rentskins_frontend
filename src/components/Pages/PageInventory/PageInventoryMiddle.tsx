'use client'
import Common from '@/components/Common'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { CardSkinInventory } from '@/components/Others/CardSkin/CardSkinInventory'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function PageInventoryMiddle() {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const { data: userHasConfig, isLoading } = useQuery({
    queryKey: ['config'],
    queryFn: async () =>
      ConfigService.findByConfigUserId(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      ),
    enabled: status === 'authenticated',
  })

  const configValidation =
    userHasConfig &&
    userHasConfig!.data.owner_email !== '' &&
    userHasConfig!.data.owner_phone !== '' &&
    userHasConfig!.data.owner_cpf !== '' &&
    userHasConfig!.data.url_trade !== '' &&
    userHasConfig!.data.agreed_with_terms

  return (
    <div className="mb-6 min-h-[1000px]">
      <LayoutLoading
        className="h-[50vh]"
        label="Carregando..."
        enabled={isLoading}
      >
        {!isLoading && !configValidation ? (
          <div className="mx-auto w-[60%] rounded-xl bg-mesh-color-others-eerie-black px-5 py-5">
            <Common.Title
              bold={700}
              color="white"
              className="text-center font-bold"
            >
              Para ter acesso às suas skins e realizar transações, é necessário
              vincular seu inventário à Steam
            </Common.Title>
            <ModalConnectInventoryMain
              userConfig={userHasConfig?.data}
              activator={
                <Common.Button className="mt-4 h-10 w-full rounded-xl border-none bg-mesh-color-primary-1400 font-semibold text-black">
                  Conectar-se
                </Common.Button>
              }
            />
          </div>
        ) : (
          <CardSkinInventory />
        )}
      </LayoutLoading>
    </div>
  )
}
