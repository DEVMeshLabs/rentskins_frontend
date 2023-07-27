'use client'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconClose } from '@/components/Icons'
import { useForm } from 'react-hook-form'
import { formResolver as contactResolver } from './schemas/information.contact.schema'
import { formResolver as personalResolver } from './schemas/information.personal.schema'

export function PageSettingsInformation() {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: personalResolver,
    defaultValues: {
      'trade-link': undefined,
    },
  })

  const {
    handleSubmit: handleSubmit2,
    register: register2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: contactResolver,
    defaultValues: {
      email: undefined,
      phone: undefined,
    },
  })

  const onSubmitPersonal = (data: any) => {
    console.log(data)
  }

  const onSubmitContact = (data: any) => {
    console.log(data)
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
          <Common.Title size={'lg'} color="white" className="-mt-4 mb-4">
            URL de Troca
          </Common.Title>
          <div className="flex gap-4">
            <div className="flex w-full items-center">
              <Form.Input.Text
                name="trade-link"
                register={register('trade-link')}
                errors={errors['trade-link']}
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
                labelClassName="w-full"
                className={`w-full rounded-md bg-mesh-color-neutral-600 py-2 pl-3
                transition-all ${
                  watchTradelink !== '' ? 'pr-14' : 'pr-3'
                } text-white
                ring-mesh-color-primary-1900 placeholder:text-mesh-color-neutral-300 focus:ring-2`}
                errorsClassname="text-red-500 text-sm mt-8 absolute"
              />
              {watchTradelink !== '' && (
                <Common.Button
                  className={`relative -ml-10 -mt-3 border-none`}
                  onClick={() => setValue('trade-link', '')}
                >
                  <IconClose />
                </Common.Button>
              )}
            </div>
            <div className="-mt-3 flex w-3/12 items-center justify-evenly">
              <Common.Button className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100">
                Obter URL
              </Common.Button>
              <Form.Button
                buttonStyle={undefined}
                className="border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100"
              >
                Aplicar
              </Form.Button>
            </div>
          </div>
        </Form.Root>

        <div className="mb-6 mt-8 h-[1px] w-full bg-mesh-color-neutral-200" />

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
      <Form.Root
        onSubmit={handleSubmit2(onSubmitContact)}
        className="rounded-2xl bg-mesh-color-neutral-800 px-4 py-6"
      >
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
              placeholder="exemplo@email.com"
              name="email"
              register={register2('email')}
              className={`rounded-md bg-mesh-color-neutral-600 px-3 py-2
            transition-all`}
              errors={errors2.email}
              errorsClassname="text-red-500 text-sm mt-8 absolute"
            />

            <div className="flex w-3/12 justify-evenly">
              <Form.Button
                buttonStyle={undefined}
                onSubmit={handleSubmit2(onSubmitContact)}
                className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100"
              >
                Editar
              </Form.Button>
              <Common.Button
                tabIndex={-1}
                className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100"
              >
                Copiar Link
              </Common.Button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-center">
          <Common.Title size={'lg'} color="white" className="-mt-4 mb-4">
            Telefone
          </Common.Title>
          <div className="flex w-full items-center justify-between">
            <Form.Input.Phone
              labelClassName="w-7/12 text-white mb-4"
              placeholder="(00) 00000-0000"
              name="email"
              register={register2('phone')}
              inputClassName={`rounded-md bg-mesh-color-neutral-600 px-3 py-2
              transition-all`}
              errors={errors2.phone}
              errorsClassname="text-red-500 text-sm mt-8 absolute"
            />
            <div className="flex w-3/12 justify-evenly">
              <Form.Button
                buttonStyle={undefined}
                onSubmit={handleSubmit2(onSubmitContact)}
                className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100"
              >
                Editar
              </Form.Button>
              <Common.Button
                tabIndex={-1}
                className="-mt-8 border-none text-mesh-color-primary-1200 opacity-70 hover:opacity-100"
              >
                Copiar Link
              </Common.Button>
            </div>
          </div>
        </div>
      </Form.Root>
    </div>
  )
}
