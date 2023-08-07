import Mastercard from '@/../public/payment/mastercard.png'
import PIX from '@/../public/payment/pix.png'
import Ticket from '@/../public/payment/ticket.png'
import Common from '@/components/Common'
import Form from '@/components/Forms'
import { IconClose } from '@/components/Icons/IconClose'
import { IconMoneyBag } from '@/components/Icons/IconMoneyBag'
import { LayoutLoading } from '@/components/Layout/LayoutLoading'
import usePaymentStore from '@/stores/payment.store'
import URLQuery from '@/tools/urlquery.tool'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ModalPaymentAdd() {
  const router = useRouter()
  const { paymentAdd, setPaymentAdd } = usePaymentStore()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState(5)
  const [selectedMethod, setSelectedMethod] = useState('mastercard')

  // const handleMethodChange = (event: any) => {
  //   setPaymentAdd({ method: event.target.value, value: paymentAdd.value })
  // }

  // const handleValueChange = (event: any) => {
  //   setPaymentAdd({
  //     method: paymentAdd.method,
  //     value: Number(event.target.value),
  //   })
  // }

  useEffect(() => {
    setPaymentAdd({ ...paymentAdd, method: 'mastercard' })
  }, [])

  const handleOnDeposit = () => {
    setIsLoading(true)

    if (selectedValue !== undefined) {
      if (Number(selectedValue) > 0) {
        setPaymentAdd({ ...paymentAdd, value: Number(selectedValue) })
      }
    }

    router.push(`/pagamento/recarregar/${paymentAdd.method}`)
  }

  return (
    <Dialog.Content
      className="fixed left-1/2 top-1/2 z-30 h-3/5 w-2/3 -translate-x-1/2 -translate-y-1/2
rounded-2xl bg-mesh-color-neutral-700"
    >
      <div className="flex h-full w-full">
        <div className="h-full w-1/4 rounded-l-2xl bg-mesh-color-others-eerie-black px-6 pt-6">
          <Common.Title
            bold={400}
            size="xl"
            color="white"
            className="leading-none"
          >
            Selecione a forma de pagamento
          </Common.Title>

          <Form.Input.Radio.Block
            state={selectedMethod}
            setState={setSelectedMethod}
            name="payment-add-method"
            labelClassname="h-24"
            containerClassname="mt-8 grid grid-cols-2 gap-2"
            imageClassname="w-20"
            options={[
              { label: Mastercard, value: 'mastercard', labelType: 'image' },
              { label: PIX, value: 'pix', labelType: 'image' },
              { label: Ticket, value: 'ticket', labelType: 'image' },
            ]}
          />
        </div>
        <LayoutLoading label="Processando..." enabled={isLoading}>
          <div className="flex h-full w-3/4 flex-col items-center justify-start">
            <div className=" mt-6 flex w-11/12 items-center justify-between">
              <Dialog.Title>
                <Common.Title bold={800} size="2xl" color="white">
                  Adicione Créditos
                </Common.Title>
              </Dialog.Title>
              <Dialog.Close
                asChild
                onClick={() =>
                  router.push(URLQuery.removeQuery(['modalopen', 'modaltype']))
                }
              >
                <Common.Button className="border-transparent">
                  <IconClose />
                </Common.Button>
              </Dialog.Close>
            </div>
            <div className="mt-3 flex h-full w-full flex-col justify-between">
              <div className="flex h-min w-full justify-around">
                <div className="flex w-1/2 flex-col">
                  <label className="flex w-full flex-col text-mesh-color-neutral-200">
                    Valor do Pagamento
                    <div className="-mt-8 w-full">
                      <span
                        className={`relative left-3 top-1/2 text-lg font-semibold transition-all ${
                          selectedValue !== undefined ? '' : 'text-transparent'
                        }`}
                      >
                        R$
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={Number(selectedValue)?.toFixed(2)}
                        onChange={(event) =>
                          setSelectedValue(Number(event.target.value))
                        }
                        className={`my-2 w-full rounded-md bg-mesh-color-neutral-500
                        px-3 py-4 outline-mesh-color-primary-600 transition-all ${
                          selectedValue !== undefined ? 'pl-10' : 'pl-4'
                        } text-white
                        placeholder:text-mesh-color-neutral-100 focus:placeholder:text-transparent`}
                        placeholder="R$ 0,00"
                      />
                    </div>
                  </label>
                  <Form.Input.Radio.Block
                    state={selectedValue}
                    setState={setSelectedValue}
                    name="payment-add-value"
                    labelClassname="h-16"
                    containerClassname="mt-8 grid grid-cols-2 gap-2"
                    imageClassname="w-20"
                    options={[
                      { label: 'R$ 5,00', value: 5, labelType: 'string' },
                      { label: 'R$ 10,00', value: 10, labelType: 'string' },
                      { label: 'R$ 25,00', value: 25, labelType: 'string' },
                      { label: 'R$ 50,00', value: 50, labelType: 'string' },
                      { label: 'R$ 100,00', value: 100, labelType: 'string' },
                      { label: 'R$ 200,00', value: 200, labelType: 'string' },
                      { label: 'R$ 500,00', value: 500, labelType: 'string' },
                      {
                        label: 'R$ 1.000,00',
                        value: 1000,
                        labelType: 'string',
                      },
                    ]}
                  />
                </div>
                <div className="w-1/3 self-center">
                  <IconMoneyBag />
                </div>
              </div>
              <div className="mb-8 flex w-11/12 items-center justify-between self-center">
                <span className="leading text-white">
                  Ao prosseguir para finalizar o pagamento, você concorda com os
                  nossos{' '}
                  <a
                    href=""
                    target="_blank"
                    className="hover:text-inherit/50 text-mesh-color-primary-1000"
                  >
                    Termos de Serviço
                  </a>
                  ,{' '}
                  <a
                    href=""
                    target="_blank"
                    className="text-mesh-color-primary-1000"
                  >
                    Política de Privacidade
                  </a>
                  ,{' '}
                  <a
                    href=""
                    target="_blank"
                    className="text-mesh-color-primary-1000"
                  >
                    Política de Reembolso
                  </a>
                  .
                </span>
                <Common.Button
                  onClick={() => handleOnDeposit()}
                  disabled={Number(selectedValue) <= 0}
                  className="h-16 w-1/2 border-transparent bg-mesh-color-primary-1200 text-xl font-extrabold transition-all disabled:bg-mesh-color-neutral-500 disabled:text-mesh-color-neutral-400"
                >
                  Depositar
                </Common.Button>
              </div>
            </div>
          </div>
        </LayoutLoading>
      </div>
    </Dialog.Content>
  )
}
