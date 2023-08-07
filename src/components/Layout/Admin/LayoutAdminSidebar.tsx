'use client'
import BlankUser from '@/../public/blank-profile.png'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

export default function LayoutAdminSidebar() {
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser

  return (
    <>
      <div className="mb-8 mt-8 flex flex-col items-center justify-center gap-2">
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
        <span>
          {' '}
          {status === 'authenticated'
            ? trueSession.user?.name
            : 'Indefinido...'}
        </span>
        <div className=" mt-4 h-0.5 w-2/3 bg-[#28232C]" />
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href={'/admin/dashboard'}
          className="m-auto flex w-2/3 rounded-lg bg-yellow-500 px-2 py-3"
        >
          Dashboard
        </Link>
        <Link
          href={'/admin/estatisticas'}
          className="m-auto flex w-2/3 rounded-lg bg-yellow-500 px-2 py-3"
        >
          Estatísticas
        </Link>
        <Link
          href={'/admin/financeiro'}
          className="m-auto flex w-2/3 rounded-lg bg-yellow-500 px-2 py-3"
        >
          Financeiro
        </Link>
        <Link
          href={'/admin/usuarios'}
          className="m-auto flex w-2/3 rounded-lg bg-yellow-500 px-2 py-3"
        >
          Usuários
        </Link>
      </div>
    </>
  )
}
