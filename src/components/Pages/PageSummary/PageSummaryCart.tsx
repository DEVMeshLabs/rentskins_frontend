/* eslint-disable camelcase */
'use client'
import Common from '@/components/Common'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import LineInfosSummaryh from '@/components/Others/SummaryItem'
import ISteamUser from '@/interfaces/steam.interface'
import TransactionsService from '@/services/transactions.service'
import useCartStore from '@/stores/cart.store'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PageSummaryInfo } from './PageSummaryInfo'

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

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['createTransactions'],
    queryFn: () =>
      TransactionsService.createTransaction({
        skinsToBuy,
        token: trueSession.user?.token!,
      }),
    enabled: false,
  })

  const handleCreateTransation = () => {
    if (skinsToBuy.length > 0) {
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
      setTimeout(() => window.location.reload(), 3000)
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
  }, [data, refetch])

  return (
    <aside className="sticky top-6 flex w-[378px] flex-col gap-8 rounded-xl bg-[#222723] px-4 py-6 laptop:gap-28">
      <div className="flex flex-col gap-4 laptop:gap-9">
        <Common.Title
          color="white"
          bold={600}
          className="text-lg laptop:text-3xl"
        >
          Resumo
        </Common.Title>
        <div className="flex flex-col gap-2 laptop:gap-5">
          <PageSummaryInfo totalPrice={totalPrice} />
          <div className="flex w-full justify-between gap-2">
            <Common.Title color="white" className="text-sm laptop:text-base">
              Código Promocional
            </Common.Title>
            <input
              type="text"
              className="w-2/3 rounded-lg bg-[#3C403C] py-2 text-center text-sm uppercase text-white outline-none laptop:w-1/3 laptop:text-base"
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
          disabled={skinsToBuy.length === 0 || isFetching}
          color="green"
        >
          <LayoutLoading className="h-7 w-7" enabled={isFetching} label={null}>
            Comprar agora
          </LayoutLoading>
        </Common.Button>
      </div>
    </aside>
  )
}
