'use client'
import Common from '@/components/Common'
import { IconSend } from '@/components/Icons/IconSend'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import ProfileInfo from '../ProfileInfo'

interface Props {
  isSeller?: boolean
  picture?: string
  name?: string
  accountDate?: string
  steamLevel?: string
  isLoading?: boolean
  userState?: string
  totalExchanges?: string
  deliveryTime?: string
  deliveryFee?: number
}

export default function PersonProfile({
  isSeller,
  picture,
  name,
  accountDate,
  steamLevel,
  isLoading,
  userState,
  totalExchanges,
  deliveryTime,
  deliveryFee,
}: Props) {
  return (
    <section className="flex w-full justify-between font-inter">
      <div className="flex gap-6">
        <Image
          src={picture!}
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
              {name || 'Usuário'}
            </Common.Title>
            <div
              className={classNames(
                'w-32 rounded-3xl bg-mesh-color-primary-1400 p-1 text-center text-base font-normal text-white',
                {
                  'h-8': isLoading === true,
                },
              )}
            >
              {!isLoading && userState}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex gap-1 text-lg text-white">
              <span className="opacity-60">Steam Level:</span>
              <strong>{!isLoading && steamLevel}</strong>
            </h1>
            {isSeller ?? (
              <Link href={'/inventario'}>
                <Common.Button color="green" className="border-transparent">
                  <IconSend />
                  Anuncie Agora
                </Common.Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-[500px] flex-wrap gap-5">
        <ProfileInfo
          title="Tempo de entrega"
          value={deliveryTime && deliveryTime.replace(' no momento', '')}
        />
        <ProfileInfo
          title="Total de trocas"
          value={totalExchanges && totalExchanges.replace(' no momento', '')}
        />
        <ProfileInfo title="Taxa de entrega" isPercent value={deliveryFee} />
        <ProfileInfo title="Membro da Steam desde" value={accountDate} />
      </div>
    </section>
  )
}
