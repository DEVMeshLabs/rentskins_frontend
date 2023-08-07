import Common from '@/components/Common'
import { MutableRefObject } from 'react'

interface IProps {
  refDropdown: MutableRefObject<null>
  handleDropdownButton: (type: 'config' | 'profile' | 'logout') => void
}

export function LayoutHeaderDropdown({
  refDropdown,
  handleDropdownButton,
}: IProps) {
  return (
    <div
      className="absolute top-20 z-30 flex h-36 w-48 select-none flex-col items-start justify-center gap-2 overflow-hidden
        rounded-lg bg-mesh-color-others-eerie-black px-3 py-2"
      ref={refDropdown}
    >
      <Common.Button
        className="border-none font-semibold text-mesh-color-neutral-200"
        onClick={() => handleDropdownButton('config')}
      >
        Configurações
      </Common.Button>
      <Common.Button
        className="border-none font-semibold text-mesh-color-neutral-200"
        onClick={() => handleDropdownButton('profile')}
      >
        Perfil
      </Common.Button>
      <Common.Button
        className="border-none font-semibold text-mesh-color-neutral-200"
        onClick={() => handleDropdownButton('logout')}
      >
        Sair
      </Common.Button>
    </div>
  )
}
