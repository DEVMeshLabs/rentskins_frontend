'use client'
import BlankUser from '@/../public/blank-profile.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconCarrinho, IconSearch, IconSteam } from '@/components/Icons'
import { IconCruz } from '@/components/Icons/IconCruz'
import { IconMira } from '@/components/Icons/IconMira'
import { IconNotifications } from '@/components/Icons/IconNotifications'
import { ModalConnectInventoryMain } from '@/components/Modal/ModalConnectInventory/ModalConnectInventoryMain'
import { ModalPaymentMain } from '@/components/Modal/ModalPayment/ModalPaymentMain'
import HeaderWallet from '@/components/Others/HeaderWallet'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import NotificationServices from '@/services/notifications.service'
import useFilterStore from '@/stores/filters.store'
import Notifications from '@/tools/notification.tool'
import VerificationTool from '@/tools/verification.tool'
import { useQuery } from '@tanstack/react-query'
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
  const pathname = usePathname()
  const refDropdown = useRef(null)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(false)
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      search: undefined,
    },
  })

  const searchWatch = watch('search')

  useEffect(() => {
    if (trueSession?.user?.steam?.banned) {
      VerificationTool.suspendAccount(trueSession, true, router)
    }
  }, [trueSession, router])

  VerificationTool.verifyStatus(trueSession?.user?.steam?.steamid!, router)

  const { notificationFilter } = useFilterStore()

  const { data, refetch } = useQuery({
    queryKey: ['thereIsNotifications', session?.user as ISteamUser],
    queryFn: async () =>
      NotificationServices.getAllNotifsByUser(
        trueSession?.user?.steam?.steamid!,
        notificationFilter,
        trueSession?.user?.token,
      ),
    enabled: status === 'authenticated',
    cacheTime: 0,
  })

  const { data: userConfig, isLoading: isLoadingUserConfig } = useQuery({
    queryKey: ['config'],
    queryFn: async () =>
      ConfigService.findByConfigUserId(
        trueSession?.user?.steam?.steamid!,
        trueSession?.user?.token!,
      ),
    enabled: status === 'authenticated',
  })

  const configValidation =
    userConfig &&
    userConfig.data &&
    userConfig!.data?.owner_email !== '' &&
    userConfig!.data?.owner_phone !== '' &&
    userConfig!.data?.owner_cpf !== '' &&
    userConfig!.data?.url_trade !== ''

  useEffect(() => {
    if (trueSession?.user?.steam?.steamid) {
      refetch() // Refaz a requisição a cada 1 seg
    }
    setHasNotifications(Notifications.hasNotification(data?.data))
  }, [pathname])

  const disableAddButton =
    pathname.includes('/pagamento') ||
    pathname.includes('/oops') ||
    isLoadingUserConfig

  const handleOnProfileClick = () => {
    setShowProfileDropdown((state) => !state)
  }

  const onSearch = (data: any) => {
    router.push(`/loja?search=${data.search}`)
    setValue('search', undefined)
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
            onClick={() => signIn('steam', { callbackUrl: '/' })}
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
                <HeaderWallet session={trueSession} status={status} />
              </Common.Title>
              {!isLoadingUserConfig && !configValidation ? (
                <ModalConnectInventoryMain
                  userConfig={userConfig?.data}
                  activator={
                    <button
                      disabled={disableAddButton}
                      className="flex h-5 w-5 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1400 opacity-50 transition-all hover:opacity-100 disabled:opacity-20"
                    >
                      <IconCruz />
                    </button>
                  }
                />
              ) : (
                <ModalPaymentMain>
                  <button
                    disabled={disableAddButton}
                    className="flex h-5 w-5 items-center justify-center rounded-md border-transparent bg-mesh-color-primary-1400 opacity-50 transition-all hover:opacity-100 disabled:opacity-20"
                  >
                    <IconCruz />
                  </button>
                </ModalPaymentMain>
              )}
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
                  src={trueSession?.user?.image! || BlankUser}
                  alt={'Profile'}
                  className="cursor-pointer rounded-full"
                  width={trueSession?.user?.image! ? 44 : 32}
                  height={trueSession?.user?.image! ? 44 : 32}
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
