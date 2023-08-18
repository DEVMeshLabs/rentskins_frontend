'use client'

import SkinService from '@/services/skin.service'
import { useQuery } from '@tanstack/react-query'
import ColoredLine from '../ColoredLine'

interface IProps {
  itemIsAWeapon: boolean
  assetid: string
  link: string
  steamId: string
  token: string
}

export default function CardSkinFloat({
  itemIsAWeapon,
  assetid,
  link,
  steamId,
  token,
}: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`SkinService.findFloatById(${assetid})`],
    queryFn: async () => {
      return SkinService.findFloatById(steamId, token, { assetid, link })
    },
  })

  console.log(data)
  console.log(isLoading)

  return (
    <>
      <p className="my-4 text-sm font-medium">
        {/* {'0.2131232' !== '' && 'FT / '} */}
        FT /
        <span className="text-[13px] font-semibold text-mesh-color-neutral-200">
          {'0.2131232'}
        </span>
      </p>
      {itemIsAWeapon && <ColoredLine position={0.254665} />}
    </>
  )
}
