import Common from '@/components/Common'
import { IconCheckPayment } from '@/components/Icons/IconCheckPayment'
import ConfigService from '@/services/config.service'
import useSkinsStore from '@/stores/skins.store'
import Toast from '@/tools/toast.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

interface IProps {
  sellerId: string
  token: string
}

export default function ModalPaymentMade({ sellerId, token }: IProps) {
  const router = useRouter()
  const { setOpenModalBuySkin } = useSkinsStore()

  return (
    <Dialog.Content
      onPointerDownOutside={(event) => event.preventDefault()}
      onEscapeKeyDown={(event) => event.preventDefault()}
      className="fixed left-1/2 top-1/2 z-30 flex h-2/5
    w-2/5 min-w-[500px] -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center
    justify-center gap-8 rounded-md bg-mesh-color-neutral-800"
    >
      <div className="flex flex-col items-center gap-8">
        <IconCheckPayment />
        <p className="text-center text-xl font-medium text-white">
          <span className="font-bold">
            Seu pagamento foi efetuado com sucesso!
          </span>
          <br />
          Clique no botão abaixo para fazer a proposta de troca com o vendedor.
        </p>
      </div>

      <Common.Button
        onClick={async () => {
          const tradeLink = await ConfigService.findByConfigUserId(
            sellerId,
            token,
          )

          if (tradeLink.status === 200) {
            Toast.Loading('Redirecionando para a página de troca da Steam...')

            setTimeout(() => {
              Object.assign(document.createElement('a'), {
                target: '_blank',
                rel: 'noopener noreferrer',
                href: tradeLink.data.url_trade,
              }).click()

              setOpenModalBuySkin(false)
              router.push('/')
            }, 2000)
          } else {
            Toast.Error(
              'Não foi possível acessar a página de troca da Steam no momento. Acesse novamente pela página de Transações nas Notificações.',
            )

            setTimeout(() => {
              setOpenModalBuySkin(false)
              router.push('/')
            }, 2000)
          }
        }}
        type="button"
        className="h-11 w-3/4 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-4 py-3 text-lg font-bold text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
      >
        Prosseguir
      </Common.Button>
    </Dialog.Content>
  )
}
