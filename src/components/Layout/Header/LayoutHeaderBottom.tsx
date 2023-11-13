import Common from '@/components/Common'
import { IconSetaType } from '@/components/Icons'
import { ItemLink } from '@/components/Others/ItemLink'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

type PropsContainer = {
  title: string
  children?: React.ReactNode
  iconSeta?: React.ReactNode
  isList: boolean
  className?: string
  top?: '10' | '14'
}

interface IProps {
  className?: string
}

export function LayoutHeaderBottom({ className }: IProps) {
  return (
    <div
      className={`${className} z-0 flex w-full select-none items-center justify-center gap-10 border-y border-mesh-color-neutral-700`}
    >
      {/*  */}
      <div className="flex w-10/12 select-none justify-between gap-10 p-4">
        <ContainerItem title="Facas" iconSeta={<IconSetaType />} isList={true}>
          <ItemLink
            items={[
              'Bowie Knife',
              'Shadow Daggers',
              'Falchion Knife',
              'Butterfly Knife',
              'Huntsman Knife',
              'M9 Bayonet',
              'Bayonet',
              'Flip Knife',
              'Gut Knife',
              'Karambit',
              'Talon Knife',
              'Stiletto Knife',
              'Navaja Knife',
              'Ursus Knife',
              'Survival Knife',
              'Skeleton Knife',
              'Paracord Knife',
              'Nomad Knife',
            ]}
          />
        </ContainerItem>

        <ContainerItem title="Rifles" iconSeta={<IconSetaType />} isList={true}>
          <ItemLink
            items={[
              'AK-47',
              'AUG',
              'AWP',
              'FAMAS',
              'G3SG1',
              'Galil AR',
              'M4A1-S',
              'M4A4',
              'SCAR-20',
              'SG 553',
              'SSG 08',
            ]}
          />
        </ContainerItem>

        <ContainerItem
          title="Pistolas"
          iconSeta={<IconSetaType />}
          isList={true}
        >
          <ItemLink
            items={[
              'CZ75-Auto',
              'Desert Eagle',
              'Dual Berettas',
              'Five-SeveN',
              'Glock-18',
              'P2000',
              'P250',
              'R8 Revolver',
              'Tec-9',
              'USP-S',
            ]}
          />
        </ContainerItem>

        <ContainerItem title="SMG" iconSeta={<IconSetaType />} isList={true}>
          <ItemLink
            items={[
              'MAC-10',
              'MP5-SD',
              'MP7',
              'MP9',
              'P90',
              'PP-Bizon',
              'UMP-45',
            ]}
          />
        </ContainerItem>

        <ContainerItem
          title="Pesadas"
          iconSeta={<IconSetaType />}
          isList={true}
        >
          <ItemLink
            items={['M249', 'MAG-7', 'Negev', 'Nova', 'Sawed-Off', 'XM1014']}
          />
        </ContainerItem>

        <ContainerItem title="Luvas" iconSeta={<IconSetaType />} isList={true}>
          <ItemLink
            items={[
              'Bloodhound Gloves',
              'Broken Fang Gloves',
              'Driver Gloves',
              'Hand Wraps',
              'Hydra Gloves',
              'Moto Gloves',
              'Specialist Gloves',
              'Sport Gloves',
            ]}
          />
        </ContainerItem>

        <ContainerItem title="Adesivos" isList={false} />
        <ContainerItem title="Agentes" isList={false} />
        <ContainerItem title="Diversos" isList={false} />
      </div>
    </div>
  )
}

export const ContainerItem = ({
  children,
  title,
  iconSeta = <IconSetaType />,
  isList,
  className,
}: PropsContainer) => {
  const itemLabel = {
    Facas: 'Knife',
    Rifles: 'Rifle',
    Pistolas: 'Pistol',
    Luvas: 'Glove',
    Adesivos: 'Sticker',
    Agentes: 'Agent',
    Pesadas: 'Heavy',
  }

  const hrefQuery = itemLabel[title as keyof typeof itemLabel] || title

  return (
    <div className={classNames('group relative z-20 ', className)}>
      {isList ? (
        <div className="flex items-center">
          <Link href={`/loja?category=${hrefQuery}&page=1`}>
            <Common.Title color="white">{title}</Common.Title>
          </Link>
          <span className="ml-2 transition duration-300 ease-in-out group-hover:rotate-180">
            {iconSeta}
          </span>
        </div>
      ) : (
        <Common.Title color="white">
          <Link href={`/loja?category=${hrefQuery}`}>{title}</Link>
        </Common.Title>
      )}

      {isList && (
        <div
          className={`invisible absolute top-10 max-h-[300px] w-fit min-w-[150px] overflow-y-auto overflow-x-hidden rounded-md bg-[#222723] py-1 text-white drop-shadow-lg delay-75 group-hover:visible`}
        >
          <ul className="flex flex-col">{children}</ul>
        </div>
      )}
    </div>
  )
}
