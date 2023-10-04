/* eslint-disable camelcase */
import Common from '@/components/Common'
import { ISkins } from '@/interfaces/ISkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import { OtherCard } from '../OtherCard/OtherCard'

export interface ISkinsSemelhantesProps {
  data: ISkins
  weaponName: string | null
}

export default function SkinsSemelhantes({
  weaponName,
  data,
}: ISkinsSemelhantesProps) {
  const { data: data2 } = useQuery({
    queryKey: ['weapon', weaponName],
    queryFn: async () => await SkinService.findByWeapon(weaponName!),
  })

  const find = data2?.data.filter(
    ({ skin_weapon, seller_id }: ISkins) =>
      skin_weapon === data!.skin_weapon && seller_id !== data!.seller_id,
  )

  return (
    <>
      <Common.Title color="white" bold={700} className="mb-6  text-[28px]">
        Semelhantes
      </Common.Title>
      <div className="w-full pb-16">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {find && find?.length > 0 ? (
            find.map((item: ISkins, index: number) => {
              return <OtherCard item={item} key={item.id} />
            })
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
