import Form from '@/components/Forms'
import HoverCardInfo from '@/components/HoverCard/HoverCardInfo'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ColorRing } from 'react-loader-spinner'
import { formResolver } from './form.schema'

interface IProps {
  onFormSubmit: (isLoading: boolean) => void
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      'accept-terms': userConfig?.agreed_with_terms || undefined,
      'receive-notifications': userConfig?.agreed_with_emails || false,
      'trade-link': userConfig?.url_trade || undefined,
      cpf: userConfig?.owner_cpf || undefined,
      email: userConfig?.owner_email || undefined,
      'api-key': userConfig?.key || undefined,
    },
  })

  const cpfWatch = watch('cpf')
  const emailWatch = watch('email')
  const phoneWatch = watch('phone')
  const tradelinkWatch = watch('trade-link')
  const notificationsWatch = watch('receive-notifications')
  const apikeyWatch = watch('api-key')

  const { data, refetch, isRefetching, fetchStatus } = useQuery({
    queryKey: ['ConfigService.createConfig', trueSession?.user?.steam?.steamid],
    queryFn: async () => {
      const sellLink = `https://rentskins/?sellerid=${trueSession?.user?.steam?.steamid}`
      const params = {
        owner_id: trueSession?.user?.steam?.steamid as string,
        owner_name: trueSession?.user?.name as string,
        owner_email: emailWatch,
        owner_phone: phoneWatch,
        owner_cpf: cpfWatch,
        url_sell: sellLink,
        key: apikeyWatch!,
        url_trade: tradelinkWatch,
        agreed_with_emails: notificationsWatch,
        agreed_with_terms: true,
        token: trueSession?.user?.token!,
      }
      return ConfigService.updateConfig(params)
    },
    enabled: false,
    cacheTime: 0,
  })

  const cpfError = {
    message:
      data?.response?.data?.errors?.includes('CPF') &&
      data?.config?.data?.includes(cpfWatch) &&
      data?.response?.data?.errors,
  }

  const emailError = {
    message:
      data?.response?.data?.errors?.includes('Email') &&
      data?.config?.data?.includes(emailWatch) &&
      data?.response?.data?.errors,
  }

  const phoneError = {
    message:
      data?.response?.data?.errors?.includes('Telefone') &&
      data?.config?.data?.includes(phoneWatch) &&
      data?.response?.data?.errors,
  }

  const tradelinkError = {
    message:
      data?.response?.data?.errors?.includes('Trade Link') &&
      data?.config?.data?.includes(tradelinkWatch) &&
      data?.response?.data?.errors,
  }

  const apikeyError = {
    message:
      data?.response?.data?.errors?.includes('API') &&
      data?.config?.data?.includes(apikeyWatch) &&
      data?.response?.data?.errors,
  }

  // Error == 409
  useEffect(() => {
    if (data?.request.status === 204) {
      return window.location.reload()
    }
  }, [data])

  const onSubmit = () => {
    refetch()
    onFormSubmit(isRefetching)
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
            errors={errors['trade-link'] || tradelinkError}
          />
          <HoverCardInfo
            side="bottom"
            customTrigger={
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url"
                tabIndex={-1}
                className="mt-3 h-full w-min place-self-center whitespace-nowrap rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 font-semibold text-black opacity-70 transition-all hover:opacity-100"
              >
                Obter URL
              </a>
            }
          >
            Para iniciar o fluxo de transação, precisamos do seu link de trocas.
            Isso possibilitará que outros usuários iniciem negociações com você
            de maneira mais eficiente.
          </HoverCardInfo>
        </div>
      </div>

      <Form.Input.Text
        name="email"
        label="Email de Contato"
        placeholder="exemplo@email.com"
        labelClassName="w-8/12 text-white"
        register={register('email')}
        errors={errors.email || emailError}
      />

      <Form.Input.Phone
        name="phone"
        label="Telefone de Contato"
        placeholder="(00) 00000-0000"
        labelClassName="w-8/12 text-white"
        register={register('phone')}
        errors={errors.phone || phoneError}
      />

      <Form.Input.CPF
        name="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        labelClassName="w-8/12 text-white"
        register={register('cpf')}
        errors={errors.cpf || cpfError}
      />

      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <Form.Input.Text
            name="api-key"
            label="Chave da API"
            optional
            placeholder="A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5"
            labelClassName="w-8/12 text-white"
            register={register('api-key')}
            errors={errors['api-key'] || apikeyError}
            maxLength={32}
          />
          <div className="relative top-2">
            <HoverCardInfo>
              <div>
                <p>
                  Negociações de <span className="font-bold">alugueis</span>{' '}
                  requerem que os usuários forneçam uma Chave de API para
                  detecção da proposta de negociação. A chave será utilizada{' '}
                  <span className="font-bold">
                    apenas para verificação e validação das trocas
                  </span>
                  , mas nunca para confirma-las ou altera-las.
                </p>
              </div>
            </HoverCardInfo>
          </div>
        </div>
        <HoverCardInfo
          customTrigger={
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://steamcommunity.com/dev/apikey"
              tabIndex={-1}
              className="mt-3 h-full place-self-center whitespace-nowrap rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 font-semibold text-black opacity-70 transition-all hover:opacity-100"
            >
              Obter Chave
            </a>
          }
        >
          <div>
            <span className="italice font-bold">Passo a Passo:</span>
            <ul>
              <li>
                <span className="font-bold">1.</span> Insira um domínio,
                concorde com os termos e se registre.
              </li>
              <li>
                <span className="font-bold">2.</span> Copie a chave fornecida.
              </li>
              <li>
                <span className="font-bold">3.</span> Cole a chave fornecida no
                campo &quot;Chave da API&quot; no formulário.
              </li>
            </ul>
            <br />
            <span className="text-justify text-sm italic">
              Obs: Se você já possuir uma chave que não foi registrada por você,
              recomendamos revoga-la por motivos de segurança.
            </span>
          </div>
        </HoverCardInfo>
      </div>

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
          checkClassname="ml-[0.3rem]"
          labelClassName="text-sm text-mesh-color-neutral-200"
          inputClassName="focus:border-mesh-color-primary-800 bg-transparent border-2 border-mesh-color-neutral-500 checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
          errorsClassname="text-sm text-red-500 absolute"
          register={register('accept-terms')}
          errors={errors['accept-terms']}
        />
      </div>

      <Form.Button
        buttonStyle={undefined}
        disabled={fetchStatus === 'fetching'}
        className="mt-8 flex w-48 items-center justify-center border-none bg-mesh-color-primary-1200 px-20 py-2 text-lg font-bold text-mesh-color-others-black transition-all disabled:bg-mesh-color-neutral-400 disabled:text-mesh-color-neutral-100"
      >
        {fetchStatus === 'fetching' ? buttonLoading : 'Concluir'}
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
