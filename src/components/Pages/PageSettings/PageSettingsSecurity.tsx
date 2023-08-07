import Common from '@/components/Common'
import { IconAlert } from '@/components/Icons'

export function PageSettingsSecurity() {
  return (
    <div className="w-2/3">
      <div className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6">
        <Common.Title bold={700} size={'2xl'} color="white">
          Segurança
        </Common.Title>

        <div className="mt-8 flex flex-col gap-2">
          <div className="flex items-center justify-between ">
            <div className="flex w-3/4 items-center justify-start gap-3">
              <Common.Title size={'lg'} color="white">
                Steam Guard
              </Common.Title>

              <div className="flex items-center justify-center gap-2 rounded-md bg-red-500/10 px-2 py-1 text-mesh-color-rarity-low">
                <IconAlert />
                Desativado
              </div>
            </div>
            <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
              Atualizar
            </Common.Button>
          </div>

          <span className="text-base leading-5 text-mesh-color-neutral-200">
            O Steam Guard é um nível extra de segurança para a sua conta Steam.
            Ele evita que pessoal mal intencionadas roubem seus itens e é um
            requisito para que você possa trocar no SkinsMonkey.
          </span>
        </div>
      </div>
    </div>
  )
}
