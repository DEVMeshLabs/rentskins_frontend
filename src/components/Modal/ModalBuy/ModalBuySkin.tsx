'use client'
import { IconGift } from '@/components/Icons/IconGift'
import { CardSkinModal } from '@/components/Others/CardSkinModal'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import useSkinsStore from '@/stores/skins.store'
import Toast from '@/tools/toast.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import { ModalConfirm } from './ModalComfirm'
import { ModalInfoSkin } from './ModalInfoSkin'
import { ModalTitleSkin } from './ModalTitleSkin'
import { useQuery } from '@tanstack/react-query'

interface IProps {
  onClick: () => void
}

export function ModalBuySkin({ onClick }: IProps) {
  const { data: session } = useSession()
  const trueSession = session as ISteamUser

  const {
    setOpenModalBuySkin,
    skinToBuy,
    itemAvailable,
    setWhatModalOpenToBuySkin,
  } = useSkinsStore()

  const { data: inventory, refetch } = useQuery({
    queryKey: ['inventory', trueSession.user?.steam?.steamid!],
    queryFn: () =>
      SkinService.findBySkinsInventory(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      ),
    enabled: false,
  })

  const checkInventoryAvailability = async (): Promise<boolean> => {
    await refetch()

    if (inventory && inventory?.data && inventory?.data?.length > 0) return true

    Toast.Error(
      'Não foi possível comprar o item. Verifique se o seu inventário se encontra público e tente novamente.',
    )
    return false
  }

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30  w-2/3
    min-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-mesh-color-neutral-800 xl:w-[790px]"
    >
      <CardSkinModal.Root>
        <CardSkinModal.Content
          skinRarity={skinToBuy?.skinRarity!}
          skinFloat={skinToBuy?.skinFloat!}
          skinImage={skinToBuy?.skinImage!}
          skinName={skinToBuy?.skinName!}
          skinWeapon={skinToBuy?.skinWeapon!}
          statusFloat={skinToBuy?.statusFloat!}
        />
      </CardSkinModal.Root>
      <div className="flex flex-col gap-5 rounded-b-2xl rounded-t-xl bg-mesh-color-neutral-700 px-8 py-6">
        <ModalTitleSkin
          onClick={() => setOpenModalBuySkin(false)}
          label="Comprar Item"
        />
        <div className="mb-[10px] flex justify-between">
          <ModalInfoSkin
            label={[
              {
                subtitle: 'Valor total',
                value: skinToBuy?.skinPrice!,
              },
            ]}
          >
            <p className="text-mesh-color-neutral-0">
              Após a conclusão bem-sucedida da compra e a entrega do item
              conforme o esperado, o valor total será confirmado e a transação
              será finalizada com sucesso.
            </p>
          </ModalInfoSkin>
          <div>
            <IconGift />
          </div>
        </div>
        <hr className="w-full border-mesh-color-neutral-200" />
        <ModalConfirm
          itemAvailable={itemAvailable}
          onClick={async () => {
            if (!(await checkInventoryAvailability())) {
              return null
            }

            onClick()
            setWhatModalOpenToBuySkin(2)
          }}
          label="Comprar"
        />
      </div>
    </Dialog.Content>
  )
}
