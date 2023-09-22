import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import { IconRecusePayment } from '@/components/Icons/IconRecusePayment'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import ConfigService from '@/services/config.service'
import { useQuery } from '@tanstack/react-query'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import { ModalPaymentMain } from '../ModalPayment/ModalPaymentMain'

export default function ModalPaymentRefused() {
  const { setOpenModalBuySkin } = useSkinsStore()
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
    userHasConfig.data &&
    userHasConfig!.data?.owner_email !== '' &&
    userHasConfig!.data?.owner_phone !== '' &&
    userHasConfig!.data?.owner_cpf !== '' &&
    userHasConfig!.data?.url_trade !== ''

  const disableAddButton = isLoading || !configValidation

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
        <IconRecusePayment />
        <div className="flex flex-col gap-8 text-center text-xl font-medium text-white">
          <p className="px-10">
            <span className="font-bold">Falta de saldo! </span>
            Lamentamos informar que sua transação foi recusada devido à falta de
            saldo suficiente em sua conta.
          </p>
          <span className="px-4">
            Para prosseguir com a transação, é necessário recarregar sua conta
            com saldo em nossa plataforma
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        <ModalPaymentMain>
          <Common.Button
            type="button"
            disabled={disableAddButton}
            className="h-11 w-3/4 border-mesh-color-primary-1200 bg-mesh-color-primary-1200 px-4 py-3 text-lg font-bold text-mesh-color-others-black disabled:border-mesh-color-neutral-500 disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-300"
          >
            Recarregar Agora
          </Common.Button>
        </ModalPaymentMain>
        <Dialog.Close asChild onClick={() => setOpenModalBuySkin(false)}>
          <Common.Button className="border-transparent font-bold text-white">
            Fechar
          </Common.Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  )
}
