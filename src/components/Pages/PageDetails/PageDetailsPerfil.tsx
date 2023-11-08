/* eslint-disable camelcase */
// import fallen from '@/assets/fallen.svg'
import blankProfile from '@/../public/blank-profile.png'
import Common from '@/components/Common'
import { Rank } from '@/tools/rank.tool'
import classNames from 'classnames'
import moment from 'moment'
import 'moment/locale/pt-br'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface IProps {
  id: string
  picture: string
  owner_name: string
  reliability: string
  delivery_rate: string | number
  delivery_time: string
  account_date: Date
  total_exchanges: number
}

export function PageDetailsPerfil({
  id,
  picture,
  owner_name,
  delivery_rate,
  delivery_time,
  account_date,
  total_exchanges,
  reliability,
}: IProps) {
  const dateFormated =
    account_date === undefined
      ? 'Indefinido'
      : moment(account_date).locale('pt-br').format('D MMM, YYYY')

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
            <Image
              src={Rank.retrieveRank(reliability!) as StaticImageData}
              alt="Rank"
              width={80}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Taxa de Entrega
            </Common.Title>
            <span
              className={classNames(
                {
                  'font-medium text-white': delivery_rate === 'Sem informações',
                },
                {
                  'text-mesh-color-rarity-low':
                    typeof delivery_rate === 'number' && delivery_rate < 20,
                },
                {
                  'text-mesh-color-rarity-medium':
                    typeof delivery_rate === 'number' &&
                    delivery_rate >= 20 &&
                    delivery_rate < 40,
                },
                {
                  'text-white':
                    typeof delivery_rate === 'number' &&
                    delivery_rate >= 40 &&
                    delivery_rate < 60,
                },
                {
                  'text-mesh-color-rarity-high':
                    typeof delivery_rate === 'number' &&
                    delivery_rate >= 60 &&
                    delivery_rate < 80,
                },
                {
                  'text-mesh-color-rarity-highest':
                    typeof delivery_rate === 'number' &&
                    delivery_rate >= 80 &&
                    delivery_rate < 101,
                },
              )}
            >
              {typeof delivery_rate === 'number'
                ? Number(delivery_rate).toFixed(0) + '%'
                : delivery_rate}
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
