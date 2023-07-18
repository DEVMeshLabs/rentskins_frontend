'use client'
import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import { ITime } from '@/services/interfaces/notification.interface'
import useFilterStore from '@/stores/filters.store'
import URLQuery from '@/tools/urlquery.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'

export function ModalNotificationFilter() {
  const { notificationFilter, setNotificationFilter } = useFilterStore()

  const [modalOpen, setModalOpen] = useState<string | undefined>('')
  const [modalType, setModalType] = useState<string | undefined>('')
  const [selectedFilter, setSelectedFilter] = useState(notificationFilter)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setDomainQuery()
  }, [location.search])

  const setDomainQuery = () => {
    setModalOpen(
      searchParams.get('modalopen') as SetStateAction<string | undefined>,
    )

    setModalType(
      searchParams.get('modaltype') as SetStateAction<string | undefined>,
    )
  }

  const removeDomainQuery = () => {
    router.push(URLQuery.removeQuery(['modalopen', 'modaltype']))
  }

  const handleOnChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value as ITime)
  }

  const handleOnApplyFilter = (apply: boolean = true) => {
    if (apply) {
      setNotificationFilter(selectedFilter)
    } else {
      setNotificationFilter('tudo')
    }
    removeDomainQuery()
  }

  const filterLabels = [
    { value: 'tudo', label: 'Tudo' },
    { value: 'hoje', label: 'Hoje' },
    { value: 'tresdias', label: '1-3 Dias' },
    { value: 'umasemana', label: '1 Semana' },
    { value: 'ummes', label: '1 Mês' },
    { value: 'tresmes', label: '3 Meses' },
    { value: 'umano', label: '1 Ano' },
  ]

  return (
    <Dialog.Root
      modal
      open={modalOpen === 'true' && modalType === 'filter'}
      defaultOpen={false}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-20 flex bg-black/70 transition-all"
          onClick={() => removeDomainQuery()}
        />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-30 flex h-2/6 w-1/3 -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex flex-col justify-between gap-2 rounded-2xl bg-mesh-color-neutral-700 px-8 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Dialog.Title className="text-2xl font-semibold text-white">
                  Filtro de tempo
                </Dialog.Title>
                <Dialog.Close asChild onClick={() => removeDomainQuery()}>
                  <Common.Button className="border-none">
                    <IconClose />
                  </Common.Button>
                </Dialog.Close>
              </div>

              <div className="flex w-2/3 flex-wrap gap-2">
                {filterLabels.map(({ label, value }, index) => (
                  <label
                    key={'filter-label' + index}
                    className="group cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      value={value}
                      defaultChecked={value === label}
                      name="notification-filter"
                      className="peer absolute"
                      onChange={(event) => handleOnChangeFilter(event)}
                    />
                    <div
                      className="h-fit rounded-lg bg-mesh-color-neutral-400 px-3 py-1
                text-white transition-all group-hover:bg-mesh-color-neutral-400/50 peer-checked:bg-mesh-color-primary-1200
                peer-checked:font-semibold peer-checked:text-black"
                    >
                      {label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-end gap-12">
              <span
                className="h-fit w-fit cursor-pointer select-none
              font-semibold text-mesh-color-neutral-200 opacity-50
              hover:opacity-100"
                onClick={() => handleOnApplyFilter(false)}
              >
                Limpar
              </span>
              <Common.Button
                className="border-none bg-mesh-color-primary-1200 px-6 py-2 font-semibold"
                onClick={() => handleOnApplyFilter()}
              >
                Aplicar
              </Common.Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
