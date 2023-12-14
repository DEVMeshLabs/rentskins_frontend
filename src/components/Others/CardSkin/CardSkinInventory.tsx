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
import { Stickers } from '@/tools/stickers.tool'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { CardSkin } from '.'
import ColoredLine from '../ColoredLine'

interface Props {
  apiKey: boolean
}

export function CardSkinInventory({ apiKey }: Props) {
  const { data: session, status } = useSession()
  const trueSession = (session as ISteamUser) || {}
  const [page, setPage] = useState(1)
  const { inventoryTypeFilter } = useFilterStore()
  const { setIsInventoryFetching } = useComponentStore()
  const { skinsToAdvertise } = useSkinsStore()
  const [itemsLeftOnInventory, setItemsLeftOnInventory] = useState<
    ISteamItens[]
  >([])

  const { data: itemsOnProfile, refetch: refetchItemsOnProfile } = useQuery({
    queryKey: ['profileSkins', trueSession?.user?.steam?.steamid!],
    queryFn: () =>
      SkinService.findAllSkinsByIdSeller(
        trueSession?.user?.steam?.steamid!,
        // '76561198862407248',
        undefined,
        true,
      ),
    keepPreviousData: false,
    cacheTime: 0,
  })

  const {
    data: itemsOnInventory,
    isLoading: isInventoryLoading,
    isRefetching: isInventoryRefetching,
    refetch: refetchInventory,
  } = useQuery({
    queryKey: ['skinsInventory', trueSession.user?.token!, inventoryTypeFilter],
    queryFn: async () =>
      SkinService.findBySkinsInventoryWithFilters(
        '76561198862407248',
        // trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
        inventoryTypeFilter,
      ),
    enabled: status === 'authenticated',
    keepPreviousData: true,
  })

  useEffect(() => {
    if (
      itemsOnInventory?.data &&
      itemsOnProfile?.data &&
      itemsOnProfile.data.skins
    ) {
      setItemsLeftOnInventory(
        itemsOnInventory &&
          itemsOnInventory?.data &&
          !itemsOnInventory?.data?.message &&
          itemsOnInventory?.data?.filter(
            ({ assetid }: any) =>
              !itemsOnProfile?.data?.skins.some(
                ({ asset_id }) => asset_id === assetid,
              ),
          ),
      )
    }
  }, [itemsOnInventory, itemsOnProfile])

  useEffect(() => {
    if (itemsOnInventory?.data?.message?.includes('Error')) {
      Toast.Error(
        'Não foi possível solicitar o inventário. Verifique se o seu inventário se encontra público e tente novamente mais tarde.',
      )
    }
  }, [itemsOnInventory])

  const maxPages = Math.ceil(itemsLeftOnInventory.length / 16)

  useEffect(() => {
    refetchInventory()
    refetchItemsOnProfile()
  }, [page, inventoryTypeFilter, refetchInventory, refetchItemsOnProfile])

  useEffect(() => {
    setIsInventoryFetching(isInventoryLoading || isInventoryRefetching)
  }, [isInventoryLoading, isInventoryRefetching, setIsInventoryFetching])

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
        ) : itemsOnInventory?.data?.err?.code === 429 ||
          itemsOnInventory?.data?.message?.includes('Error') ? (
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
        {isInventoryLoading || isInventoryRefetching ? (
          <CardSkin.Skeleton quantity={16} />
        ) : itemsLeftOnInventory.length > 0 ? (
          itemsLeftOnInventory.map(
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
                descriptions,
              },
              index: number,
            ) => {
              if (index < page * 16 && index >= page * 16 - 16) {
                const firstName = name.split('|')[0]
                const statusFloatText = market_name.match(/\((.*?)\)/g)
                const statusFloat =
                  statusFloatText && statusFloatText[0].replace(/\(|\)/g, '')
                const itemIsAWeapon =
                  !tags[0].name.includes('Sticker') &&
                  !tags[0].name.includes('Agent') &&
                  !tags[0].name.includes('Patch')
                const completeType = type.split(' ')
                const category = completeType.pop()!
                const rarity = tags.filter(
                  ({ category, name }) => category === 'Rarity' && name,
                )[0].name
                const weapon = name.includes('Gloves')
                  ? tags[0].name
                  : tags[1].name
                const isSelected = skinsToAdvertise.some(
                  ({ asset_id }) => assetid === asset_id,
                )
                const categoryType = tags.filter(
                  ({ category }) => category === 'Type',
                )
                const isRentable = !(
                  categoryType[0].name === 'Graffiti' ||
                  categoryType[0].name === 'Container' ||
                  categoryType[0].name === 'Sticker' ||
                  categoryType[0].name === 'Collectible' ||
                  categoryType[0].name === 'Patch'
                )
                const linkForPreviewSkin = actions ? actions[0].link : '#'

                const stickers = Stickers.extractStickersFromString(
                  categoryType[0].name === 'Agent'
                    ? descriptions[4]?.value
                    : descriptions[6]?.value,
                  categoryType[0].name === 'Agent' ? 'Patch' : 'Sticker',
                )

                return (
                  <ModalSkinShowcaseMain
                    isRentable={isRentable}
                    stickers={stickers}
                    key={assetid}
                    type={categoryType[0].name}
                    asset_id={assetid}
                    skinImage={icon_url}
                    marketName={market_hash_name}
                    skinName={market_name}
                    apiKey={apiKey}
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
                              assetid={assetid}
                              stickers={stickers}
                              icon_url={icon_url}
                              rarity={rarity}
                              firstName={firstName}
                            />
                            {isSelected && (
                              <Common.Button className="absolute left-11 top-[85px] w-1/2 border-none bg-mesh-color-neutral-500 opacity-100">
                                <Common.Title bold={600}>Alterar</Common.Title>
                              </Common.Button>
                            )}
                            <CardSkin.Content
                              market_name={market_name}
                              firstName={firstName}
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
      {!isInventoryLoading && itemsOnInventory?.data && maxPages > 0 && (
        <LayoutPagination
          maxPages={maxPages}
          pageState={page}
          setPageState={setPage}
          disabled={isInventoryLoading || isInventoryRefetching}
        />
      )}
    </div>
  )
}
