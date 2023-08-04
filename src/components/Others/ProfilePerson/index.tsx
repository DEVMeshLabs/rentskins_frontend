'use client'
import Perfil from '@/assets/perfil.png'
import Common from '@/components/Common'
import { IconSend } from '@/components/Icons/IconSend'
import Image from 'next/image'
import ProfileInfo from '../ProfileInfo'
import { useRouter } from 'next/navigation'

interface Props {
  isSeller?: boolean
  picture?: string
  name?: string
  accountDate?: string
  steamLevel?: string
}

export default function PerfilPerson({
  isSeller,
  picture,
  name,
  accountDate,
  steamLevel,
}: Props) {
  const router = useRouter()
  return (
    <section className="flex w-full justify-between font-inter">
      <div className="flex gap-6">
        <Image
          src={picture || Perfil}
          alt="Perfil"
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <Common.Title
              bold={600}
              color="white"
              size="3xl"
              className="self-start"
            >
              {name || 'Coldzera'}
            </Common.Title>
            <div className="w-32 rounded-3xl bg-mesh-color-primary-1400 p-1 text-center text-base font-normal text-white">
              Membro novo
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex gap-1 text-lg text-white">
              <span className="opacity-60">Steam Level:</span>
              <strong>{steamLevel}</strong>
            </h1>
            {isSeller ?? (
              <Common.Button
                onClick={() => router.push('/inventario')}
                color="green"
                className="border-transparent"
              >
                <IconSend />
                Anuncie Agora
              </Common.Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-[500px] flex-wrap gap-5">
        <ProfileInfo title="Tempo de entrega" value="20 Minutos" />
        <ProfileInfo title="Total de trocas" value="242" />
        <ProfileInfo title="Taxa de entrega" value="92%" />
        <ProfileInfo
          title="Membro da Steam desde"
          value={accountDate || 'Não temos essa informarção'}
        />
      </div>
    </section>
  )
}
