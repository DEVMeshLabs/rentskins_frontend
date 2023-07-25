'use client'
import Common from '@/components/Common'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { CardSkinInventory } from '@/components/Others/CardSkin/CardSkinInventory'
import ConfigService from '@/services/config.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'

export function PageInventoryMiddle() {
  const {
    user: { steamid },
  } = useUserStore()

  const { data: userHasConfig, isLoading } = useQuery({
    queryKey: ['config'],
    queryFn: async () => ConfigService.findByConfigUserId(steamid as string),
    enabled: !!steamid,
  })

  return (
    <div className="mb-6 min-h-[1000px]">
      <LayoutLoading
        className="h-[50vh]"
        label="Carregando..."
        enabled={isLoading}
      >
        {!userHasConfig || userHasConfig.status !== 200 ? (
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
              activator={
                <Common.Button className="mt-4 h-10 w-full rounded-xl border-none bg-mesh-color-primary-1400 font-semibold text-black">
                  Conectar-se
                </Common.Button>
              }
            />
          </div>
        ) : (
          <CardSkinInventory steamid={`${steamid}`} />
        )}
      </LayoutLoading>
    </div>
  )
}
