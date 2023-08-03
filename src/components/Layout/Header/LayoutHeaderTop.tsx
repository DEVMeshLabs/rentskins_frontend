import BlankUser from '@/../public/blank-profile.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconCarrinho, IconSearch, IconSteam } from '@/components/Icons'
import { IconCruz } from '@/components/Icons/IconCruz'
import { IconMira } from '@/components/Icons/IconMira'
import { IconNotifications } from '@/components/Icons/IconNotifications'
import { IUser } from '@/interfaces/user.interface'
import NotificationServices from '@/services/notifications.service'
import SteamService from '@/services/steam.service'
import WalletService from '@/services/wallet.service'
import useFilterStore from '@/stores/filters.store'
import useUserStore from '@/stores/user.store'
import JsonWebToken from '@/tools/jsonwebtoken.tool'
import LocalStorage from '@/tools/localstorage.tool'
import URLQuery from '@/tools/urlquery.tool'
import { thereIsNotification } from '@/utils/notification'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../../../assets/logo.svg'
import { LayoutHeaderDropdown } from './LayoutHeaderDropdown'
import { formResolver } from './form.schema'

export function LayoutHeaderTop() {
  const router = useRouter()
  const pathname = usePathname()
  const refDropdown = useRef(null)
  const { user, setUser, setLogout, setWallet, wallet } = useUserStore()
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
    queryKey: ['thereIsNotifications', user.steamid],
    queryFn: async () =>
      NotificationServices.getAllNotifsByUser(user.steamid, notificationFilter),
  })

  useEffect(() => {
    // const interval = setInterval(() => {
    refetch() // Refaz a requisição a cada 1 segundo
    // }, 10 * 60 * 1000)
    setHasNotifications(thereIsNotification(data?.data))

    // return () => clearInterval(interval)
  }, [pathname])

  useEffect(() => {
    const token = LocalStorage.get('token')

    if (token) {
      const userObject = JsonWebToken.verify(token) as IUser
      setUser(userObject)
    }
  }, [LocalStorage.get('token')])

  const { data: walletRetrieved } = useQuery({
    queryKey: ['WalletService.getWalletById'],
    queryFn: () => WalletService.getWalletBySteamID(user?.steamid as string),
    enabled: !!user?.steamid,
  })

  const { data: walletCreated } = useQuery({
    queryKey: ['WalletService.createEmptyWallet'],
    queryFn: () =>
      WalletService.createEmptyWallet(
        user?.username as string,
        user?.steamid as string,
      ),
    enabled:
      walletRetrieved !== undefined &&
      walletRetrieved.response &&
      walletRetrieved.response.status === 404,
  })

  useEffect(() => {
    if (walletRetrieved && walletRetrieved.data) {
      setWallet(walletRetrieved.data.value)
    } else if (walletCreated && walletCreated.data) {
      setWallet(walletCreated.data.value)
    }
  }, [walletRetrieved, walletCreated])

  console.log(walletCreated)
  console.log(walletRetrieved)

  const handleOnSteam = () => {
    SteamService.redirect()
  }

  const handleOnProfileClick = () => {
    setShowProfileDropdown((state) => !state)
  }

  const onSearch = (data: any) => {
    router.push(`/loja?search=${data.search}`)
  }

  const handleOnAdd = () => {
    router.push(
      URLQuery.addQuery([
        { key: 'modalopen', value: true },
        { key: 'modaltype', value: 'payment' },
      ]),
    )
  }

  const handleDropdownButton = (index: 'config' | 'profile' | 'logout') =>
    ({
      config: () => router.push('usuario/configuracoes'),
      profile: () => router.push('perfil'),
      logout: () => setLogout(true),
    }[index]())

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
      {user === null || !user?.steamid ? (
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
            onClick={() => handleOnSteam()}
          >
            <IconSteam />
            <span className="font-semibold">Entre com sua Steam</span>
          </Common.Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-6">
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
              <Common.Button
                className="h-5 w-5 border-transparent bg-mesh-color-primary-1400"
                onClick={() => handleOnAdd()}
              >
                <IconCruz />
              </Common.Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Common.Button
              className="h-11 w-11 rounded-xl border-none bg-mesh-color-others-eerie-black"
              onClick={() => router.push('/usuario/notificacoes?type=historic')}
            >
              {hasNotifications && (
                <>
                  <div className="absolute top-8 ml-4 h-2 w-2 rounded-full bg-mesh-color-primary-1200" />
                  <div className="absolute top-8 ml-4 h-2 w-2 animate-ping rounded-full bg-mesh-color-primary-1200" />
                </>
              )}
              <IconNotifications />
            </Common.Button>

            <div className="flex items-end justify-center">
              <div
                className={`${
                  user !== null &&
                  user?.picture &&
                  'flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-[#e4e6e7]'
                }`}
              >
                <Image
                  src={user?.picture || BlankUser}
                  alt={user?.username || 'Profile'}
                  className="cursor-pointer rounded-full"
                  width={user?.picture ? 44 : 32}
                  height={user?.picture ? 44 : 32}
                  draggable={false}
                  onClick={handleOnProfileClick}
                />
              </div>
              {showProfileDropdown && (
                <LayoutHeaderDropdown
                  refDropdown={refDropdown}
                  handleDropdownButton={handleDropdownButton}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
