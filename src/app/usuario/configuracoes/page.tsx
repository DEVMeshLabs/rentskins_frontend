'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { TypeFormRadioInlineOption } from '@/components/Forms/Input/Radio/FormInputRadioBlock'
import { IconGear, IconLockedShield, IconPaper } from '@/components/Icons'
import { PageSettingsInformation } from '@/components/Pages/PageSettings/PageSettingsInformation'
import { PageSettingsSecurity } from '@/components/Pages/PageSettings/PageSettingsSecurity'
import { PageSettingsTransactions } from '@/components/Pages/PageSettings/PageSettingsTransactions'
import URLQuery from '@/tools/urlquery.tool'
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Settings() {
  const [selectedSetting, setSelectedSetting] = useState('personal')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const titleQuery = searchParams.get('type') as
      | 'personal'
      | 'transactions'
      | 'security'

    if (titleQuery !== 'personal') {
      if (titleQuery !== 'transactions') {
        if (titleQuery !== 'security') {
          router.push(URLQuery.addQuery([{ key: 'type', value: 'personal' }]))
        }
      }
    }
  }, [searchParams, router])

  const handleOnRadio = (value: string) => {
    router.push(URLQuery.addQuery([{ key: 'type', value }]))
  }

  const renderPageContent = () => {
    const content = {
      personal: <PageSettingsInformation />,
      transactions: <PageSettingsTransactions />,
      security: <PageSettingsSecurity />,
    }

    const possibleTypes = ['personal', 'transactions', 'security']

    const index = searchParams.get('type') as
      | 'personal'
      | 'transactions'
      | 'security'

    if (possibleTypes.includes(index)) {
      return content[index]
    } else {
      return (
        <div className="h-2/3 w-2/3 animate-pulse rounded-lg bg-mesh-color-neutral-500" />
      )
    }
  }

  return (
    <div className="flex h-screen justify-center gap-10 bg-mesh-color-others-black px-[7.5rem] pt-8">
      <div className="flex h-min w-max flex-col items-end gap-2">
        <div className="flex flex-col items-start gap-6">
          <Common.Title bold={900} size="2xl" color="white">
            Configurações
          </Common.Title>

          <div className="">
            <Form.Input.Radio.Block
              name="settings"
              state={selectedSetting}
              setState={setSelectedSetting}
              onChange={({ target }) => handleOnRadio(target.value)}
              labelClassname="
              flex h-full w-full rounded-md
              px-4 py-3 text-lg text-mesh-color-neutral-200
              duration-500 hover:bg-mesh-color-neutral-500/50
              cursor-pointer select-none items-center justify-center transition-all
              bg-transparent border-none peer-checked:text-mesh-color-primary-1200 peer-checked:bg-mesh-color-neutral-600"
              wrapperClassname="flex flex-col justify-start gap-2"
              containerClassname="w-full"
              options={renderRadioButtonOptions(searchParams)}
            />
          </div>
        </div>
      </div>

      {renderPageContent()}
    </div>
  )
}

const renderRadioButtonOptions = (searchParams: ReadonlyURLSearchParams) => {
  const items = [
    {
      icon: (
        <IconGear
          width={20}
          height={18}
          fill={searchParams.get('type') === 'personal' ? '#A6CF2A' : '#A7B0A0'}
          stroke="#222723"
        />
      ),
      label: (
        <div
          className={`${
            searchParams.get('type') === 'personal'
              ? 'text-mesh-color-primary-1200'
              : 'text-mesh-color-neutral-200'
          }`}
        >
          Informações Pessoais
        </div>
      ),
      value: 'personal',
      checked: searchParams.get('type') === 'personal',
    },
    {
      icon: (
        <IconPaper
          width={18}
          height={18}
          fill={
            searchParams.get('type') === 'transactions' ? '#A6CF2A' : '#A7B0A0'
          }
          stroke="#222723"
        />
      ),
      label: (
        <div
          className={`${
            searchParams.get('type') === 'transactions'
              ? 'text-mesh-color-primary-1200'
              : 'text-mesh-color-neutral-200'
          }`}
        >
          Transações
        </div>
      ),
      value: 'transactions',
      checked: searchParams.get('type') === 'transactions',
    },
    {
      icon: (
        <IconLockedShield
          width={20}
          height={20}
          fill={searchParams.get('type') === 'security' ? '#A6CF2A' : '#A7B0A0'}
          stroke="#222723"
        />
      ),
      label: (
        <div
          className={`${
            searchParams.get('type') === 'security'
              ? 'text-mesh-color-primary-1200'
              : 'text-mesh-color-neutral-200'
          }`}
        >
          Segurança
        </div>
      ),
      value: 'security',
      checked: searchParams.get('type') === 'security',
    },
  ]

  return items.map((item) => {
    return {
      label: (
        <div className="flex w-full items-center justify-start gap-2">
          {item.icon}
          {item.label}
        </div>
      ),
      labelType: 'node',
      value: item.value,
    } as TypeFormRadioInlineOption
  })
}
