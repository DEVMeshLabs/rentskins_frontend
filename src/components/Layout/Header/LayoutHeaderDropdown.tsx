import useUserStore from '@/stores/user.store'
import Link from 'next/link'
import { MutableRefObject } from 'react'

interface IProps {
  refDropdown: MutableRefObject<null>
}

export function LayoutHeaderDropdown({ refDropdown }: IProps) {
  const { setLogout } = useUserStore()
  return (
    <div
      className="absolute top-20 z-30 flex h-28 w-48 select-none flex-col items-start justify-center gap-0 overflow-hidden
        rounded-lg bg-mesh-color-others-eerie-black px-3 py-2"
      ref={refDropdown}
    >
      <Link
        className="border-none py-1 font-semibold text-mesh-color-neutral-200 opacity-50 transition-all hover:opacity-100"
        href={'usuario/configuracoes'}
      >
        Configurações
      </Link>
      <Link
        className="border-none py-1 font-semibold text-mesh-color-neutral-200 opacity-50 transition-all hover:opacity-100"
        href={'perfil/'}
      >
        Perfil
      </Link>
      <Link
        className="border-none py-1 font-semibold text-mesh-color-neutral-200 opacity-50 transition-all hover:opacity-100"
        onClick={() => setLogout(true)}
        href={'/'}
      >
        Sair
      </Link>
    </div>
  )
}
