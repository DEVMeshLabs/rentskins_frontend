'use client'

import Common from '@/components/Common'
import { IconSetaType } from '@/components/Icons'

type TypesContainer = {
  title: string
  description: string
}

export function PageFAQ() {
  return (
    <div className="my-10">
      <ContainerItem title="Pergunta 1" description="Lorem" />
      <ContainerItem title="Pergunta 2" description="Lorem" />
      <ContainerItem title="Pergunta 3" description="Lorem" />
      <ContainerItem title="Pergunta 4" description="Lorem" />
      <ContainerItem title="Pergunta 5" description="Lorem" />
      <ContainerItem title="Pergunta 6" description="Lorem" />
    </div>
  )
}

export const ContainerItem = ({ title, description }: TypesContainer) => {
  return (
    <div className="relative w-full">
      <input
        type="checkbox"
        className="peer absolute inset-x-0 top-0 z-10 h-16 w-full cursor-pointer opacity-0"
      />
      <div className="flex h-16 w-full items-center bg-[#222723] pl-5 ">
        <Common.Title bold={700} color="white">
          {title}
        </Common.Title>
      </div>
      <div className="absolute right-8 top-8 rotate-0 text-white transition-transform peer-checked:rotate-180">
        <IconSetaType />
      </div>

      <div className="max-h-0 overflow-hidden bg-[#181C19] text-white transition-all duration-500 peer-checked:max-h-40">
        <div className="p-4">
          <p className="font-medium">{description}</p>
        </div>
      </div>
    </div>
  )
}
