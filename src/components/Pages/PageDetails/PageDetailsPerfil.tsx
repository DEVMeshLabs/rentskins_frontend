/* eslint-disable camelcase */
// import fallen from '@/assets/fallen.svg'
import Common from '@/components/Common'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/pt-br'
import blankProfile from '@/../public/blank-profile.png'
import Link from 'next/link'

interface IProps {
  id: string
  picture: string
  owner_name: string
  delivery_fee: number
  delivery_time: string
  account_date: string
  status_member: string
  steam_level: string
  total_exchanges: string
}

export function PageDetailsPerfil({
  id,
  picture,
  owner_name,
  delivery_fee,
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
  return (
    <div className="mt-10 min-h-[300px] rounded-lg border-2 border-mesh-color-neutral-600">
      <div className="p-4">
        <div className="flex items-center">
          <Link href={`/perfil/${id}`} className="cursor-pointer">
            <Image
              src={
                picture && picture.includes('https://avatars.steamstatic.com/')
                  ? picture
                  : blankProfile
              }
              alt=""
              className="rounded-full"
              draggable={false}
              width={80}
              height={80}
            />
          </Link>
          <div className="ml-4">
            <Common.Title color="white" className="text-2xl font-semibold">
              {owner_name}
            </Common.Title>
            <span className="mt-1 flex h-[26px] w-fit items-center justify-center whitespace-nowrap rounded-[15px] border border-none bg-mesh-color-others-green px-3 text-sm text-mesh-color-accent-600">
              Confiável
            </span>
          </div>
        </div>
        <div className="mt-7 space-y-3">
          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Taxa de entrega
            </Common.Title>
            <span className="font-medium text-mesh-color-primary-1400">
              {delivery_fee}%
            </span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Tempo de entrega
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
              Steam level
            </Common.Title>
            <span className="font-medium text-white">{steam_level}</span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Membro da Steam desde
            </Common.Title>
            <span className="font-medium text-white">{dateFormated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
