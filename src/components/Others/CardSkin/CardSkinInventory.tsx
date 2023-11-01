/* eslint-disable camelcase */
import Common from '@/components/Common'
import LayoutPagination from '@/components/Layout/LayoutPagination'
import { ModalSkinShowcaseMain } from '@/components/Modal/ModalSkinShowcase/ModalSkinShowcaseMain'
import { ISteamItens } from '@/interfaces/ISkins'
import ISteamUser from '@/interfaces/steam.interface'
import SkinService from '@/services/skin.service'
import useComponentStore from '@/stores/components.store'
import useFilterStore from '@/stores/filters.store'
import useSkinsStore from '@/stores/skins.store'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { CardSkin } from '.'
import ColoredLine from '../ColoredLine'

export function CardSkinInventory() {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const [page, setPage] = useState(1)
  const { inventoryTypeFilter } = useFilterStore()
  const { setIsInventoryFetching } = useComponentStore()
  const { skinsToAdvertise } = useSkinsStore()
  const [steamItens, setSteamItens] = useState<ISteamItens[]>([])

  const { data: skinsProfile, refetch: refetchSkinsProfile } = useQuery({
    queryKey: ['profileSkins', trueSession?.user?.steam?.steamid!],
    queryFn: () =>
      SkinService.findAllSkinsByIdSeller(trueSession?.user?.steam?.steamid!),
    keepPreviousData: true,
  })

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['skinsInventory'],
    queryFn: async () =>
      await SkinService.findBySkinsInventoryWithFilters(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
        inventoryTypeFilter,
      ),
    enabled: status === 'authenticated',
    keepPreviousData: true,
  })

  useEffect(() => {
    if (data?.data && skinsProfile?.data && skinsProfile.data.skins) {
      setSteamItens(
        data &&
          data?.data &&
          !data?.data?.message &&
          data?.data?.filter(
            ({ assetid }: any) =>
              !skinsProfile?.data?.skins.some(
                ({ asset_id }) => asset_id === assetid,
              ),
          ),
      )
    }
  }, [data, skinsProfile])

  useEffect(() => {
    if (data?.data?.message?.includes('Error')) {
      Toast.Error(
        'Não foi possível solicitar o inventário. Verifique se o seu inventário se encontra público e tente novamente mais tarde.',
      )
    }
  }, [data])

  const maxPages = Math.ceil(steamItens.length / 16)

  useEffect(() => {
    refetch()
    refetchSkinsProfile()
  }, [page, inventoryTypeFilter, refetch, refetchSkinsProfile])

  useEffect(() => {
    setIsInventoryFetching(isLoading || isRefetching)
  }, [isLoading, isRefetching, setIsInventoryFetching])

  const renderEmptyMessage = () => {
    const types = {
      Knife: 'Não existem facas em seu inventário.',
      Agent: 'Não existem agentes em seu inventário.',
      Sticker: 'Não existem figurinhas em seu inventário.',
    }

    const index = inventoryTypeFilter[0] as 'Knife' | 'Agent' | 'Sticker'
    let selectedType = types[index]

    if (inventoryTypeFilter[1]) {
      selectedType = 'Não existem estes items em seu inventário.'
    }

    return (
      <div className="flex h-[50vh] items-center justify-center font-semibold text-white">
        {inventoryTypeFilter.length ? (
          <span>
            {selectedType !== undefined
              ? selectedType
              : 'Não existem armas desse tipo no seu inventário.'}
          </span>
        ) : data?.data?.err?.code === 429 ||
          data?.data?.message?.includes('Error') ? (
          <span className="text-center">
            <p>Ocorreu um problema ao solicitar o seu inventário.</p>
            <p className="px-16">
              Verifique se o seu inventário se encontra público e tente
              novamente mais tarde.
            </p>
          </span>
        ) : (
          <span> Inventário vazio. </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="ml-2 flex flex-wrap justify-center gap-4">
        {isLoading || isRefetching ? (
          <CardSkin.Skeleton quantity={16} />
        ) : steamItens.length > 0 ? (
          steamItens.map(
            (
              {
                icon_url,
                name,
                name_color,
                market_name,
                market_hash_name,
                tags,
                type,
                assetid,
                actions,
              },
              index: number,
            ) => {
              if (index < page * 16 && index >= page * 16 - 16) {
                const primeiroName = name.split('|')[0]
                const statusFloatText = market_name.match(/\((.*?)\)/g)
                const statusFloat =
                  statusFloatText && statusFloatText[0].replace(/\(|\)/g, '')
                const itemIsAWeapon =
                  !tags[0].name.includes('Sticker') &&
                  !tags[0].name.includes('Agent')
                const completeType = type.split(' ')
                const category = completeType.pop()!
                const rarity = tags.filter(
                  ({ category, name }) => category === 'Rarity' && name,
                )[0].name
                const weapon = name.includes('Gloves')
                  ? tags[0].name
                  : tags[1].name
                const isSelected = skinsToAdvertise.some(
                  ({ id }) => assetid === id,
                )
                const categoryType = tags.filter(
                  ({ category }) => category === 'Type',
                )
                const isRentable = !(
                  categoryType[0].name === 'Graffiti' ||
                  categoryType[0].name === 'Container' ||
                  categoryType[0].name === 'Sticker' ||
                  categoryType[0].name === 'Collectible'
                )
                const linkForPreviewSkin = actions ? actions[0].link : '#'

                return (
                  <ModalSkinShowcaseMain
                    isRentable={isRentable}
                    key={assetid}
                    asset_id={assetid}
                    skinImage={icon_url}
                    marketName={market_hash_name}
                    skinName={market_name}
                    skinCategory={category}
                    skinWeapon={weapon}
                    statusFloat={statusFloat || ''}
                    skinRarity={rarity}
                    float={'0.2555'}
                    linkForPreviewSkin={linkForPreviewSkin}
                    linkForProfile={trueSession.user?.steam?.profileurl!}
                    id={assetid}
                    isSelected={isSelected}
                    activator={
                      <div
                        className={classNames(
                          'group relative w-[206px] cursor-pointer gap-2 rounded-lg border-[1px] border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white transition-all hover:bg-mesh-color-neutral-700',
                          {
                            'bg-mesh-color-neutral-700': isSelected,
                          },
                        )}
                      >
                        <div
                          className={classNames(
                            'absolute left-1 top-1 z-10 h-6 w-6 rounded-full border-[1px] border-mesh-color-neutral-400 transition-all',
                            {
                              'border-mesh-color-neutral-100 bg-mesh-color-accent-1100':
                                isSelected,
                            },
                            {
                              'group-hover:border-mesh-color-neutral-200 group-hover:bg-mesh-color-neutral-500':
                                !isSelected,
                            },
                          )}
                        />
                        <CardSkin.Root classname="flex relative flex-col h-[245px] justify-between">
                          <div className="h-full">
                            <CardSkin.Image
                              icon_url={icon_url}
                              rarity={rarity}
                              primeiroName={primeiroName}
                            />
                            {isSelected && (
                              <Common.Button className="absolute left-11 top-[85px] w-1/2 border-none bg-mesh-color-neutral-500 opacity-100">
                                <Common.Title bold={600}>Alterar</Common.Title>
                              </Common.Button>
                            )}
                            <CardSkin.Content
                              market_name={market_name}
                              primeiroName={primeiroName}
                              float={
                                itemIsAWeapon && isRentable ? '0.254665' : ''
                              }
                            />
                          </div>
                          {itemIsAWeapon && isRentable && (
                            <ColoredLine position={0.254665} />
                          )}
                        </CardSkin.Root>
                      </div>
                    }
                  />
                )
              }
              return null
            },
          )
        ) : (
          renderEmptyMessage()
        )}
      </div>
      {!isLoading && data?.data && maxPages > 0 && (
        <LayoutPagination
          maxPages={maxPages}
          pageState={page}
          setPageState={setPage}
          disabled={isLoading || isRefetching}
        />
      )}
    </div>
  )
}
