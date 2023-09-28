import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import useModalStore from '@/stores/modal.store'
import * as Dialog from '@radix-ui/react-dialog'

export default function ModalLeftToSteam() {
  const { setWhatModalOpenToReturnSkin } = useModalStore()

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30
    flex min-w-[613px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8 rounded-xl bg-mesh-color-neutral-800 px-8 pb-8 pt-5"
    >
      <div>
        <Dialog.Close
          className="absolute right-8 top-5 z-10 cursor-pointer"
          onClick={() => setWhatModalOpenToReturnSkin(0)}
          asChild
        >
          <Common.Button className="border-transparent">
            <IconClose />
          </Common.Button>
        </Dialog.Close>
      </div>

      <div className="flex max-w-md flex-col items-center gap-8">
        <p className="text-center text-xl font-medium text-white">
          Você está prestes a ser redirecionado para a plataforma Steam para
          finalizar a troca com a RentSkins. Certifique-se de seguir as etapas
          necessárias na Steam para concluir a transação de troca da skin
          vendida.
        </p>
        <div className="flex gap-8 self-end">
          <Common.Button
            color="invisible"
            onClick={() => setWhatModalOpenToReturnSkin(0)}
            className="border-none font-bold text-mesh-color-neutral-200"
          >
            Voltar
          </Common.Button>
          <Common.Button
            type="button"
            className="h-11 w-3/4 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-4 py-3 text-lg font-bold text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
            onClick={() => setWhatModalOpenToReturnSkin(2)}
          >
            Ir para Steam
          </Common.Button>
        </div>
      </div>
    </Dialog.Content>
  )
}
