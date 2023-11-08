'use client'
import Common from '@/components/Common'
import { IconSend } from '@/components/Icons/IconSend'
import { Rank } from '@/tools/rank.tool'
import Image, { StaticImageData } from 'next/image'
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
  deliveryFee?: number | string
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
            <Image
              src={Rank.retrieveRank(reliability!) as StaticImageData}
              alt="Rank"
              width={100}
            />
          </div>
          <div className="flex flex-col gap-6">
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
            'Sem informações'
          }
        />
        <ProfileInfo
          title="Total de Transações"
          value={totalExchanges || 'Não Obtido'}
        />
        <ProfileInfo
          title="Taxa de Entrega"
          value={
            deliveryFee
              ? typeof deliveryFee === 'number'
                ? deliveryFee.toFixed(0) + '%'
                : deliveryFee
              : 'Sem informações'
          }
        />
        <ProfileInfo title="Membro da Steam Desde" value={accountDate} />
      </div>
    </section>
  )
}
