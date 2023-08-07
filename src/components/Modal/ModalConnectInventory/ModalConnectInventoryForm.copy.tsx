import Common from '@/components/Common'
import { IconClose } from '@/components/Icons'
import ConfigService from '@/services/config.service'
import useUserStore from '@/stores/user.store'
import { RegisterConfigResolve } from '@/validation/RegisterConfig'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export function ModalConnectInventoryForm() {
  const {
    user: { steamid, username },
  } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: RegisterConfigResolve,
  })

  async function create(
    email: string,
    linkTrade: string,
    agreedEmails: boolean,
    agreedTerms: boolean,
  ) {
    try {
      const urlSell = `https://rentskins/?sellerid=${steamid}`
      const created = await ConfigService.createConfig({
        owner_id: steamid as string,
        owner_name: username,
        owner_email: email,
        steam_guard: false,
        url_sell: urlSell,
        url_trade: linkTrade,
        agreed_with_emails: agreedEmails,
        agreed_with_terms: agreedTerms,
      })
      return created
    } catch (error) {
      console.log(error)
      toast.error('Erro!')
    }
  }

  async function onSubmit(data: {
    email: string
    linkTrade: string
    promo: boolean | undefined
    termos: boolean | undefined
  }) {
    const { email, linkTrade, promo, termos } = data

    if (steamid) {
      await create(email, linkTrade, promo!, termos!)
      toast.success('Configuração criada')
      window.location.reload()
    } else {
      toast.error('Você precisa está logado !')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-11/12 items-start justify-between"
    >
      <div className="flex h-full w-full flex-col gap-7">
        <div className="w-full space-y-2">
          {/* CHANGE COLOR */}
          <Common.Title
            bold={500}
            size="lg"
            className="mt-6 text-mesh-color-neutral-200"
          >
            Insira URL Trade Link do seu Perfil
          </Common.Title>
          <div className="flex w-full items-center justify-between">
            <div className="relative w-10/12 rounded-[4px] bg-[#3C403C]">
              <input
                className="h-[42px] w-full rounded-[4px] bg-[#3C403C] pl-4 pr-12 text-base text-mesh-color-neutral-100 outline-none placeholder:text-mesh-color-neutral-100 placeholder:opacity-40"
                autoComplete="off"
                tabIndex={0}
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
                {...register('linkTrade')}
              />

              <Common.Button
                tabIndex={-1}
                className="absolute right-0 top-1/2 mr-4 h-5 w-5 -translate-y-1/2 border-none"
              >
                <IconClose />
              </Common.Button>
            </div>

            <Common.Button
              tabIndex={-1}
              className="border-none text-mesh-color-primary-1400"
            >
              Obter URL
            </Common.Button>
          </div>
          <p className="text-xs text-red-700">
            {errors.linkTrade && errors.linkTrade.message}
          </p>
        </div>
        <div className="mt-[-12px] space-y-2">
          <Common.Title
            bold={500}
            size="lg"
            className="text-mesh-color-neutral-200"
          >
            Seu email de contato
          </Common.Title>

          <input
            type="email"
            autoComplete="off"
            placeholder="example@email.com"
            tabIndex={0}
            className="h-[42px] w-[40%] rounded-[4px] bg-mesh-color-neutral-500 px-4 text-base text-mesh-color-neutral-100 outline-none placeholder:text-mesh-color-neutral-100 placeholder:opacity-40"
            {...register('email')}
          />
          <p className="text-xs text-red-700">
            {errors.email && errors.email.message}
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-white">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('promo')}
              className="h-5 w-5 rounded-[4px] border border-mesh-color-neutral-200 px-0 checked:bg-[#B7E03E] focus:border-mesh-color-primary-1200"
            />
            <label htmlFor="" className="ml-2 text-[#A7B0A0]">
              Deseja receber promoções em seu email?
            </label>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded-[4px] border border-mesh-color-neutral-200 px-0 checked:bg-[#B7E03E] focus:border-mesh-color-primary-1200"
                {...register('termos')}
              />
              <label htmlFor="" className="ml-2 text-[#A7B0A0]">
                Eu concordo com os{' '}
                <span className="text-[#B7E03E]">
                  Termos de Serviço, Política de Privacidade e Política de
                  Reembolso da RentSkins.
                </span>
              </label>
            </div>

            <p className="mt-2 text-xs text-red-700">
              {errors.termos && errors.termos.message}
            </p>
          </div>
        </div>
        <Common.Button
          color="gray"
          type="submit"
          className="h-11 w-[40%] border-none bg-[#3C403C] font-bold text-[#979797]"
        >
          Concluir
        </Common.Button>
      </div>
    </form>
  )
}
