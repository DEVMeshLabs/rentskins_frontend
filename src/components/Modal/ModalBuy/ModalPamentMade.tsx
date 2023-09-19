import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import { IconCheckPayment } from '@/components/Icons/IconCheckPayment'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'

export default function ModalPaymentMade() {
  const { setOpenModalBuySkin } = useSkinsStore()

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2  z-30
    flex w-2/3 min-w-[700px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8 bg-mesh-color-neutral-800 px-28 pb-8 pt-5 xl:w-[790px]"
    >
      <Dialog.Close
        className="absolute right-8 top-5 z-10 cursor-pointer"
        asChild
        onClick={() => setOpenModalBuySkin(false)}
      >
        <Common.Button className="border-transparent">
          <IconClose />
        </Common.Button>
      </Dialog.Close>

      <div className="flex flex-col items-center gap-8">
        <IconCheckPayment />
        <p className="text-center text-xl font-medium text-white">
          <span className="font-bold">
            Seu pagamento foi efetuado com sucesso!{' '}
          </span>
          Agora, o vendedor responsável pela troca precisa revisar e aprovar a
          troca.
        </p>
      </div>

      <Common.Button
        onClick={() => setOpenModalBuySkin(false)}
        type="button"
        className="h-11 w-3/4 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-4 py-3 text-lg font-bold text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
      >
        Prosseguir
      </Common.Button>
    </Dialog.Content>
  )
}
