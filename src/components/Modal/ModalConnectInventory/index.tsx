import React, { useState } from 'react'
import { createConfig } from '@/services/Configuracao.service'
import { shortenUrl } from '@/utils/bitli'
// ----------------- LIBS ----------------
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'
// ----------------- COMPONENTS ----------------
import { IconClose } from '@/components/Icons/IconClose'
import { Title } from '@/components/Title'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import Checked from '@/components/Checked'

interface IProps {
  activator: React.ReactNode
}

export function ModalConnectInventario({ activator }: IProps) {
  const [linkTrade, setLinkTrade] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false)
  const [agreedEmails, setAgreedEmails] = useState<boolean>(false)

  async function onSubmit() {
    try {
      const user = localStorage.getItem('user')
      if (user) {
        const findUser = JSON.parse(user)
        const urlTrade = await shortenUrl(linkTrade)
        const urlSell = `https://rentskins/?sellerid=${findUser.steamid}`

        if (!urlTrade) {
          toast.error('LinkTrade invalid')
          return
        }

        const create = await createConfig({
          owner_id: findUser.steamid,
          owner_name: findUser.username,
          owner_email: email,
          steam_guard: false,
          url_sell: urlSell,
          url_trade: linkTrade,
          agreed_with_emails: agreedEmails,
          agreed_with_terms: agreedTerms,
        })
        toast.success('Created Successfully')
        return create
      }
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado !!')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{activator}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/70" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2
        rounded-2xl bg-mesh-color-neutral-700"
        >
          <div className="flex h-full w-full flex-col items-center justify-between py-8">
            {/* TOP */}
            <div className="flex w-11/12 items-center justify-between">
              <Dialog.Title>
                <Title bold={800} size="2xl" color="white">
                  Conectar Inventário à Steam
                </Title>
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button className="border-none">
                  <IconClose />
                </Button>
              </Dialog.Close>
            </div>
            {/* MIDDLE */}
            <form
              onSubmit={onSubmit}
              className="flex h-full w-11/12 items-start justify-between"
            >
              <div className="flex h-full w-11/12 flex-col gap-7 ">
                <div className=" space-y-2">
                  {/* CHANGE COLOR */}
                  <Title
                    bold={500}
                    size="lg"
                    className="mt-6 text-mesh-color-neutral-200"
                  >
                    Insira URL Trade Link do seu Perfil
                  </Title>
                  <div className="flex w-full items-center justify-between">
                    <div className="relative w-10/12 rounded-lg bg-mesh-color-neutral-500">
                      <Input
                        className="w-10/12  bg-mesh-color-neutral-500 text-base text-mesh-color-neutral-100 placeholder:text-mesh-color-neutral-100"
                        placeHolder="https://steamcommunity.com/tradeoffer/new/?partner=240416830&token=vzAomQ5n"
                        value={linkTrade}
                        onChange={(event) => setLinkTrade(event.target.value)}
                      />
                      <Button
                        className="absolute right-0 top-1/2 mr-4 h-5 w-5 -translate-y-1/2 border-none"
                        onClick={() => setLinkTrade('')}
                      >
                        <IconClose />
                      </Button>
                    </div>

                    <Button className="border-none text-mesh-color-primary-1400">
                      Obter URL
                    </Button>
                  </div>
                </div>
                <div className="mt-[-12px] space-y-2">
                  {/* CHANGE COLOR */}
                  <Title
                    bold={500}
                    size="lg"
                    className="text-mesh-color-neutral-200"
                  >
                    Seu email de contato
                  </Title>

                  <Input
                    className="w-1/3 rounded-lg bg-mesh-color-neutral-500 text-base text-mesh-color-neutral-100 placeholder:text-mesh-color-neutral-100"
                    placeHolder="SeuEmail@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2 text-white">
                  <Checked
                    label="Deseja receber promoções em seu email?"
                    checked={agreedEmails}
                    onChange={(event: any) =>
                      setAgreedEmails(event.target.checked)
                    }
                  />

                  <Checked
                    label="Eu concordo com os"
                    label2="Termos de Serviço, Política de Privacidade e Política de Reembolso da RentSkins."
                    checked={agreedTerms}
                    onChange={(event: any) =>
                      setAgreedTerms(event.target.checked)
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="h-11 w-1/4 bg-mesh-color-primary-1400 font-bold text-mesh-color-neutral-300"
                >
                  Concluir
                </Button>
              </div>
            </form>
            {/* DIVISOR */}
            <div />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
