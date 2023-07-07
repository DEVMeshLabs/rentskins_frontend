/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
// import { Card, InfoPerfil, InfoSkin, InfoVendas } from '@/components/Details'
import { SkinsSemelhantes } from '@/components/Others/SkinsSemelhantes'

import { IconArrow } from '@/components/Icons'
import Pages from '@/components/Pages'
import { findById, findByWeapon } from '@/services/SkinService'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Details() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['skin', id],
    queryFn: async () => await findById(id),
  })

  const weaponName = data?.data[0].skin_weapon

  const { data: data2 } = useQuery({
    queryKey: ['weapon', weaponName],
    queryFn: async () => await findByWeapon(weaponName),
  })

  return (
    <div>
      {!isLoading && data?.data ? (
        <main className="mx-auto w-10/12 bg-mesh-color-others-black">
          <div className="mt-8 flex items-center gap-4">
            <Link href="/">
              <IconArrow />
            </Link>
            <Common.Title color="cinza">
              Home &bull; {data?.data[0].skin_weapon} &bull;{' '}
              <span className="text-[#49E671]">{data?.data[0].skin_name}</span>
            </Common.Title>
          </div>

          <div className="mx-auto grid w-full grid-cols-5 py-10">
            <div className="col-span-3">
              <Pages.Details.Card
                skinImage={data!.data[0].skin_image}
                skinName={data!.data[0].skin_name}
                skinLinkGame={data!.data[0].skin_link_game}
                skinLinkSteam={data!.data[0].skin_link_steam}
                skinFloat={data!.data[0].skin_float}
              />

              <div>
                <Pages.Details.Vendas />
              </div>
            </div>
            <div className="col-span-2 ml-4">
              <Pages.Details.Skin
                skinName={data!.data[0].skin_name}
                skinPrice={data!.data[0].skin_price}
                skinFloat={data!.data[0].skin_float}
                skinCategory={data!.data[0].skin_category}
                skinWeapon={data!.data[0].skin_weapon}
                skinColor={data!.data[0].skin_color}
                sellerId={data!.data[0].seller_id}
                statusFloat={data!.data[0].status_float}
              />
              <Pages.Details.Perfil />
            </div>
          </div>
          <SkinsSemelhantes isLoading={isLoading} data2={data2!} data={data} />
        </main>
      ) : (
        <Common.Title color="white">Carregando...</Common.Title>
      )}
    </div>
  )
}
