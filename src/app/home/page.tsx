import {
  IconDevolution,
  IconMagnifyingGlass,
  IconPhone,
  IconShield,
} from '@/components/Icons'
import { HeroInformation } from '@/components/Others/HeroInformation'
import PageHomeHero from '@/components/Pages/PageHome/PageHomeHero'
import PageHomeSkins from '@/components/Pages/PageHome/PageHomeSkins'
import Head from 'next/head'

export default function Home() {
  return (
    <main className="h-full">
      <Head>
        <title>Teste</title>
      </Head>
      <div className="h-screen">
        <div className="flex h-4/6 flex-col items-center justify-center bg-mesh-image-hero bg-cover bg-center bg-no-repeat">
          <PageHomeHero />
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
        <PageHomeSkins />
      </div>
    </main>
  )
}
