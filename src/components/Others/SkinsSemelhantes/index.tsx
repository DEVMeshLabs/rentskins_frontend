/* eslint-disable camelcase */
import Common from '@/components/Common'
import { ISkins } from '@/interfaces/ISkins'
import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import { OtherCard } from '../OtherCard/OtherCard'

export interface ISkinsSemelhantesProps {
  currentItem: ISkins
  weaponName: string | null
}

export default function SkinsSemelhantes({
  weaponName,
  currentItem,
}: ISkinsSemelhantesProps) {
  const { data: similarItem } = useQuery({
    queryKey: ['weapon', weaponName],
    queryFn: async () => await SkinService.findByWeapon(weaponName!),
  })

  const sameItems = similarItem?.data.filter(
    (item: ISkins) => currentItem.asset_id !== item.asset_id,
  )

  console.log(weaponName)

  console.log(sameItems)
  console.log(similarItem)
  console.log(currentItem)

  return (
    <div className="min-h-[300px] pb-16 pt-8">
      <Common.Title color="white" bold={700} className="mb-6 text-[28px]">
        Semelhantes
      </Common.Title>
      <div className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {sameItems && sameItems?.length > 0 ? (
            sameItems.map((item: ISkins, index: number) => {
              return <OtherCard item={item} key={item.id} />
            })
          ) : (
            <Common.Title className="flex h-[100px] w-full justify-center text-mesh-color-neutral-400">
              Sem itens semelhantes do momento.
            </Common.Title>
          )}
        </div>
      </div>
    </div>
  )
}
