import logo from '@/assets/logo.svg'
import LayoutAdminSidebar from '@/components/Layout/Admin/LayoutAdminSidebar'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

interface IProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: IProps) {
  const session = await getServerSession()

  const checkValidAdmin = () => {
    const steamId = session?.user?.email!.match(/\d+(?=@)/)

    if (steamId![0] !== '76561198195920183') {
      notFound()
    }
  }

  checkValidAdmin()

  return (
    <div className="flex h-screen flex-col bg-red-500">
      <div className="flex h-16 w-full items-center border-b-2 border-mesh-color-neutral-400 bg-green-500">
        <Image src={logo} alt="RentSkins" className="ml-8" />
      </div>
      <div className="flex h-full w-full">
        <aside className="h-full w-2/12 border-r-2 border-mesh-color-neutral-400 bg-blue-500">
          <LayoutAdminSidebar />
        </aside>
        <main className="w-full p-8">{children}</main>
      </div>
    </div>
  )
}
