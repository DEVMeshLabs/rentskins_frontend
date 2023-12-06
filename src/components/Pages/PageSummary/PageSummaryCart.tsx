/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import LineInfosSummaryh from '@/components/Others/SummaryItem'
import { PageSummaryInfo } from './PageSummaryInfo'
import useCartStore from '@/stores/cart.store'
import { useQuery } from '@tanstack/react-query'
import TransactionsService from '@/services/transactions.service'
import ISteamUser from '@/interfaces/steam.interface'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import Toast from '@/tools/toast.tool'

export default function PageSummaryCart() {
  const { data: session } = useSession()
  const trueSession = session as ISteamUser
  const { skinsFromCart, skinsToBuy } = useCartStore()
  const [totalPrice, setTotalPrice] = useState('')

  useEffect(() => {
    const totalPrice = String(
      skinsFromCart.reduce((acc, { skin: { skin_price, id, status } }) => {
        if (status === null) {
          if (skinsToBuy.some(({ skin_id }) => id === skin_id)) {
            return acc + skin_price
          }
        }
        return acc
      }, 0),
    )
    setTotalPrice(String(Number(totalPrice) - 0.05 * Number(totalPrice)))
  }, [skinsToBuy, skinsFromCart])

  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['createTransactions'],
    queryFn: () =>
      TransactionsService.createTransaction({
        skinsToBuy,
        token: trueSession.user?.token!,
      }),
    enabled: false,
  })

  const handleCreateTransation = () => {
    if (skinsToBuy.length > 0 && !isRefetching) {
      refetch()
    }
  }

  useEffect(() => {
    if (data?.request.status === 201) {
      const totalItems: Array<{}> = JSON.parse(data.config.data)
      Toast.Success(
        `${totalItems.length} ite${
          totalItems.length > 1 ? 'ns comprados' : 'm comprado'
        } com sucesso.`,
      )
      window.location.reload()
    } else if (data?.request.status === 400) {
      Toast.Error('Saldo insuficiente.')
    } else if (data?.request.status === 409) {
      Toast.Error(
        `O item ${data?.request.response
          .split('#!%')[1]
          .replace('"}', '')
          .split(' ')
          .slice(0, -1)
          .join(' ')} já foi vendido.`,
      )
    }
  }, [data, refetch, isRefetching])

  return (
    <aside className="sticky top-6 flex w-[378px] flex-col gap-28 rounded-xl bg-[#222723] px-4 py-6">
      <div className="flex flex-col gap-9">
        <Common.Title color="white" size="3xl" bold={600}>
          Resumo
        </Common.Title>
        <div className="flex flex-col gap-5">
          <PageSummaryInfo totalPrice={totalPrice} />
          <div className="flex w-full justify-between">
            <Common.Title color="white">Código promocional</Common.Title>
            <input
              type="text"
              className="w-40 rounded-lg bg-[#3C403C] py-2 text-center uppercase text-white outline-none"
              maxLength={7}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <LineInfosSummaryh
          title="Total"
          value={totalPrice}
          size="lg"
          cash={true}
        />
        <Common.Button
          onClick={handleCreateTransation}
          className="h-32 w-full flex-1 p-28 text-base font-semibold"
          disabled={skinsToBuy.length === 0 || isRefetching}
          color="green"
        >
          <LayoutLoading
            className="h-7 w-7"
            enabled={isRefetching}
            label={null}
          >
            Comprar agora
          </LayoutLoading>
        </Common.Button>
      </div>
    </aside>
  )
}
