'use client'
import { CommonSteamButton } from '@/components/Common/CommonSteamButton'
import Form from '@/components/Forms'
import {
  IconDevolution,
  IconMagnifyingGlass,
  IconPhone,
  IconShield,
} from '@/components/Icons'
import { HeroInformation } from '@/components/Others/HeroInformation'
import AllSkins from '@/components/Others/Skins/AllSkins'
import AllSkeletonSkins from '@/components/Skins/AllSkeletonSkins'
import SkinService from '@/services/skin.service'
import SteamService from '@/services/steam.service'
import useUserStore from '@/stores/user.store'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { homeFormResolver } from './form.schema'

export default function Home() {
  const [form, setForm] = useState('')

  const { user } = useUserStore()

  const { data, isLoading } = useQuery({
    queryKey: ['allSkins'],
    queryFn: () => SkinService.findByAll(),
  })

  const handleOnSteam = () => {
    SteamService.redirect()
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: homeFormResolver })

  return (
    <main className="h-full">
      <div className="h-screen">
        <div className="flex h-4/6 flex-col items-center justify-center bg-mesh-image-hero bg-cover bg-center bg-no-repeat">
          <div className="flex flex-col items-center space-y-8 text-center text-white">
            <p className="max-w-2xl text-[3.5rem] font-bold leading-none">
              <span>
                Descubra o mundo das skins{' '}
                <strong className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent">
                  CS:GO
                </strong>
              </span>
            </p>
            <p className="max-w-3xl text-2xl">
              Personalize seu arsenal com as skins mais incríveis, encontrando
              as skins perfeitas para dominar o jogo!
            </p>
            {!user.steamid && (
              <CommonSteamButton onClick={() => handleOnSteam()} />
            )}
          </div>
        </div>
        <div className="h-1/5 w-full bg-mesh-color-neutral-800">
          <hr className="-mt-0.5 h-2 w-full bg-mesh-gradient-green-pattern" />

          <div className="flex h-full items-center justify-center">
            <HeroInformation icon={<IconShield />} title="Pagamento seguro">
              Realize seus pagamentos com tranquilidade!
            </HeroInformation>

            <HeroInformation icon={<IconPhone />} title="Suporte rápido">
              Tem alguma dúvida? Entre em contato conosco!
            </HeroInformation>

            <HeroInformation
              icon={<IconMagnifyingGlass />}
              title="Ampla transparência"
            >
              Priorizamos a transparência em todas as informações.
            </HeroInformation>

            <HeroInformation
              icon={<IconDevolution />}
              title="Política de devolução"
            >
              Facilitamos a devolução ou troca, de acordo com nossos termos.
            </HeroInformation>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-28 flex w-4/5">
        {isLoading ? (
          <AllSkeletonSkins quantitySkeletons={20} />
        ) : (
          <AllSkins skinsCategories={data?.data} itemsPerPage={15} />
        )}
      </div>
      <Form.Root
        className="w-1/4 text-white"
        onSubmit={handleSubmit((data) => setForm(JSON.stringify(data)))}
      >
        <Form.Input.CPF
          name="cpf"
          placeholder="CPF"
          register={register('cpf')}
          errors={errors.cpf}
        />
        <Form.Input.Card
          name="card"
          placeholder="Card"
          register={register('card')}
          errors={errors}
        />
        <Form.Input.Checkbox
          name="checkbox"
          label="TESTEEEEEEEE"
          placeholder="Checkbox"
          register={register('checkbox')}
          errors={errors.checkbox}
        />
        <Form.Input.Currency
          name="currency"
          placeHolder="Currency"
          register={register('currency')}
          errors={errors.currency}
          control={control}
        />
        <Form.Input.Date
          name="date"
          placeholder="Date"
          register={register('date')}
          errors={errors.date}
        />
        <Form.Input.Email
          name="email"
          placeholder="Email"
          register={register('email')}
          errors={errors.email}
        />
        <Form.Input.MonthYear
          name="monthyear"
          placeholder="Month/Year"
          register={register('monthyear')}
          errors={errors.monthyear}
        />
        <Form.Input.Number
          name="number"
          placeholder="Number"
          register={register('number')}
          errors={errors.number}
        />
        <Form.Input.Phone
          name="phone"
          placeholder="Phone"
          register={register('phone')}
          errors={errors.phone}
        />
        <Form.Input.PostalCode
          name="postalcode"
          placeholder="Postal Code"
          register={register('postalcode')}
          errors={errors.postalcode}
        />
        <Form.Input.Text
          name="texts"
          placeholder="Text"
          register={register('texts')}
          errors={errors.texts}
        />
        <Form.Button buttonStyle="full"> Completar </Form.Button>
        {form}
      </Form.Root>
    </main>
  )
}
