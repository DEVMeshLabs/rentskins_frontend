'use client'
import { IconGift } from '@/components/Icons/IconGift'
import { CardSkinModal } from '@/components/Others/CardSkinModal'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalInfoSkin } from './ModalInfoSkin'
import { ModalTitleSkin } from './ModalTitleSkin'
import { ModalConfirm } from './ModalComfirm'
import { useEffect, useState } from 'react'

//

export function ModalExchangeSkin() {
  const {
    setOpenModalBuySkin,
    skinToBuy,
    rentTime,
    setWhatModalOpenToBuySkin,
    itemAvailable,
  } = useSkinsStore()
  const [rentPercentage, setRentPercentage] = useState(10)

  const handleSetRentPercentage = () => {
    return {
      '7': () => setRentPercentage(10),
      '14': () => setRentPercentage(18),
      '21': () => setRentPercentage(23),
    }[rentTime as 7 | 14 | 21]()
  }

  useEffect(() => {
    handleSetRentPercentage()
  }, [])

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
          label="Comprar skin"
        />
        <div className="mb-[10px] flex justify-between">
          <ModalInfoSkin
            label={[
              {
                subtitle: 'Valor total da Skin',
                value: Number(skinToBuy?.skinPrice!),
              },
              {
                subtitle: `Preço do Aluguel por ${rentTime} dias:`,
                value: Number(
                  parseFloat(String(skinToBuy?.skinPrice!)) *
                    (rentPercentage / 100),
                ),
              },
            ]}
          >
            <p className="font-medium text-mesh-color-neutral-0">
              Durante o processo de aluguel, será cobrado o valor total da skin{' '}
              <span className="font-bold text-mesh-color-primary-1200">
                (
                {Number(skinToBuy?.skinPrice!).toLocaleString('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                  minimumFractionDigits: 2,
                })}
                )
              </span>{' '}
              como garantia. Essa medida é necessária para assegurar a
              integridade do vendedor e da plataforma durante o período de
              aluguel. Após o término do período de aluguel, caso a skin seja
              devolvida{' '}
              <span className="text-[#FF0000]">com condição adequada</span>, o
              valor residual será reembolsado, e apenas o valor do aluguel será
              cobrado.
            </p>
          </ModalInfoSkin>
          <div>
            <IconGift />
          </div>
        </div>
        <hr className="w-full border-mesh-color-neutral-200" />
        <ModalConfirm
          itemAvailable={itemAvailable}
          onClick={() => setWhatModalOpenToBuySkin(2)}
          label="Alugar"
        />
      </div>
    </Dialog.Content>
  )
}
