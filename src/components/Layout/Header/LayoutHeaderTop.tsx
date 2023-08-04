import BlankUser from '@/assets/perfil.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconCarrinho, IconSearch, IconSteam } from '@/components/Icons'
import { IconCruz } from '@/components/Icons/IconCruz'
import { IconMira } from '@/components/Icons/IconMira'
import { IconNotifications } from '@/components/Icons/IconNotifications'
import ISteamUser from '@/interfaces/steam.interface'
import NotificationServices from '@/services/notifications.service'
import WalletService from '@/services/wallet.service'
import useFilterStore from '@/stores/filters.store'
import useUserStore from '@/stores/user.store'
import URLQuery from '@/tools/urlquery.tool'
import { thereIsNotification } from '@/utils/notification'
import { useQuery } from '@tanstack/react-query'
import { PROVIDER_ID } from 'next-auth-steam'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../../../assets/logo.svg'
import { LayoutHeaderDropdown } from './LayoutHeaderDropdown'
import LayoutHeaderSkeleton from './LayoutHeaderSkeleton'
import { formResolver } from './form.schema'

export function LayoutHeaderTop() {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const router = useRouter()
  const pathname = usePathname()
  const refDropdown = useRef(null)
  const { setWallet, wallet } = useUserStore()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      search: undefined,
    },
  })
  const searchWatch = watch('search')
  const [hasNotifications, setHasNotifications] = useState(false)

  const { notificationFilter } = useFilterStore()

  const { data, refetch } = useQuery({
    queryKey: ['thereIsNotifications', session?.user as ISteamUser],
    queryFn: async () =>
      NotificationServices.getAllNotifsByUser(
        trueSession.user?.steam?.steamid!,
        notificationFilter,
      ),
  })

  useEffect(() => {
    // const interval = setInterval(() => {
    refetch() // Refaz a requisição a cada 1 segundo
    // }, 10 * 60 * 1000)
    setHasNotifications(thereIsNotification(data?.data))

    // return () => clearInterval(interval)
  }, [pathname])

  console.log(trueSession.user?.token)
  const { data: walletRetrieved } = useQuery({
    queryKey: ['WalletService.getWalletById'],
    queryFn: () =>
      WalletService.getWalletBySteamID(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      ),
    enabled: status === 'authenticated',
  })

  const { data: walletCreated } = useQuery({
    queryKey: ['WalletService.createEmptyWallet'],
    queryFn: () =>
      WalletService.createEmptyWallet(
        trueSession.user?.name!,
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      ),
    enabled:
      walletRetrieved !== undefined &&
      walletRetrieved.response &&
      walletRetrieved.response.status === 404,
  })

  console.log(walletRetrieved)
  console.log(walletCreated)

  useEffect(() => {
    if (walletRetrieved && walletRetrieved.data) {
      setWallet(walletRetrieved.data.value)
    } else if (walletCreated && walletCreated.data) {
      setWallet(walletCreated.data.value)
    }
  }, [walletRetrieved, walletCreated])

  const handleOnProfileClick = () => {
    setShowProfileDropdown((state) => !state)
  }

  const onSearch = (data: any) => {
    router.push(`/loja?search=${data.search}`)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (refDropdown.current) {
        const reference = refDropdown.current as HTMLElement
        if (!reference.contains(event.target as Node)) {
          setShowProfileDropdown(false)
        }
      }
    }

    document.addEventListener('click', handleOutsideClick, true)
  }, [])

  return (
    <div className="mx-auto flex w-10/12 items-center justify-between">
      <div className="flex items-center gap-x-6 p-[18px]">
        <Link href="/">
          <Image src={logo} alt="" width={45} height={48} draggable={false} />
        </Link>

        <div className="flex items-center rounded-[12px] bg-mesh-color-neutral-800">
          <Form.Root className="flex" onSubmit={handleSubmit(onSearch)}>
            <Form.Button
              buttonStyle={undefined}
              disabled={!isDirty && !isValid}
              className={`border-none stroke-mesh-color-neutral-200 pl-5 transition-all ${
                searchWatch && searchWatch.length > 0
                  ? 'opacity-100'
                  : 'opacity-30'
              }`}
            >
              <IconSearch
                classname="transition-all"
                width={searchWatch && searchWatch.length > 0 ? 25 : 20}
                height={searchWatch && searchWatch.length > 0 ? 25 : 20}
              />
            </Form.Button>
            <Form.Input.Text
              name="search"
              placeholder="Pesquise o item..."
              className="mt-6 rounded-lg bg-mesh-color-neutral-800 pl-3 text-base text-mesh-color-neutral-200"
              register={register('search')}
            />
          </Form.Root>
        </div>
      </div>
      {/* ---------------- RIGHT ----------------------- */}
      {status === 'unauthenticated' && (
        <div className="flex space-x-4">
          <Link
            href={'/carrinho'}
            className="flex items-center gap-2 rounded-md border border-mesh-color-neutral-200 px-4 text-mesh-color-neutral-200 opacity-70 transition-all hover:opacity-100"
          >
            <IconCarrinho width={20} height={20} />

            <span>Carrinho de Compras</span>
          </Link>
          <Common.Button
            className="flex h-[44px] w-[220px] gap-2 rounded-[14px] border-transparent bg-mesh-color-primary-1400 opacity-100"
            onClick={() => signIn(PROVIDER_ID)}
          >
            <IconSteam />
            <span className="font-semibold">Entre com sua Steam</span>
          </Common.Button>
        </div>
      )}

      {status === 'authenticated' && (
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link
                href={'/carrinho'}
                className="flex items-center gap-2 text-mesh-color-neutral-200 opacity-70 transition-all hover:opacity-100"
              >
                <IconCarrinho />
                Carrinho
              </Link>
              <Link
                href={`/inventario`}
                className="flex items-center gap-2 text-mesh-color-neutral-200 opacity-70 transition-all hover:opacity-100"
              >
                <IconMira />
                Inventário
              </Link>
            </nav>
            <div className="flex h-[44px] items-center gap-2 rounded-lg bg-mesh-color-others-eerie-black px-4 py-2">
              <Common.Title bold={500} color="white">
                {wallet.value !== undefined && wallet.value !== null ? (
                  Number(wallet.value).toLocaleString('pt-br', {
                    currency: 'BRL',
                    style: 'currency',
                    minimumFractionDigits: 2,
                  })
                ) : (
                  <div className="flex h-4 items-end gap-1">
                    <div className="h-1 w-1 animate-[bounce_1s_infinite_0ms] rounded-full bg-mesh-color-neutral-200" />
                    <div className="h-1 w-1 animate-[bounce_1s_infinite_100ms] rounded-full bg-mesh-color-neutral-200" />
                    <div className="h-1 w-1 animate-[bounce_1s_infinite_200ms] rounded-full bg-mesh-color-neutral-200" />
                  </div>
                )}
              </Common.Title>
              <Link
                className="flex h-5 w-5 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1400"
                href={URLQuery.addQuery([
                  { key: 'modalopen', value: true },
                  { key: 'modaltype', value: 'payment' },
                ])}
              >
                <IconCruz />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={'/usuario/notificacoes?type=historic'}
              className="flex h-11 w-11 items-center justify-center rounded-xl border-none bg-mesh-color-others-eerie-black opacity-70 transition-all hover:opacity-100"
            >
              {hasNotifications && (
                <>
                  <div className="absolute top-8 ml-4 h-2 w-2 rounded-full bg-mesh-color-primary-1200" />
                  <div className="absolute top-8 ml-4 h-2 w-2 animate-ping rounded-full bg-mesh-color-primary-1200" />
                </>
              )}
              <IconNotifications />
            </Link>

            <div className="flex items-end justify-center">
              <div
                className={`flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full opacity-70 transition-all hover:opacity-100 ${
                  status === 'authenticated' ? '' : 'bg-[#e4e6e7]'
                }`}
              >
                <Image
                  src={trueSession.user?.image! || BlankUser}
                  alt={trueSession.user?.name! || 'Profile'}
                  className="cursor-pointer rounded-full"
                  width={trueSession.user?.image! ? 44 : 32}
                  height={trueSession.user?.image! ? 44 : 32}
                  draggable={false}
                  onClick={handleOnProfileClick}
                />
              </div>
              {showProfileDropdown && (
                <LayoutHeaderDropdown refDropdown={refDropdown} />
              )}
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && <LayoutHeaderSkeleton />}
    </div>
  )
}
