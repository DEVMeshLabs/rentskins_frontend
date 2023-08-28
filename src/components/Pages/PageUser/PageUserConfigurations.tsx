'use client'

import Common from '@/components/Common'
import Form from '@/components/Forms'
import { TypeFormRadioInlineOption } from '@/components/Forms/Input/Radio/FormInputRadioBlock'
import { IconGear, IconPaper } from '@/components/Icons'
import URLQuery from '@/tools/urlquery.tool'
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PageSettingsInformation } from '../PageSettings/PageSettingsInformation'
import { PageSettingsTransactions } from '../PageSettings/PageSettingsTransactions'
import { formResolver } from './configuration.schema'

export default function PageUserConfigurations() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { register, watch } = useForm({
    resolver: formResolver,
    defaultValues: { tab: searchParams.get('type')! },
  })

  const watchTab = watch('tab')

  useEffect(() => {
    router.push(URLQuery.addQuery([{ key: 'type', value: watchTab! }]))
  }, [watchTab, router])

  useEffect(() => {
    const titleQuery = searchParams.get('type') as 'personal' | 'transactions'

    if (titleQuery !== 'personal') {
      if (titleQuery !== 'transactions') {
        if (titleQuery !== 'security') {
          router.push(URLQuery.addQuery([{ key: 'type', value: 'personal' }]))
        }
      }
    }
  }, [searchParams, router])

  const renderPageContent = () => {
    const content = {
      personal: <PageSettingsInformation />,
      transactions: <PageSettingsTransactions />,
    }

    const possibleTypes = ['personal', 'transactions', 'security']

    const index = searchParams.get('type') as 'personal' | 'transactions'

    if (possibleTypes.includes(index)) {
      return content[index]
    } else {
      return (
        <div className="h-2/3 w-2/3 animate-pulse rounded-lg bg-mesh-color-neutral-500" />
      )
    }
  }
  return (
    <>
      <div className="flex h-min w-max flex-col items-end gap-2">
        <div className="flex flex-col items-start gap-6">
          <Common.Title bold={900} size="2xl" color="white">
            Configurações
          </Common.Title>

          <div className="">
            <Form.Input.Radio.Default
              name="settings-tab"
              containerClassname="flex flex-col gap-2 select-none"
              labelClassName="hover:cursor-pointer w-full pr-6 pl-4 py-4 rounded-md
              bg-mesh-color-neutral-800 hover:bg-mesh-color-neutral-700 peer-checked:bg-mesh-color-neutral-500 delay-0 transition-all"
              inputClassName="transition-all"
              wrapperClassname="flex rounded-md hover:cursor-pointer"
              items={renderRadioButtonOptions(searchParams)}
              register={register('tab')}
            />
          </div>
        </div>
      </div>

      {renderPageContent()}
    </>
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
