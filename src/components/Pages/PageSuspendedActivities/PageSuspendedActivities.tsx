'use client'
import Common from '@/components/Common'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

interface IProps {
  session: Session
}

export default function PageSuspendedActivities({ session }: IProps) {
  const email = 'contato@RentSkins.com.br'
  const subject = 'Suspensão da Conta'
  const body = `Prezado(a)%20Time%20de%20Suporte,%0A%0AEu%20gostaria%20de%20entrar%20em%20contato%20para%20discutir%20o%20seguinte:%0A%0A[Insira%20sua%20mensagem%20aqui]%0A%0AAtenciosamente,%0A${session.user?.name}`

  return (
    <>
      <div className="flex flex-col items-center">
        <Common.Title
          bold={900}
          size="3xl"
          className="bg-mesh-gradient-green-pattern bg-clip-text text-transparent"
        >
          OOPS
        </Common.Title>
        <Common.Title bold={600} size="xl" className="text-white">
          As atividades da sua conta foram suspensas.
        </Common.Title>
      </div>
      <div className="w-1/3 py-4 text-white">
        <p>
          Prezado(a){' '}
          <b className="text-mesh-color-primary-1200">
            {session.user?.name || 'Usuário'}
          </b>
          ,
        </p>
        <p className="text-justify">
          Lamentamos informar que sua conta foi temporariamente suspensa devido
          a atividades irregulares ou violações dos nossos termos de uso.
          Durante esse período de suspensão, todas as funcionalidades da sua
          conta estarão limitadas.
        </p>
        <br />
        <p className="">
          Você pode entrar em contato com nosso suporte através do e-mail <br />
          <a
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="font-bold text-mesh-color-primary-1200"
          >
            {email}
          </a>
          .
        </p>
        <br />
        <p>Agradecemos pela sua compreensão e colaboração.</p>
        <br />
        <p>Atenciosamente, a Equipe de Suporte RentSkins.</p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="rounded-md bg-mesh-color-primary-1200 px-12 py-2 font-semibold opacity-70 hover:opacity-100"
      >
        Concordar e Sair
      </button>
    </>
  )
}
