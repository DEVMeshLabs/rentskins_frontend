'use client'
/* eslint-disable camelcase */
// import { Card, InfoPerfil, InfoSkin, InfoVendas } from '@/components/Details'
import Common from '@/components/Common'
import { IconArrow } from '@/components/Icons'
import { PageDetailsCard } from '@/components/Pages/PageDetails/PageDetailsCard'
import { PageDetailsPerfil } from '@/components/Pages/PageDetails/PageDetailsPerfil'
import { PageDetailsSkin } from '@/components/Pages/PageDetails/PageDetailsSkin'
import { PageDetailsVendas } from '@/components/Pages/PageDetails/PageDetailsVendas'
// import { IGetUser } from '@/services/interfaces/user.interface'
import SkinService from '@/services/skin.service'
import UserService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useParams } from 'next/navigation'
// import { useEffect } from 'react'

const SkinsSemelhantes = dynamic(() =>
  import('@/components/Others/SkinsSemelhantes').then(
    (module) => module.default,
  ),
)

export default function Details() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['skin', id],
    queryFn: async () => await SkinService.findById(id),
  })

  const { data: dataGetUser } = useQuery({
    queryKey: ['ownerSkin'],
    queryFn: async () => await UserService.getUser(data?.data.seller_id!),
    enabled: !!data?.data,
  })

  return (
    <div>
      {!isLoading && data?.data ? (
        <main className="mx-auto w-10/12 bg-mesh-color-others-black">
          <Link href="/" className="mt-8 flex items-center gap-4">
            <IconArrow />
            <Common.Title color="cinza">
              Home &bull; {data?.data.skin_weapon} &bull;{' '}
              <span className="text-[#49E671]">{data?.data.skin_name}</span>
            </Common.Title>
          </Link>

          <div className="mx-auto grid w-full grid-cols-5 py-10">
            <div className="col-span-3">
              <PageDetailsCard
                skinImage={data!.data.skin_image}
                skinName={data!.data.skin_name}
                skinLinkGame={data!.data.skin_link_game}
                skinLinkSteam={data!.data.skin_link_steam}
                skinFloat={Number(data!.data.skin_float)}
              />

              <div>
                <PageDetailsVendas />
              </div>
            </div>
            <div className="col-span-2 ml-4">
              <PageDetailsSkin
                skinName={data!.data.skin_name}
                skinPrice={data!.data.skin_price}
                skinFloat={data!.data.skin_float}
                skinCategory={data!.data.skin_category}
                skinWeapon={data!.data.skin_weapon}
                skinColor={data!.data.skin_color}
                sellerId={data!.data.seller_id}
                statusFloat={data!.data.status_float}
              />
              <PageDetailsPerfil
                account_date={dataGetUser?.data.steam_created_date!}
                delivery_fee={dataGetUser?.data.delivery_fee!}
                delivery_time={dataGetUser?.data.delivery_time!}
                owner_name={dataGetUser?.data.owner_name!}
                picture={dataGetUser?.data.picture!}
                status_member={dataGetUser?.data.status_member!}
                steam_level={dataGetUser?.data.steam_level!}
                total_exchanges={dataGetUser?.data.total_exchanges!}
              />
            </div>
          </div>
          <SkinsSemelhantes
            isLoading={isLoading}
            weaponName={isLoading ? null : data?.data.skin_weapon}
            data={data}
          />
        </main>
      ) : (
        <Common.Title color="white">Carregando...</Common.Title>
      )}
    </div>
  )
}
