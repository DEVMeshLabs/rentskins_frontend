/* eslint-disable camelcase */
import Common from '@/components/Common'
import { ISkins } from '@/interfaces/ISkins'
import Link from 'next/link'
import { OtherCard } from '../OtherCard/OtherCard'
import { useQuery } from '@tanstack/react-query'
import SkinService from '@/services/skin.service'

export interface ISkinsSemelhantesProps {
  isLoading: boolean
  data: {
    data: ISkins
  }
  weaponName: string
}

export default function SkinsSemelhantes({
  isLoading,
  weaponName,
  data,
}: ISkinsSemelhantesProps) {
  const { data: data2 } = useQuery({
    queryKey: ['weapon', weaponName],
    queryFn: async () => await SkinService.findByWeapon(weaponName),
  })

  const find = data2?.data.filter(
    ({ skin_weapon, seller_id }: ISkins) =>
      skin_weapon === data!.data.skin_weapon &&
      seller_id !== data!.data.seller_id,
  )

  return (
    <>
      <Common.Title color="white" bold={700} className="mb-6  text-[28px]">
        Semelhantes
      </Common.Title>
      <div className="w-full pb-16">
        <div className="flex gap-4">
          {!isLoading && find && find?.length > 0 ? (
            find.map(
              (
                {
                  skin_image,
                  skin_name,
                  skin_color,
                  skin_float,
                  skin_price,
                  skin_weapon,
                  id,
                }: ISkins,
                index: number,
              ) => {
                return (
                  <Link href={`/details/${id}`} key={`${skin_name}-${index}`}>
                    <OtherCard
                      skinImage={skin_image}
                      sellerName={skin_name}
                      skinColor={skin_color}
                      skinWeapon={skin_weapon}
                      skinFloat={skin_float}
                      skinPrice={skin_price}
                    />
                  </Link>
                )
              },
            )
          ) : (
            <Common.Title color="white">
              Não há nenhuma skin semelhante
            </Common.Title>
          )}
        </div>
      </div>
    </>
  )
}
