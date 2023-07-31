/* eslint-disable camelcase */
import LayoutPagination from '@/components/Layout/LayoutPagination'
import { ModalSkinShowcaseMain } from '@/components/Modal/ModalSkinShowcase/ModalSkinShowcaseMain'
import SkinService from '@/services/skin.service'
import useComponentStore from '@/stores/components.store'
import useFilterStore from '@/stores/filters.store'
import Dimensions from '@/tools/dimensions.tool'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { CardSkin } from '.'
import ColoredLine from '../ColoredLine'
import useSkinsStore from '@/stores/skins.store'
import classNames from 'classnames'
import Common from '@/components/Common'

interface Props {
  steamid: string
}

export function CardSkinInventory({ steamid }: Props) {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const { inventoryTypeFilter } = useFilterStore()
  const { setIsInventoryFetching } = useComponentStore()
  const { skinsToAdvertise } = useSkinsStore()

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['skinsInventory'],
    queryFn: async () =>
      SkinService.findBySkinsInventory(
        steamid,
        inventoryTypeFilter,
        Number(page),
        Number(itemsPerPage),
      ),
    enabled: !!steamid,
  })

  const checkPageDimensions = () => {
    Dimensions.setStatePerResolution(setItemsPerPage, [24, 15, 12, 9, 6])
  }

  useEffect(() => {
    window.addEventListener('resize', checkPageDimensions, false)
    checkPageDimensions()
    return () => window.removeEventListener('resize', checkPageDimensions)
  }, [])

  // useEffect(() => {
  //   refetch()
  // }, [page, itemsPerPage, inventoryTypeFilter, refetch])

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
          <text>
            {selectedType !== undefined
              ? selectedType
              : 'Não existem armas desse tipo no seu inventário.'}
          </text>
        ) : (
          <text> Inventário vazio. </text>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="ml-2 flex flex-wrap justify-start gap-4">
        {isLoading || isRefetching ? (
          <CardSkin.Skeleton quantity={itemsPerPage} />
        ) : data?.data &&
          data.data.inventory &&
          data.data.inventory.inventory.length > 0 ? (
          data.data.inventory.inventory.map(
            (
              { icon_url, name, name_color, market_name, tags, type, assetid },
              index: number,
            ) => {
              const primeiroName = name.split('|')[0]
              const statusFloatText = market_name.match(/\((.*?)\)/g)
              const statusFloat =
                statusFloatText && statusFloatText[0].replace(/\(|\)/g, '')
              const itemIsAWeapon =
                !tags[0].name.includes('Sticker') &&
                !tags[0].name.includes('Agent')
              const category = type.split(' ').pop()!
              const weapon = tags[1].name
              const isSelected = skinsToAdvertise.some(
                ({ id }) => assetid === id,
              )

              return (
                <ModalSkinShowcaseMain
                  key={assetid}
                  skinImage={icon_url}
                  skinName={name}
                  skinCategory={category}
                  skinWeapon={weapon}
                  statusFloat={statusFloat as string}
                  skinColor={name_color}
                  float={'0.2555'}
                  id={assetid}
                  isSelected={isSelected}
                  activator={
                    <div
                      className={classNames(
                        'group relative w-[206px] cursor-pointer gap-2 rounded-lg border-[1px] border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white hover:bg-mesh-color-neutral-700',
                        {
                          'bg-mesh-color-neutral-700': isSelected,
                        },
                      )}
                    >
                      <div
                        className={classNames(
                          'absolute left-1 top-1 z-10 h-6 w-6 rounded-full border-[1px] border-mesh-color-neutral-400',
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
      {!isLoading && data?.data && data?.data.inventory.maxPages > 0 && (
        <LayoutPagination
          maxPages={data.data.inventory.maxPages}
          pageState={page}
          setPageState={setPage}
          disabled={isLoading || isRefetching}
        />
      )}
    </div>
  )
}
