import Common from '@/components/Common'
import Form from '@/components/Forms'
import ConfigService from '@/services/config.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver } from './form.schema'

export function ModalConnectInventoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'accept-terms': undefined,
      'receive-notifications': false,
      'trade-link': undefined,
      email: undefined,
    },
  })
  const [formData, setFormData] = useState<any>(undefined)

  const {
    user: { steamid, username },
  } = useUserStore()

  const { refetch } = useQuery({
    queryKey: ['ConfigService.createConfig', steamid],
    queryFn: () => {
      const sellLink = `https://rentskins/?sellerid=${steamid}`
      const params = {
        owner_id: steamid,
        owner_name: username,
        owner_email: formData.email,
        steam_guard: false,
        url_sell: sellLink,
        url_trade: formData['trade-link'],
        agreed_with_emails: formData['receive-notifications'],
        agreed_with_terms: true,
      }
      ConfigService.createConfig(params)
      return window.location.reload()
    },
    enabled: false,
  })

  const enableButton = dirtyFields.email && dirtyFields['trade-link']

  const handleButtonGetTradeLink = () => {
    if (steamid) {
      window.location.assign(
        `https://steamcommunity.com/id/${steamid}/tradeoffers/privacy`,
      )
    }
  }

  const onSubmit = (data: any) => {
    setFormData(data)
    refetch()
    console.log(data)
  }

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex h-full w-11/12 flex-col items-start justify-between gap-4"
    >
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <Form.Input.Text
            label="Insira URL Trade Link do seu Perfil"
            name="trade-link"
            placeholder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
            labelClassName="w-10/12 text-white"
            register={register('trade-link')}
            errors={errors['trade-link']}
          />
          <Common.Button
            tabIndex={-1}
            onClick={handleButtonGetTradeLink}
            className="h-full w-min whitespace-nowrap border-none text-mesh-color-primary-1200"
          >
            Obter URL
          </Common.Button>
        </div>
      </div>

      <Form.Input.Text
        name="email"
        label="Email de Contato"
        placeholder="exemplo@email.com"
        labelClassName="w-8/12 text-white"
        register={register('email')}
        errors={errors.email}
      />

      <div className="mt-4 flex flex-col gap-2">
        <Form.Input.Checkbox
          name="receive-notifications"
          label="Deseja receber promoções em seu email?"
          checkClassname="ml-[0.2rem]"
          labelClassName="text-sm text-mesh-color-neutral-200"
          inputClassName="focus:border-mesh-color-primary-800 bg-transparent border-2 border-mesh-color-neutral-500 checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
          register={register('receive-notifications')}
        />

        <Form.Input.Checkbox
          name="accept-terms"
          label={
            <span>
              Eu concordo com os{' '}
              <a
                href=""
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Termos de Serviço
              </a>
              ,{' '}
              <a
                href=""
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Privacidade
              </a>{' '}
              e{' '}
              <a
                href=""
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Reembolso
              </a>{' '}
              da RentSkins.
            </span>
          }
          checkClassname="ml-[0.2rem]"
          labelClassName="text-sm text-mesh-color-neutral-200"
          inputClassName="focus:border-mesh-color-primary-800 bg-transparent border-2 border-mesh-color-neutral-500 checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
          errorsClassname="text-sm text-red-500 absolute"
          register={register('accept-terms')}
          errors={errors['accept-terms']}
        />
      </div>

      <Form.Button
        buttonStyle={undefined}
        disabled={!enableButton}
        className="mt-8 border-none bg-mesh-color-primary-1200 px-20 py-2 text-lg font-bold text-mesh-color-others-black transition-all disabled:bg-mesh-color-neutral-400 disabled:text-mesh-color-neutral-100"
      >
        Concluir
      </Form.Button>
    </Form.Root>
  )
}
