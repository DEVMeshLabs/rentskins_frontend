import Form from '@/components/Forms'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ColorRing } from 'react-loader-spinner'
import { formResolver } from './form.schema'

interface IProps {
  onFormSubmit: () => void
  userConfig: any
}

export function ModalConnectInventoryForm({
  onFormSubmit,
  userConfig,
}: IProps) {
  const { data: session } = useSession()
  const trueSession = (session as ISteamUser) || {}

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'accept-terms': userConfig?.agreed_with_terms || undefined,
      'receive-notifications': userConfig?.agreed_with_emails || false,
      'trade-link': userConfig?.url_trade || undefined,
      cpf: userConfig?.owner_cpf || undefined,
      email: userConfig?.owner_email || undefined,
    },
  })

  useEffect(() => {
    if (userConfig) {
      setValue('accept-terms', userConfig.agreed_with_terms)
      setValue('cpf', userConfig.owner_cpf)
      setValue('email', userConfig.owner_email)
      setValue('phone', userConfig.owner_phone)
      setValue('receive-notifications', userConfig.agreed_with_emails)
      setValue('trade-link', userConfig.url_trade)
    }
  }, [userConfig, setValue])

  const [formData, setFormData] = useState<any>(undefined)

  const { data } = useQuery({
    queryKey: ['ConfigService.createConfig', trueSession?.user?.steam?.steamid],
    queryFn: async () => {
      const sellLink = `https://rentskins/?sellerid=${trueSession?.user?.steam?.steamid}`
      const params = {
        owner_id: trueSession?.user?.steam?.steamid as string,
        owner_name: trueSession?.user?.name as string,
        owner_email: formData.email,
        owner_phone: formData.phone,
        owner_cpf: formData.cpf,
        url_sell: sellLink,
        url_trade: formData['trade-link'],
        agreed_with_emails: formData['receive-notifications'],
        agreed_with_terms: true,
        token: trueSession?.user?.token!,
      }
      return ConfigService.updateConfig(params)
    },
    enabled: !!formData,
  })

  useEffect(() => {
    if (data?.request.status) {
      return window.location.reload()
    }
  }, [data])

  const onSubmit = (data: any) => {
    setFormData(data)
    onFormSubmit()
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
            placeholder="https://steamcommunity.com/tradeoffer/new/?partner=000000&token=abcdef"
            labelClassName="w-10/12 text-white"
            register={register('trade-link')}
            errors={errors['trade-link']}
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://steamcommunity.com/my/tradeoffers/privacy"
            tabIndex={-1}
            className="h-full w-min whitespace-nowrap border-none text-mesh-color-primary-1200"
          >
            Obter URL
          </a>
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

      <Form.Input.Phone
        name="phone"
        label="Telefone de Contato"
        placeholder="(00) 00000-0000"
        labelClassName="w-8/12 text-white"
        register={register('phone')}
        errors={errors.phone}
      />

      <Form.Input.CPF
        name="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        labelClassName="w-8/12 text-white"
        register={register('cpf')}
        errors={errors.cpf}
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
              <Link
                href="/termos-de-uso"
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Termos de Serviço
              </Link>
              ,{' '}
              <Link
                href="/privacidade"
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Privacidade
              </Link>{' '}
              e{' '}
              <Link
                href="/termos-de-uso"
                tabIndex={-1}
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Reembolso
              </Link>{' '}
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
        disabled={formData}
        className="mt-8 flex w-48 items-center justify-center border-none bg-mesh-color-primary-1200 px-20 py-2 text-lg font-bold text-mesh-color-others-black transition-all disabled:bg-mesh-color-neutral-400 disabled:text-mesh-color-neutral-100"
      >
        {formData ? buttonLoading : 'Concluir'}
      </Form.Button>
    </Form.Root>
  )
}

const buttonLoading = (
  <ColorRing
    width={48}
    height={'100%'}
    colors={['#141517', '#141517', '#141517', '#141517', '#141517']}
  />
)
