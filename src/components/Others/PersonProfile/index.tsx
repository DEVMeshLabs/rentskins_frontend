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
  reliability?: string
  isLoading?: boolean
  userState?: string
  totalExchanges?: number
  deliveryTime?: string
  deliveryFee?: number
}

export default function PersonProfile({
  isSeller,
  picture,
  name,
  accountDate,
  reliability,
  isLoading,
  userState,
  totalExchanges,
  deliveryTime,
  deliveryFee,
}: Props) {
  const percentReliability = Number(reliability?.replace('%', ''))
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
                'w-32 rounded-3xl p-1 text-center text-base font-normal capitalize',
                {
                  'h-8': isLoading === true,
                },
                {
                  'bg-white/20 text-white': userState === 'Não Obtido',
                },
                {
                  'bg-mesh-color-rarity-lowest/20 text-mesh-color-rarity-lowest':
                    userState === 'Risco',
                },
                {
                  'bg-mesh-color-rarity-low/20 text-mesh-color-rarity-low':
                    userState === 'Questionável',
                },
                {
                  'bg-mesh-color-rarity-medium/20 text-mesh-color-rarity-medium':
                    userState === 'Atenção',
                },
                {
                  'bg-white/20 text-white': userState === 'Membro novo',
                },
                {
                  'bg-mesh-color-rarity-high/20 text-mesh-color-rarity-high':
                    userState === 'Frequente',
                },
                {
                  'bg-mesh-color-rarity-high/20 font-semibold text-mesh-color-rarity-highest':
                    userState === 'Confiável',
                },
              )}
            >
              {!isLoading && userState}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex gap-1 text-lg text-white">
              <span className="opacity-60">Confiabilidade:</span>
              <p
                className={classNames(
                  {
                    'text-mesh-color-rarity-low': percentReliability < 20,
                  },
                  {
                    'text-mesh-color-rarity-medium':
                      percentReliability >= 20 && percentReliability < 40,
                  },
                  {
                    'text-white':
                      percentReliability >= 40 && percentReliability < 60,
                  },
                  {
                    'text-mesh-color-rarity-high':
                      percentReliability >= 60 && percentReliability < 80,
                  },
                  {
                    'text-mesh-color-rarity-highest':
                      percentReliability >= 80 && percentReliability < 101,
                  },
                )}
              >
                {!isLoading && reliability && reliability}
              </p>
            </h1>
            {isSeller ?? (
              <Link href={'/inventario'}>
                <Common.Button
                  color="green"
                  className="flex justify-center gap-2 border-transparent font-semibold"
                >
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
          title="Tempo de Entrega"
          value={
            (deliveryTime && deliveryTime.replace(' no momento', '')) ||
            'Não Obtido'
          }
        />
        <ProfileInfo
          title="Total de Transações"
          value={totalExchanges || 'Não Obtido'}
        />
        <ProfileInfo title="Taxa de Entrega" isPercent value={deliveryFee} />
        <ProfileInfo title="Membro da Steam Desde" value={accountDate} />
      </div>
    </section>
  )
}
