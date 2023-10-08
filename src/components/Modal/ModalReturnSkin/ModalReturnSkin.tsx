'use client'
import { CardSkinModal } from '@/components/Others/CardSkinModal'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalConfirm } from '../ModalBuy/ModalComfirm'
import { ModalInfoSkin } from '../ModalBuy/ModalInfoSkin'
import { ModalTitleSkin } from '../ModalBuy/ModalTitleSkin'
import useModalStore from '@/stores/modal.store'
import IconReturn from '@/components/Icons/IconReturn'
import { ModalInfoRent } from './ModalInfoRent'

interface IProps {
  onClick: () => void
}

export function ModalReturnSkin({ onClick }: IProps) {
  const { skinToReturn, itemAvailableToReturn } = useModalStore()

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30  w-2/3
    min-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-mesh-color-neutral-800 xl:w-[790px]"
    >
      <CardSkinModal.Root>
        <CardSkinModal.Content
          skinRarity={skinToReturn?.skinRarity!}
          skinFloat={skinToReturn?.skinFloat!}
          skinImage={skinToReturn?.skinImage!}
          skinName={skinToReturn?.skinName!}
          skinWeapon={skinToReturn?.skinWeapon!}
          statusFloat={skinToReturn?.statusFloat!}
        />
      </CardSkinModal.Root>
      <div className="flex flex-col gap-5 rounded-b-2xl rounded-t-xl bg-mesh-color-neutral-700 px-8 py-6">
        <ModalTitleSkin onClick={() => {}} label="Devolução" />
        <div className="mb-[10px] flex justify-between">
          <div className="flex flex-col gap-3">
            <div>
              <ModalInfoSkin
                classNameTitle="text-xl"
                label={[
                  {
                    subtitle: 'Valor a ser Reembolsado',
                    value: 742.5,
                  },
                ]}
              />
              <ModalInfoSkin
                classNameTitle="text-base"
                label={[
                  {
                    subtitle: 'Valor total do Aluguel',
                    value: 82.5,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-5">
              <ModalInfoRent
                label={[
                  {
                    title: 'Período do Aluguel',
                    subtitle: '7 Dias',
                  },
                ]}
              />
              <ModalInfoRent
                label={[
                  {
                    title: 'Data de Início',
                    subtitle: '01/01/2023',
                  },
                  {
                    title: 'Data de Término',
                    subtitle: '07/01/2023',
                  },
                ]}
              />
            </div>
            <p className="text-mesh-color-neutral-0">
              A devolução será processada assim que confirmarmos o recebimento
              da skin.
            </p>
          </div>
          <div>
            <IconReturn />
          </div>
        </div>
        <hr className="w-full border-mesh-color-neutral-200" />
        <ModalConfirm
          itemAvailable={itemAvailableToReturn}
          onClick={() => {
            onClick()
          }}
          label="Devolução"
        />
      </div>
    </Dialog.Content>
  )
}
