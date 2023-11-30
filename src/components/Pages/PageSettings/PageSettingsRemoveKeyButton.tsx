import Common from '@/components/Common'
import ModalBlank from '@/components/Modal/ModalBlank'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import Toast from '@/tools/toast.tool'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

interface IProps {
  showButton: boolean
  session: ISteamUser
}

export default function PageSettingsRemoveKeyButton({
  showButton,
  session,
}: IProps) {
  const [isLoading, setIsLoading] = useState(false)

  const removeKey = async () => {
    setIsLoading(true)
    const response = await ConfigService.updateConfig({
      token: session.user?.token!,
      key: '',
    })

    if (response?.status !== 204) {
      Toast.Error(
        'Não foi possível remover a chave, tente novamente mais tarde.',
      )
    } else {
      Toast.Success('Chave removida com sucesso.')
    }

    window.location.reload()
  }

  return showButton ? (
    <ModalBlank
      contentClassname="w-1/3 h-1/3 flex items-center"
      activator={
        <Common.Button className="w-29 h-full max-h-[40px] overflow-hidden text-ellipsis rounded-md border-none px-2 py-2 text-center text-xs font-bold text-mesh-color-rarity-lowest opacity-70 hover:opacity-100 disabled:opacity-70 2xl:text-base">
          Remover Chave
        </Common.Button>
      }
    >
      <div className="flex h-full flex-col items-center justify-between font-semibold">
        <p className="text-xl text-white">Deseja realmente remover a chave?</p>
        <p className="px-8 text-center text-base text-mesh-color-neutral-300">
          Caso você tenha itens locados e afins, nós não poderemos provir
          suporte durante a rastreabilidade dos processos. Não podendo recorrer
          no caso da divergência das operações.
        </p>
        <div className="flex w-full justify-end gap-4">
          <DialogClose className="max-h-[40px] w-fit overflow-hidden text-ellipsis rounded-md border-none px-4 py-2 text-center text-mesh-color-neutral-200 opacity-70 hover:opacity-100 disabled:opacity-70">
            Voltar
          </DialogClose>
          <button
            onClick={() => removeKey()}
            disabled={isLoading}
            className="max-h-[40px] w-52 overflow-hidden text-ellipsis rounded-md border-none bg-mesh-color-rarity-lowest px-4 py-2 text-center text-white opacity-70 hover:opacity-100 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="relative -top-1">
                  <ColorRing
                    height={32}
                    colors={[
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                    ]}
                  />
                </div>
              </div>
            ) : (
              'Compreendo os riscos'
            )}
          </button>
        </div>
      </div>
    </ModalBlank>
  ) : null
}
