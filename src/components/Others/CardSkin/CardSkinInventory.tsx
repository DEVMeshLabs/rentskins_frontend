/* eslint-disable camelcase */
import LayoutPagination from '@/components/Layout/LayoutPagination'
import { ModalSkinShowcaseMain } from '@/components/Modal/ModalSkinShowcase/ModalSkinShowcaseMain'
import { ISkinInventory } from '@/interfaces/IInventorySkin'
import SkinService from '@/services/skin.service'
import useComponentStore from '@/stores/components.store'
import useFilterStore from '@/stores/filters.store'
import Dimensions from '@/tools/dimensions.tool'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { CardSkin } from '.'
import ColoredLine from '../ColoredLine'

interface Props {
  steamid: string
}

export function CardSkinInventory({ steamid }: Props) {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const { inventoryTypeFilter } = useFilterStore()
  const { setIsInventoryFetching } = useComponentStore()

  const { data, isLoading, refetch, isRefetching } = useQuery({
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

  useEffect(() => {
    refetch()
  }, [page, itemsPerPage, inventoryTypeFilter, refetch])

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
          data.data.inventory.length > 0 ? (
          data.data.inventory.map(
            (
              {
                icon_url,
                name,
                name_color,
                market_name,
                ...rest
              }: ISkinInventory,
              index: number,
            ) => {
              const primeiroName = name.split('|')[0]
              const statusFloatText = market_name.match(/\((.*?)\)/g)
              const statusFloatTextMatch =
                statusFloatText && statusFloatText[0].replace(/\(|\)/g, '')

              const itemIsAWeapon =
                !rest.tags[0].name.includes('Sticker') &&
                !rest.tags[0].name.includes('Agent')

              return (
                <ModalSkinShowcaseMain
                  key={index}
                  image={icon_url}
                  weapon={primeiroName}
                  name={name}
                  preco="Undefined"
                  statusFloatText={statusFloatTextMatch as string}
                  float={'0.2555'}
                  activator={
                    <div className="w-[206px] gap-2 rounded-lg border-[1px] border-mesh-color-neutral-600 border-opacity-60 px-3 pb-4 pt-3 text-white">
                      <CardSkin.Root classname="flex flex-col h-[245px] justify-between">
                        <div className="h-full">
                          <CardSkin.Image
                            icon_url={icon_url}
                            name_color={name_color}
                            primeiroName={primeiroName}
                          />
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
