'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconClose } from '@/components/Icons'
import { useState } from 'react'

export function PageSettingsInformation() {
  const [exchangeUrl, setExchangeUrl] = useState('')

  return (
    <div className="flex w-2/3 flex-col gap-8">
      <div className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6">
        <div>
          <Common.Title bold={700} size={'2xl'} color="white">
            Informações Pessoais
          </Common.Title>
          <span className="text-mesh-color-neutral-200">
            Aqui você encontra informações sobre a sua conta RentsSkins.
            Recomendamos que você mantenha a sua URL de Troca e outras
            informações importantes atualizadas para não ter problema na hora da
            negociação.
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Common.Title size={'lg'} color="white">
            URL de Troca
          </Common.Title>
          <div className="flex gap-4">
            <div className="flex w-full items-center">
              <Form.Input.Text
                state={exchangeUrl}
                setState={setExchangeUrl}
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
                labelClassName="w-full"
                className={`w-full rounded-md bg-mesh-color-neutral-600 py-2 pl-3
                transition-all ${
                  exchangeUrl !== '' ? 'pr-14' : 'pr-3'
                } text-white
                ring-mesh-color-primary-1900 placeholder:text-mesh-color-neutral-100 focus:ring-2`}
              />
              {exchangeUrl !== '' && (
                <Common.Button
                  className={`relative -ml-10 border-none`}
                  onClick={() => setExchangeUrl('')}
                >
                  <IconClose />
                </Common.Button>
              )}
            </div>
            <div className="flex w-3/12 items-center justify-evenly">
              <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
                Obter URL
              </Common.Button>
              <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
                Aplicar
              </Common.Button>
            </div>
          </div>
        </div>

        <div className="my-6 h-[1px] w-full bg-mesh-color-neutral-200" />

        <div className="flex flex-col">
          <Common.Title size={'lg'} color="white">
            Link de Venda
          </Common.Title>
          <div className="flex items-center justify-between ">
            <span className="text-mesh-color-neutral-200">
              https://rentskins/?sellerid=10902554 (MAKE IT FUNCTIONAL)
            </span>
            <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
              Copiar Link
            </Common.Button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6">
        <Common.Title bold={700} size={'2xl'} color="white">
          Informações de Contato
        </Common.Title>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <Common.Title size={'lg'} color="white">
              Email
            </Common.Title>
            <span className="text-mesh-color-neutral-200">
              https://rentskins/?sellerid=10902554 (MAKE IT FUNCTIONAL)
            </span>
          </div>
          <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
            Copiar Link
          </Common.Button>
        </div>
      </div>
    </div>
  )
}
