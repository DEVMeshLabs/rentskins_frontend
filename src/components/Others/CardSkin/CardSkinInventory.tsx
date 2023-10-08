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
import { filterSkinsToInventory } from '@/utils/filterSkinsToInvetory'
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
      SkinService.findAllSkinsByIdSeller(
        trueSession?.user?.steam?.steamid!,
        page,
      ),
    keepPreviousData: true,
  })

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['skinsInventory'],
    queryFn: async () =>
      SkinService.findBySkinsInventoryWithFilters(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
        inventoryTypeFilter,
        Number(page),
        Number(16),
      ),
    enabled: status === 'authenticated',
    keepPreviousData: true,
  })

  console.log(data?.data.inventory)

  useEffect(() => {
    if (
      data?.data &&
      data.data.inventory &&
      skinsProfile?.data &&
      skinsProfile.data.skins
    ) {
      setSteamItens(
        filterSkinsToInventory(data.data.inventory, skinsProfile.data.skins),
      )
    }
  }, [data, skinsProfile])

  useEffect(() => {
    refetch()
    refetchSkinsProfile()
  }, [page, inventoryTypeFilter, refetch])

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
        ) : data?.data?.err?.code === 429 ? (
          <span className="text-center">
            <p>Ocorreu um problema ao solicitar o seu inventário.</p>
            <p>Tente novamente mais tarde.</p>
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
              const primeiroName = name.split('|')[0]
              const statusFloatText = market_name.match(/\((.*?)\)/g)
              const statusFloat =
                statusFloatText && statusFloatText[0].replace(/\(|\)/g, '')
              const itemIsAWeapon =
                !tags[0].name.includes('Sticker') &&
                !tags[0].name.includes('Agent')
              const completeType = type.split(' ')
              const category = completeType.pop()!
              const rarity = completeType.join(' ')
              const weapon = name.includes('Gloves')
                ? tags[0].name
                : tags[1].name
              const isSelected = skinsToAdvertise.some(
                ({ id }) => assetid === id,
              )

              const linkForPreviewSkin = actions[0].link

              console.log(linkForPreviewSkin)
              return (
                <ModalSkinShowcaseMain
                  key={assetid}
                  asset_id={assetid}
                  skinImage={icon_url}
                  marketName={market_hash_name}
                  skinName={market_name}
                  skinCategory={category}
                  skinWeapon={weapon}
                  statusFloat={statusFloat as string}
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
                            name_color={name_color}
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
                            float={itemIsAWeapon ? '0.254665' : ''}
                          />
                        </div>
                        {itemIsAWeapon && <ColoredLine position={0.254665} />}
                      </CardSkin.Root>
                    </div>
                  }
                />
              )
            },
          )
        ) : (
          renderEmptyMessage()
        )}
      </div>
      {!isLoading && data?.data && data?.data.maxPages > 0 && (
        <LayoutPagination
          maxPages={data.data.maxPages}
          pageState={page}
          setPageState={setPage}
          disabled={isLoading || isRefetching}
        />
      )}
    </div>
  )
}
