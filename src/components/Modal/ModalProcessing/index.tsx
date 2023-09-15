'use client'
import Common from '@/components/Common'
import useSkinsStore from '@/stores/skins.store'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'

export function ModalProcessing() {
  const { setWhatModalOpenToBuySkin } = useSkinsStore()
  useEffect(() => {
    let timerId
    async function opa() {
      const promise = await setTimeout(() => {
        setWhatModalOpenToBuySkin(3)
      }, 3000)
      timerId = promise
    }
    opa()
    return clearTimeout(timerId)
  }, [setWhatModalOpenToBuySkin])
  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30  flex
    w-2/3 min-w-[700px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-mesh-color-neutral-800 xl:h-[440px] xl:w-[790px]"
    >
      <div className="h-fit">
        <ColorRing
          width={180}
          height={180}
          colors={['#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B']}
        />
        <Common.Title className="text-2xl font-semibold text-white">
          Processando...
        </Common.Title>
      </div>
    </Dialog.Content>
  )
}
