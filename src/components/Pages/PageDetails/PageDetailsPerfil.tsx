/* eslint-disable camelcase */
// import fallen from '@/assets/fallen.svg'
import blankProfile from '@/../public/blank-profile.png'
import Common from '@/components/Common'
import { IGetUser } from '@/services/interfaces/user.interface'
import { Rank } from '@/tools/rank.tool'
import Time from '@/tools/time.tool'
import classNames from 'classnames'
import moment from 'moment'
import 'moment/locale/pt-br'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface IProps {
  seller: IGetUser
}

export function PageDetailsPerfil({ seller }: IProps) {
  const dateFormated =
    seller.steam_created_date === undefined
      ? 'Indefinido'
      : moment(seller.steam_created_date).locale('pt-br').format('D MMM, YYYY')

  const deliveryRate =
    seller.total_exchanges_completed > 0 || seller.total_exchanges_failed > 0
      ? (seller.total_exchanges_completed /
          (seller.total_exchanges_completed + seller.total_exchanges_failed)) *
        100
      : 'Sem informações'

  const deliveryTime =
    seller.delivery_time !== 'Sem informações'
      ? Time.roundTime(seller.delivery_time!)
      : 'Sem informações'

  return (
    <div className="h-fit min-h-[300px] rounded-lg border-2 border-mesh-color-neutral-600">
      <div className="flex flex-col justify-between gap-8 p-4">
        <div className="flex items-center">
          <Link href={`/perfil/${seller.owner_id}`} className="cursor-pointer">
            <Image
              src={
                seller.picture &&
                seller.picture.includes('https://avatars.steamstatic.com/')
                  ? seller.picture
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
              {seller.owner_name}
            </Common.Title>
            <Image
              src={Rank.retrieveRank(seller.reliability!) as StaticImageData}
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
                  'font-medium text-white': deliveryRate === 'Sem informações',
                },
                {
                  'text-mesh-color-rarity-low':
                    typeof deliveryRate === 'number' && deliveryRate < 20,
                },
                {
                  'text-mesh-color-rarity-medium':
                    typeof deliveryRate === 'number' &&
                    deliveryRate >= 20 &&
                    deliveryRate < 40,
                },
                {
                  'text-white':
                    typeof deliveryRate === 'number' &&
                    deliveryRate >= 40 &&
                    deliveryRate < 60,
                },
                {
                  'text-mesh-color-rarity-high':
                    typeof deliveryRate === 'number' &&
                    deliveryRate >= 60 &&
                    deliveryRate < 80,
                },
                {
                  'text-mesh-color-rarity-highest':
                    typeof deliveryRate === 'number' &&
                    deliveryRate >= 80 &&
                    deliveryRate < 101,
                },
              )}
            >
              {typeof deliveryRate === 'number'
                ? Number(deliveryRate).toFixed(0) + '%'
                : deliveryRate}
            </span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Tempo de Entrega
            </Common.Title>
            <span className="font-medium text-white">{deliveryTime}</span>
          </div>

          <div className="flex justify-between">
            <Common.Title className="text-mesh-color-neutral-200">
              Total de Transações
            </Common.Title>
            <span className="font-medium text-white">
              {seller.total_exchanges_completed + seller.total_exchanges_failed}
            </span>
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
            href={`/perfil/${seller.id}`}
            className="cursor-pointer select-none text-lg font-medium text-mesh-color-neutral-200 opacity-50 transition-all hover:opacity-100"
          >
            Ver mais itens à venda
          </Link>
        </div>
      </div>
    </div>
  )
}
