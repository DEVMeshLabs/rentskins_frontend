'use client'
import BlankUser from '@/../public/blank-profile.png'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LayoutAdminSidebar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser

  console.log(pathname)

  return (
    <>
      <div className="mb-8 mt-8 flex flex-col items-center justify-center gap-2 text-sm">
        <Image
          src={
            status === 'authenticated'
              ? trueSession.user?.image!
              : (BlankUser as StaticImageData)
          }
          alt="admin"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-semibold text-mesh-color-neutral-400">
            Seu perfil
          </span>
          <span className="font-semibold text-white">
            {status === 'authenticated'
              ? trueSession.user?.name
              : 'Indefinido...'}
          </span>
        </div>
        <div className=" mt-4 h-0.5 w-5/6 bg-[#28232C]" />
      </div>
      <div className="flex w-full flex-col items-center gap-2 text-white">
        <Link
          href={'/admin/dashboard'}
          className={`flex w-5/6 rounded-2xl transition-all ${
            pathname.includes('dashboard')
              ? 'bg-mesh-color-others-green'
              : 'bg-transparent hover:bg-mesh-color-others-green/30'
          } px-4 py-3`}
        >
          Dashboard
        </Link>
        <Link
          href={'/admin/estatisticas'}
          className={`flex w-5/6 rounded-2xl transition-all ${
            pathname.includes('estatisticas')
              ? 'bg-mesh-color-others-green'
              : 'bg-transparent hover:bg-mesh-color-others-green/30'
          } px-4 py-3`}
        >
          Estatísticas
        </Link>
        <Link
          href={'/admin/financeiro'}
          className={`flex w-5/6 rounded-2xl transition-all ${
            pathname.includes('financeiro')
              ? 'bg-mesh-color-others-green'
              : 'bg-transparent hover:bg-mesh-color-others-green/30'
          } px-4 py-3`}
        >
          Financeiro
        </Link>
        <Link
          href={'/admin/usuarios'}
          className={`flex w-5/6 rounded-2xl transition-all ${
            pathname.includes('usuarios')
              ? 'bg-mesh-color-others-green'
              : 'bg-transparent hover:bg-mesh-color-others-green/30'
          } px-4 py-3`}
        >
          Usuários
        </Link>
      </div>
    </>
  )
}
