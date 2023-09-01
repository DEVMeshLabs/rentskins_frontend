/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import useSkinsStore from '@/stores/skins.store'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function PageInventorySummary() {
  const { data: session } = useSession()
  const trueSession = session as ISteamUser

  const { skinsToAdvertise, changeSkinToAdvertise, cleanSkinsToAdvertise } =
    useSkinsStore()
  const [subtotal, setSubtotal] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { refetch } = useQuery({
    queryKey: ['createdSkins'],
    queryFn: async () => {
      setIsLoading(true)
      cleanSkinsToAdvertise()
      const announcedSkins = await SkinService.postAllSkinsToAdvertise(
        skinsToAdvertise,
        trueSession.user?.token!,
      )
      setIsLoading(false)
      return announcedSkins
    },
    enabled: false,
  })

  useEffect(() => {
    const subtotal = skinsToAdvertise.reduce(
      (acc, { skin_price }) => acc + Number(skin_price.replace(/[^0-9]/g, '')),
      0,
    )
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
    <div className="flex min-h-[400px] flex-col justify-between rounded-xl bg-mesh-color-others-eerie-black px-6 py-6">
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
            {(0.05 * subtotal).toLocaleString('pt-br', {
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
            {(subtotal - 0.05 * subtotal).toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <Common.Button
          onClick={() => refetch()}
          disabled={disabled}
          className="h-[53px]"
        >
          {isLoading ? (
            <ColorRing
              width={50}
              height={50}
              colors={['#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B', '#A6CF2B']}
            />
          ) : (
            <Common.Title>Vender</Common.Title>
          )}
        </Common.Button>
      </div>
    </div>
  )
}
