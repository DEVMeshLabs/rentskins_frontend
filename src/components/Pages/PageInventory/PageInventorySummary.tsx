/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import useSkinsStore from '@/stores/skins.store'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function PageInventorySummary() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const trueSession = session as ISteamUser

  const {
    skinsToAdvertise,
    removeSkinToAdvertise,
    changeSkinToAdvertise,
    cleanSkinsToAdvertise,
  } = useSkinsStore()
  const [subtotal, setSubtotal] = useState<number>(0)
  const [disabled, setDisabled] = useState(false)

  const { data: itemAnnounced, refetch: announceItem } = useQuery({
    queryKey: ['announcedItems'],
    queryFn: async () => {
      setIsLoading(true)
      const announcedSkins = await SkinService.postAllSkinsToAdvertise(
        skinsToAdvertise,
        trueSession.user?.token!,
      )
      console.log(announcedSkins)
      if (announcedSkins.request.status !== 409) {
        cleanSkinsToAdvertise()
      }

      setIsLoading(false)

      return announcedSkins
    },
    enabled: false,
    cacheTime: 0,
  })

  useEffect(() => {
    if (searchParams.get('success')) {
      Toast.Success('Anúncio(s) criado(s) com sucesso!')
      router.push(pathname)
    }
  }, [pathname, searchParams, router])

  useEffect(() => {

    if (itemAnnounced) {
      console.log(itemAnnounced)
      if (itemAnnounced?.request.status === 201) {
        window.location.replace(pathname + '?success=true')
      } else if (itemAnnounced?.request.status === 409) {
        const responseObject: { error: string; asset_id: string } = JSON.parse(
          itemAnnounced?.request?.response,
        )

        if (responseObject.asset_id) {
          removeSkinToAdvertise(responseObject.asset_id)
        }

        Toast.Error(responseObject.error)
      } else {
        Toast.Error(
          'Ocorreu um problema ao anunciar o inventário. Tente novamente mais tarde.',
        )
      }
    }
  }, [itemAnnounced, pathname, removeSkinToAdvertise])

  useEffect(() => {
    const subtotal = skinsToAdvertise.reduce((acc, { skin_price }) => {
      return acc + skin_price
    }, 0)
    setSubtotal(subtotal)
  }, [skinsToAdvertise, changeSkinToAdvertise])

  useEffect(() => {
    if (subtotal > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [subtotal])

  return (
    <div className="sticky top-10 flex min-h-[400px] flex-col justify-between rounded-xl bg-mesh-color-others-eerie-black px-6 py-6">
      <div className="text-white">
        <Common.Title color="white" className="text-[28px] font-bold">
          Resumo
        </Common.Title>
        <div className="mt-5 flex justify-between ">
          <Common.Title>Itens selecionados</Common.Title>
          <span>{skinsToAdvertise.length}</span>
        </div>

        <div className="mt-5 flex justify-between ">
          <Common.Title>Subtotal</Common.Title>
          <span>
            {subtotal.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="mt-5 flex justify-between ">
          <Common.Title>Taxa</Common.Title>
          <span>
            {(0.04 * subtotal).toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-4 text-white">
        <div className="flex justify-between">
          <Common.Title>Total</Common.Title>
          <span>
            {(subtotal - 0.04 * subtotal).toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <Common.Button
          onClick={() => announceItem()}
          disabled={disabled}
          className="h-[53px] border-mesh-color-primary-1200 bg-mesh-color-primary-1200 font-bold text-black disabled:border-mesh-color-neutral-400 disabled:bg-transparent disabled:text-mesh-color-neutral-200"
        >
          {isLoading ? (
            <ColorRing
              width={50}
              height={50}
              colors={['#000000', '#000000', '#000000', '#000000', '#000000']}
            />
          ) : (
            <Common.Title>Vender</Common.Title>
          )}
        </Common.Button>
      </div>
    </div>
  )
}
