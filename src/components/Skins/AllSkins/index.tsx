/* eslint-disable camelcase */
// import { skins } from '@/Mock'
import { skins } from '@/Mock/skins.mock'
import { CardSkin } from '../../CardSkin'
import classNames from 'classnames'
import { PageSelector } from '@/components/PageSelector'
import useComponentStore from '@/stores/components.store'

interface skin {
  name: string
  name_color: string
  icon_url: string
}

interface IProps {
  skinsCategories?: skin[]
  center?: boolean
  itemsPerPage: number
}

export default function AllSkins({
  skinsCategories,
  center = false,
  itemsPerPage = 10,
}: IProps) {
  const { setPageSelectorIndex, pageSelectorIndex } = useComponentStore()
  console.log(skins.length)

  const allSkins = skinsCategories || skins

  const allSkinsFilter = allSkins.filter(
    ({ name }: skin) =>
      !name.includes('Coin') &&
      !name.includes('Pin') &&
      !name.includes('Graffiti'),
  )

  return (
    <div className="flex w-11/12 flex-col items-center">
      <div
        className={classNames('mt-6 flex w-full flex-wrap gap-5 ', {
          'mb-6 mt-0 w-auto': skinsCategories !== undefined,
          'justify-center': center,
        })}
      >
        {allSkinsFilter.map(
          ({ name, name_color, icon_url }: skin, index: number) => {
            const itemIndex = index + 1
            if (
              itemIndex > itemsPerPage * (pageSelectorIndex - 1) &&
              itemIndex <= itemsPerPage * pageSelectorIndex
            )
              return (
                <CardSkin
                  iconUrl={icon_url}
                  name={name}
                  nameColor={name_color}
                  key={`${name}-${index}`}
                />
              )
            return null
          },
        )}
      </div>
      <PageSelector
        pages={allSkinsFilter.length / itemsPerPage}
        handleOnChange={(event) =>
          setPageSelectorIndex(event.target.value as unknown as number)
        }
      />
    </div>
  )
}