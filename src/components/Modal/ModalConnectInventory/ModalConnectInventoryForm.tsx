import Common from '@/components/Common'
import Form from '@/components/Forms'
import ConfigService from '@/services/config.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

export function ModalConnectInventoryForm() {
  const [formURL, setFormURL] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPromotions, setFormPromotions] = useState(false)
  const [formTerms, setFormTerms] = useState(false)

  const [formSubmit, setFormSubmit] = useState(false)

  const {
    user: { steamid, username },
  } = useUserStore()

  useQuery({
    queryKey: ['ConfigService.createConfig'],
    queryFn: () => {
      const sellLink = `https://rentskins/?sellerid=${steamid}`
      const params = {
        owner_id: steamid,
        owner_name: username,
        owner_email: formEmail,
        steam_guard: false,
        url_sell: sellLink,
        url_trade: formURL,
        agreed_with_emails: formPromotions,
        agreed_with_terms: true,
      }
      ConfigService.createConfig(params)
      return window.location.reload()
    },
    enabled: !!steamid && !!formSubmit,
  })

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSubmit(true)
  }

  const handleButtonDisabled = !(
    formEmail.includes('@') &&
    // formURL.includes('https://steamcommunity.com') &&
    formURL.includes('') &&
    formTerms
  )

  const handleButtonGetTradeLink = () => {
    if (steamid) {
      window.location.assign(
        `https://steamcommunity.com/id/${steamid}/tradeoffers/privacy`,
      )
    }
  }

  return (
    <Form.Root
      onSubmit={handleFormSubmit}
      className="mt-6 flex h-full w-11/12 flex-col items-start justify-between gap-4"
    >
      <div className="w-full">
        <label
          className="w-full text-lg text-mesh-color-neutral-200"
          htmlFor="trade-link"
        >
          <text> Insira URL Trade Link do seu Perfil </text>
        </label>
        <div className="flex w-full items-center justify-between">
          <Form.Input.Text
            state={formURL}
            setState={setFormURL}
            placeholder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
            autoComplete="off"
            labelClassName="w-10/12"
            inputClassName="bg-mesh-color-neutral-500 py-2 px-4 rounded-md text-white border border-mesh-color-neutral-500 focus:border-mesh-color-primary-1200"
            id="trade-link"
            required
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

      <Form.Input.Email
        state={formEmail}
        setState={setFormEmail}
        placeholder="email@example.com"
        autoComplete="off"
        label="Seu email de contato"
        labelClassName="w-5/12 text-lg text-mesh-color-neutral-200"
        inputClassName="bg-mesh-color-neutral-500 py-2 px-4 rounded-md text-white border border-mesh-color-neutral-500 focus:border-mesh-color-primary-1200"
        required
      />

      <div className="mt-4 flex flex-col gap-2">
        <Form.Input.Checkbox
          checked={formPromotions}
          onClick={() => setFormPromotions((state) => !state)}
          label="Deseja receber promoções em seu email?"
          checkClassname="ml-[0.2rem]"
          labelClassName="text-sm text-mesh-color-neutral-200"
          inputClassName="focus:border-mesh-color-primary-800 bg-transparent border-2 border-mesh-color-neutral-500 checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
        />

        <Form.Input.Checkbox
          checked={formTerms}
          onClick={() => setFormTerms((state) => !state)}
          label={
            <text>
              Eu concordo com os{' '}
              <a
                href=""
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Termos de Serviço
              </a>
              ,{' '}
              <a
                href=""
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Privacidade
              </a>{' '}
              e{' '}
              <a
                href=""
                target="_blank"
                className="font-semibold text-mesh-color-primary-1200 opacity-70 transition-all hover:opacity-100"
              >
                Política de Reembolso
              </a>{' '}
              da RentSkins.
            </text>
          }
          checkClassname="ml-[0.2rem]"
          labelClassName="text-sm text-mesh-color-neutral-200"
          inputClassName="focus:border-mesh-color-primary-800 bg-transparent border-2 border-mesh-color-neutral-500 checked:border-mesh-color-primary-1200 h-6 w-6 rounded-md transition-all"
        />
      </div>

      <Common.Button
        disabled={handleButtonDisabled}
        type="submit"
        className="mt-8 border-none bg-mesh-color-primary-1200 px-20 py-2 text-lg font-bold text-mesh-color-others-black transition-all disabled:bg-mesh-color-neutral-400 disabled:text-mesh-color-neutral-100"
        required
      >
        Concluir
      </Common.Button>
    </Form.Root>
  )
}
