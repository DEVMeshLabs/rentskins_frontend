'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import HoverCardInfo from '@/components/HoverCard/HoverCardInfo'
import { IconClose } from '@/components/Icons'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import Toast from '@/tools/toast.tool'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formResolver as apikeyResolver } from './schemas/information-apikey.schema'
import { formResolver as cpfResolver } from './schemas/information-cpf.contact.schema'
import { formResolver as emailResolver } from './schemas/information-email.contact.schema'
import { formResolver as phoneResolver } from './schemas/information-phone.contact.schema'
import { formResolver as personalResolver } from './schemas/information.personal.schema'

export function PageSettingsInformation() {
  const { data: session, status } = useSession()
  const trueSession = session as ISteamUser
  const [editEmail, setEditEmail] = useState(false)
  const [editPhone, setEditPhone] = useState(false)
  const [editCPF, setEditCPF] = useState(false)
  const [editTradeLink, setEditTradeLink] = useState(false)
  const [editKey, setEditKey] = useState(false)

  const { data: userConfig, isLoading } = useQuery({
    queryKey: ['ConfigService.getUserConfig'],
    queryFn: async () => {
      return ConfigService.findByConfigUserId(
        trueSession.user?.steam?.steamid!,
        trueSession.user?.token!,
      )
    },
    enabled: status === 'authenticated',
  })

  const {
    handleSubmit,
    setValue: setValueTrade,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: personalResolver,
    defaultValues: {
      'trade-link': userConfig?.data?.url_trade! || undefined,
    },
  })

  const {
    handleSubmit: handleSubmitEmail,
    register: registerEmail,
    setValue: setValueEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    resolver: emailResolver,
    defaultValues: {
      email: userConfig?.data?.owner_email || undefined,
    },
  })

  const {
    handleSubmit: handleSubmitPhone,
    register: registerPhone,
    setValue: setValuePhone,
    formState: { errors: errorsPhone },
  } = useForm({
    resolver: phoneResolver,
    defaultValues: {
      phone: userConfig?.data?.owner_phone || undefined,
    },
  })

  const {
    handleSubmit: handleSubmitCPF,
    register: registerCPF,
    setValue: setValueCPF,
    formState: { errors: errorsCPF },
  } = useForm({
    resolver: cpfResolver,
    defaultValues: {
      cpf: userConfig?.data?.owner_cpf || undefined,
    },
  })

  const {
    handleSubmit: handleSubmitKey,
    register: registerKey,
    setValue: setValueKey,
    formState: { errors: errorsKey },
  } = useForm({
    resolver: apikeyResolver,
    defaultValues: {
      'api-key': userConfig?.data?.key || undefined,
    },
  })

  useEffect(() => {
    if (!isLoading && userConfig?.request.status === 200) {
      setValueEmail('email', userConfig?.data.owner_email)
      setValuePhone('phone', userConfig?.data.owner_phone)
      setValueCPF('cpf', userConfig?.data.owner_cpf)
      setValueTrade('trade-link', userConfig?.data.url_trade)
      setValueKey('api-key', userConfig?.data.key)
    }
  }, [
    userConfig,
    isLoading,
    setValueEmail,
    setValueCPF,
    setValuePhone,
    setValueTrade,
    setValueKey,
  ])

  const onSubmitPersonal = async (data: any) => {
    setEditTradeLink(false)
    if (data['trade-link'] !== '') {
      const response = await ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        url_trade: data['trade-link'],
      })

      if (response?.response?.status === 409) {
        Toast.Error('URL de Troca inválida.', 2000)
        setEditEmail(true)
      }
    }
  }

  const onSubmitEmail = async (data: any) => {
    setEditEmail(false)
    if (data.email !== '') {
      const response = await ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_email: data.email,
      })

      if (response?.response?.status === 409) {
        Toast.Error('Email já cadastrado no sistema.', 2000)
        setEditEmail(true)
      }
    }
  }

  const onSubmitPhone = async (data: any) => {
    setEditPhone(false)
    if (data.phone !== '') {
      const response = await ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_phone: data.phone,
      })

      if (response?.response?.status === 409) {
        Toast.Error('Telefone já cadastrado no sistema.', 2000)
        setEditPhone(true)
      }
    }
  }

  const onSubmitCPF = async (data: any) => {
    setEditCPF(false)
    if (data.cpf !== '') {
      const response = await ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_cpf: data.cpf,
      })

      if (response?.response?.status === 409) {
        Toast.Error('CPF já cadastrado no sistema.', 2000)
        setEditCPF(true)
      }
    }
  }

  const onSubmitKey = async (data: any) => {
    setEditKey(false)

    if (data['api-key'] !== '') {
      const response = await ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        key: data['api-key'],
      })

      if (response?.response?.status === 409) {
        Toast.Error('Chave da API inválida.', 2000)
        setEditKey(true)
      }
    }
  }

  const watchTradelink = watch('trade-link')

  return (
    <div className="flex w-2/3 flex-col gap-8">
      <div className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6">
        <div>
          <Common.Title bold={700} size={'2xl'} color="white">
            Informações Gerais
          </Common.Title>
          <span className="text-mesh-color-neutral-200">
            Aqui você encontra informações sobre a sua conta RentSkins.
            Recomendamos que você mantenha a sua URL de Troca e outras
            informações importantes atualizadas para não ter problema na hora da
            negociação.
          </span>
        </div>

        <Form.Root
          onSubmit={handleSubmit(onSubmitPersonal)}
          className="mt-8 flex flex-col gap-2"
        >
          <Common.Title size={'lg'} color="white" className="-mt-4 mb-2">
            URL de Troca
          </Common.Title>
          <div className="flex justify-between gap-4">
            <div className="flex w-full items-center">
              <Form.Input.Text
                name="trade-link"
                register={register('trade-link')}
                disabled={isLoading || !editTradeLink}
                errors={errors['trade-link']}
                placeholder={
                  isLoading
                    ? 'Verificando...'
                    : 'https://steamcommunity.com/tradeoffer/new/?partner=000000&token=abcdef'
                }
                labelClassName="w-full"
                className={`${
                  editTradeLink ? 'text-white' : 'text-mesh-color-neutral-200'
                } w-full rounded-md bg-mesh-color-neutral-600 py-2 pl-3 transition-all disabled:bg-transparent
                 ${watchTradelink !== '' ? 'pr-14' : 'pr-3'}
                ring-mesh-color-primary-1900 placeholder:text-mesh-color-neutral-300 focus:ring-2`}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />
              {!isLoading &&
                editTradeLink &&
                watchTradelink !== '' &&
                watchTradelink !== undefined && (
                  <Common.Button
                    className={`relative -ml-10 -mt-3 border-none`}
                    onClick={() => setValueTrade('trade-link', '')}
                  >
                    <IconClose />
                  </Common.Button>
                )}
            </div>
            <div className="-mt-3 flex w-3/12 items-center justify-end gap-4">
              <HoverCardInfo
                customTrigger={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url"
                    className="max-h-[40px] w-28 overflow-hidden text-ellipsis rounded-md border-none bg-mesh-color-primary-1200 px-2 py-2 text-center opacity-70 hover:opacity-100 disabled:opacity-70"
                  >
                    Obter URL
                  </a>
                }
              >
                Para iniciar o fluxo de transação, precisamos do seu link de
                trocas. Isso possibilitará que outros usuários iniciem
                negociações com você de maneira mais eficiente.
              </HoverCardInfo>
              {editTradeLink ? (
                <Form.Button
                  buttonStyle={undefined}
                  disabled={isLoading}
                  className="border-none bg-mesh-color-primary-1200 px-4 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Aplicar
                </Form.Button>
              ) : (
                <Common.Button
                  disabled={isLoading}
                  onClick={() => setEditTradeLink(true)}
                  className="border-none bg-mesh-color-primary-1200 px-5 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Editar
                </Common.Button>
              )}
            </div>
          </div>
        </Form.Root>

        <Form.Root
          onSubmit={handleSubmitKey(onSubmitKey)}
          className="mt-12 flex flex-col gap-2"
        >
          <Common.Title size={'lg'} color="white" className="-mt-4 mb-2">
            Chave da API
          </Common.Title>
          <div className="flex justify-between gap-4">
            <div className="flex w-full items-center gap-4">
              <Form.Input.Text
                name="api-key"
                register={registerKey('api-key')}
                disabled={isLoading || !editKey}
                errors={errorsKey['api-key']}
                maxLength={32}
                placeholder={
                  isLoading
                    ? 'Verificando...'
                    : 'A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5'
                }
                className={`${
                  editKey ? 'text-white' : 'text-mesh-color-neutral-200'
                } w-[390px] rounded-md bg-mesh-color-neutral-600 py-2 pl-3 ring-mesh-color-primary-1900 transition-all
                placeholder:text-mesh-color-neutral-300 focus:ring-2 disabled:bg-transparent`}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />
              <div className="relative -top-2">
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
            <div className="-mt-3 flex w-3/12 items-center justify-end gap-4">
              <HoverCardInfo
                customTrigger={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://steamcommunity.com/dev/apikey"
                    className="max-h-[40px] w-28 overflow-hidden text-ellipsis rounded-md border-none bg-mesh-color-primary-1200 px-2 py-2 text-center opacity-70 hover:opacity-100 disabled:opacity-70"
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
                      <span className="font-bold">2.</span> Copie a chave
                      fornecida.
                    </li>
                    <li>
                      <span className="font-bold">3.</span> Cole a chave
                      fornecida no campo &quot;Chave da API&quot; no formulário.
                    </li>
                  </ul>
                  <br />
                  <span className="text-justify text-sm italic">
                    Obs: Se você já possuir uma chave que não foi registrada por
                    você, recomendamos revoga-la por motivos de segurança.
                  </span>
                </div>
              </HoverCardInfo>

              {editKey ? (
                <Form.Button
                  buttonStyle={undefined}
                  disabled={isLoading}
                  className="border-none bg-mesh-color-primary-1200 px-4 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Aplicar
                </Form.Button>
              ) : (
                <Common.Button
                  disabled={isLoading}
                  onClick={() => setEditKey(true)}
                  className="border-none bg-mesh-color-primary-1200 px-5 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Editar
                </Common.Button>
              )}
            </div>
          </div>
        </Form.Root>

        <div className="mt-6 flex flex-col">
          <Common.Title size={'lg'} color="white">
            Link de Venda
          </Common.Title>
          <div className="flex items-center justify-between ">
            <span className="pl-3 text-mesh-color-neutral-200">
              {status === 'authenticated'
                ? `
              https://rentskins/?sellerid=${
                trueSession.user?.steam?.steamid! || 'ERROR'
              }
              `
                : 'Verificando...'}
            </span>
            <Common.Button
              disabled={status !== 'authenticated'}
              className=" border-none bg-mesh-color-primary-1200 px-3 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://rentskins/?sellerid=${trueSession.user?.steam
                    ?.steamid!}`,
                )
                Toast.Success('Link copiado para a área de transferência.')
              }}
            >
              Copiar Link
            </Common.Button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6">
        <Form.Root onSubmit={handleSubmitEmail(onSubmitEmail)}>
          <Common.Title bold={700} size={'2xl'} color="white">
            Informações de Contato
          </Common.Title>
          <div className="mt-8 flex flex-col items-start justify-center">
            <Common.Title size={'lg'} color="white" className="-mt-4 mb-4">
              Email
            </Common.Title>
            <div className="flex w-full items-center justify-between">
              <Form.Input.Text
                labelClassName="w-7/12 text-white mb-4"
                placeholder={isLoading ? 'Verificando...' : 'exemplo@email.com'}
                name="email"
                disabled={isLoading || !editEmail}
                register={registerEmail('email')}
                className={`${
                  editEmail ? 'text-white' : 'text-mesh-color-neutral-200'
                } rounded-md bg-mesh-color-neutral-600 px-3 py-2
            ring-mesh-color-primary-1900 transition-all placeholder:text-mesh-color-neutral-300 focus:ring-2 disabled:bg-transparent`}
                errors={errorsEmail.email}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />

              <div className="flex w-1/12 justify-end">
                {editEmail ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Salvar
                  </Form.Button>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => setEditEmail(true)}
                    className="-mt-8 rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          </div>
        </Form.Root>
        <Form.Root onSubmit={handleSubmitPhone(onSubmitPhone)}>
          <div className="mt-8 flex flex-col items-start justify-center">
            <Common.Title size={'lg'} color="white" className="-mt-4 mb-4">
              Telefone
            </Common.Title>
            <div className="flex w-full items-center justify-between">
              <Form.Input.Phone
                labelClassName="w-7/12 text-white mb-4"
                placeholder={isLoading ? 'Verificando...' : '(00) 00000-0000'}
                disabled={isLoading || !editPhone}
                name="phone"
                register={registerPhone('phone')}
                inputClassName={`${
                  editPhone ? 'text-white' : 'text-mesh-color-neutral-200'
                } rounded-md bg-mesh-color-neutral-600 px-3 py-2 disabled:bg-transparent
              transition-all ring-mesh-color-primary-1900 placeholder:text-mesh-color-neutral-300 focus:ring-2`}
                errors={errorsPhone.phone}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />
              <div className="flex w-1/12 justify-end">
                {editPhone ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Salvar
                  </Form.Button>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => setEditPhone(true)}
                    className="-mt-8 rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          </div>
        </Form.Root>
        <Form.Root onSubmit={handleSubmitCPF(onSubmitCPF)}>
          <div className="mt-8 flex flex-col items-start justify-center">
            <Common.Title size={'lg'} color="white" className="-mt-4 mb-4">
              CPF
            </Common.Title>
            <div className="flex w-full items-center justify-between">
              <Form.Input.CPF
                labelClassName="w-7/12 text-white mb-4"
                placeholder={isLoading ? 'Verificando...' : '000.000.000-00'}
                disabled={isLoading || !editCPF}
                name="cpf"
                register={registerCPF('cpf')}
                inputClassName={`${
                  editCPF ? 'text-white' : 'text-mesh-color-neutral-200'
                } rounded-md bg-mesh-color-neutral-600 px-3 py-2 disabled:bg-transparent
                transition-all ring-mesh-color-primary-1900 placeholder:text-mesh-color-neutral-300 focus:ring-2`}
                errors={errorsCPF.cpf}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />
              <div className="flex w-1/12 justify-end">
                {editCPF ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Salvar
                  </Form.Button>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => setEditCPF(true)}
                    className={`${
                      !isLoading &&
                      userConfig?.data?.owner_cpf !== '' &&
                      userConfig?.data?.owner_cpf !== undefined
                        ? 'hidden opacity-0'
                        : 'visible opacity-100'
                    } -mt-8 rounded-md border-none bg-mesh-color-primary-1200 px-4 py-2 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70`}
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          </div>
        </Form.Root>
      </div>
    </div>
  )
}
