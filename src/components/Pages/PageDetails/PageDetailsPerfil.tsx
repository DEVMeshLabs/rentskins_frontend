/* eslint-disable camelcase */
// import fallen from '@/assets/fallen.svg'
import blankProfile from '@/../public/blank-profile.png'
import Common from '@/components/Common'
import classNames from 'classnames'
import moment from 'moment'
import 'moment/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  id: string
  picture: string
  owner_name: string
  reliability: string
  delivery_time: string
  account_date: string
  status_member: string
  steam_level: string
  total_exchanges: number
}

export function PageDetailsPerfil({
  id,
  picture,
  owner_name,
  reliability,
  delivery_time,
  account_date,
  status_member,
  steam_level,
  total_exchanges,
}: IProps) {
  const dateFormated =
    account_date === undefined
      ? 'Indefinido'
      : moment(account_date).locale('pt-br').format('MMM D, YYYY')
  const percentReliability = Number(reliability?.replace('%', ''))
  return (
    <div className="h-fit min-h-[300px] rounded-lg border-2 border-mesh-color-neutral-600">
      <div className="flex flex-col justify-between gap-8 p-4">
        <div className="flex items-center">
          <Link href={`/perfil/${id}`} className="cursor-pointer">
            <Image
              src={
                picture && picture.includes('https://avatars.steamstatic.com/')
                  ? picture
                  : blankProfile
              }
              alt=""
              className="rounded-full opacity-50 transition-all hover:opacity-100"
              draggable={false}
              width={80}
              height={80}
            />
          </Link>
          <div className="ml-4">
            <Common.Title color="white" className="text-2xl font-semibold">
              {owner_name}
            </Common.Title>
            <span
              className={classNames(
                'mt-1 flex h-[26px] w-fit items-center justify-center whitespace-nowrap rounded-[15px] border border-none bg-mesh-color-others-green px-3 text-sm capitalize text-mesh-color-accent-600',
                {
                  'bg-mesh-color-rarity-lowest/20 text-mesh-color-rarity-lowest':
                    status_member === 'Risco',
                },
                {
                  'bg-mesh-color-rarity-low/20 text-mesh-color-rarity-low':
                    status_member === 'Questionável',
                },
                {
                  'bg-mesh-color-rarity-medium/20 text-mesh-color-rarity-medium':
                    status_member === 'Atenção',
                },
                {
                  'bg-white/20 text-white': status_member === 'Membro novo',
                },
                {
                  'bg-mesh-color-rarity-high/20 text-mesh-color-rarity-high':
                    status_member === 'Frequente',
                },
                {
                  'bg-mesh-color-rarity-high/20 font-semibold text-mesh-color-rarity-highest':
                    status_member === 'Confiável',
                },
              )}
            >
              {status_member}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Taxa de Entrega
            </Common.Title>
            <span
              className={classNames(
                { 'font-medium text-white': reliability === 'Sem informações' },
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
              {reliability && reliability}
            </span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Tempo de Entrega
            </Common.Title>
            <span className="font-medium text-white">{delivery_time}</span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Total de Transações
            </Common.Title>
            <span className="font-medium text-white">{total_exchanges}</span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Nível da Steam
            </Common.Title>
            <span className="font-medium text-white">{steam_level}</span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Membro da Steam Desde
            </Common.Title>
            <span className="font-medium text-white">{dateFormated}</span>
          </div>
        </div>
        <div className="self-center">
          <Link
            href={`/perfil/${id}`}
            className="cursor-pointer select-none text-lg font-medium text-mesh-color-neutral-200 opacity-50 transition-all hover:opacity-100"
          >
            Ver mais itens à venda
          </Link>
        </div>
      </div>
    </div>
  )
}
