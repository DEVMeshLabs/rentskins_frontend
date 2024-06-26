'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconClose } from '@/components/Icons'
import ISteamUser from '@/interfaces/steam.interface'
import ConfigService from '@/services/config.service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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

  useEffect(() => {
    if (!isLoading && userConfig?.request.status === 200) {
      setValueEmail('email', userConfig?.data.owner_email)
      setValuePhone('phone', userConfig?.data.owner_phone)
      setValueCPF('cpf', userConfig?.data.owner_cpf)
      setValueTrade('trade-link', userConfig?.data.url_trade)
    }
  }, [
    userConfig,
    isLoading,
    setValueEmail,
    setValueCPF,
    setValuePhone,
    setValueTrade,
  ])

  const onSubmitPersonal = (data: any) => {
    setEditTradeLink(false)
    ConfigService.updateConfig({
      token: trueSession.user?.token!,
      owner_id: trueSession.user?.steam?.steamid!,
      url_trade: data['trade-link'],
    })
  }

  const onSubmitEmail = (data: any) => {
    setEditEmail(false)
    if (data.email !== '') {
      ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_email: data.email,
      })
    }
  }

  const onSubmitPhone = (data: any) => {
    setEditPhone(false)
    if (data.phone !== '') {
      ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_phone: data.phone,
      })
    }
  }

  const onSubmitCPF = (data: any) => {
    setEditCPF(false)
    if (data.cpf !== '') {
      ConfigService.updateConfig({
        token: trueSession.user?.token!,
        owner_id: trueSession.user?.steam?.steamid!,
        owner_cpf: data.cpf,
      })
    }
  }

  const watchTradelink = watch('trade-link')

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

        <Form.Root
          onSubmit={handleSubmit(onSubmitPersonal)}
          className="mt-8 flex flex-col gap-2"
        >
          <Common.Title size={'lg'} color="white" className="-mt-4 mb-2">
            URL de Troca
          </Common.Title>
          <div className="flex gap-4">
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
            <div className="-mt-3 flex w-3/12 items-center justify-evenly">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://steamcommunity.com/my/tradeoffers/privacy"
                className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:opacity-70"
              >
                Obter URL
              </a>
              {editTradeLink ? (
                <Form.Button
                  buttonStyle={undefined}
                  disabled={isLoading}
                  className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Aplicar
                </Form.Button>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={() => setEditTradeLink(true)}
                  className="border-none px-2 text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        </Form.Root>

        <div className="mb-6 mt-8 h-[1px] w-full bg-mesh-color-neutral-200" />

        <div className="flex flex-col">
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
              className="mr-[1.5%] border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://rentskins/?sellerid=${trueSession.user?.steam
                    ?.steamid!}` || 'Problema ao copiar o link...',
                )
              }
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

              <div className="flex w-1/12">
                {editEmail ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Salvar
                  </Form.Button>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => setEditEmail(true)}
                    className="-mt-8 border-none px-2 text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
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
              <div className="flex w-1/12">
                {editPhone ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
                  >
                    Salvar
                  </Form.Button>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => setEditPhone(true)}
                    className="-mt-8 border-none px-2 text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
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
              <div className="flex w-1/12">
                {editCPF ? (
                  <Form.Button
                    buttonStyle={undefined}
                    disabled={isLoading}
                    className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70"
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
                    } -mt-8 border-none px-2 text-mesh-color-primary-1200 opacity-70 hover:opacity-100 disabled:text-mesh-color-primary-1900 disabled:opacity-70`}
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
