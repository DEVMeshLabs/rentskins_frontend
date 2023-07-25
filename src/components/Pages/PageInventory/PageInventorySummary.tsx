/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import useSkinsStore from '@/stores/skins.store'
import { useEffect, useState } from 'react'

export default function PageInventorySummary() {
  const { skinsToAdvertise, changeSkinToAdvertise } = useSkinsStore()
  const [subtotal, setSubtotal] = useState(0)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const subtotal = skinsToAdvertise.reduce(
      (acc, { skin_price }) => acc + Number(skin_price),
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
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="mt-5 flex justify-between ">
          <Common.Title>Taxa</Common.Title>
          <span>R$ {(0.05 * subtotal).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-4 text-white">
        <div className="flex justify-between">
          <Common.Title>Total</Common.Title>
          <span>R$ {(subtotal - 0.05 * subtotal).toFixed(2)}</span>
        </div>
        <Common.Button disabled={disabled} className="h-[53px]">
          Vender
        </Common.Button>
      </div>
    </div>
  )
}
