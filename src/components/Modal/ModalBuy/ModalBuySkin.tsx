'use client'
import { IconGift } from '@/components/Icons/IconGift'
import { CardSkinModal } from '@/components/Others/CardSkinModal'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalInfoSkin } from './ModalInfoSkin'
import { ModalTitleSkin } from './ModalTitleSkin'
import { ModalConfirm } from './ModalComfirm'

//

export function ModalBuySkin() {
  const { setOpenModalBuySkin, skinToBuy, setWhatModalOpenToBuySkin } =
    useSkinsStore()

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30  w-2/3
    min-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-mesh-color-neutral-800 xl:w-[790px]"
    >
      <CardSkinModal.Root>
        <CardSkinModal.Content
          skinColor={skinToBuy?.skinColor!}
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
          label="Comprar skin"
        />
        <div className="mb-[10px] flex justify-between">
          <ModalInfoSkin
            label={[
              {
                subtitle: 'Valor total da Skin',
                value: Number(skinToBuy?.skinPrice!),
              },
            ]}
          >
            <p className="text-mesh-color-neutral-0">
              Após a conclusão bem-sucedida da compra e a entrega da skin
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
          onClick={() => setWhatModalOpenToBuySkin(2)}
          label="Comprar"
        />
      </div>
    </Dialog.Content>
  )
}
