import Common from '@/components/Common'
import IconRefound from '@/components/Icons/IconRefound'
import useComponentStore from '@/stores/components.store'
import Link from 'next/link'
import LineInfos from './LineInfos'

export default function RefoundInfos() {
  const { setRefoundGeneralIndex } = useComponentStore()
  return (
    <div className="flex w-full flex-col gap-7 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-7">
          <LineInfos
            label="Valor a ser Reembolsado"
            value="742,50"
            size="3xl"
            bold={700}
          />
          <LineInfos label="Valor total do Aluguel" value="82,50" size="2xl" />
          <LineInfos label="Valor Pago" value="825,00" size="2xl" />
          <div className="flex w-[440px] flex-col gap-6">
            <div className="flex items-end gap-6">
              <div className="flex flex-col gap-6">
                <LineInfos
                  label="Período do Aluguel"
                  value="7 Dias"
                  size="base"
                  color="dark/6"
                />
                <LineInfos
                  label="Data de Término"
                  value="07/01/2023"
                  color="dark/6"
                />
              </div>
              <LineInfos
                label="Data de Início"
                value="01/01/2023"
                color="dark/6"
              />
            </div>
            <p className="text-base font-medium text-[#A7B0A0]">
              A devolução será processada assim que confirmarmos o recebimento
              da skin.
            </p>
          </div>
        </div>
        <IconRefound />
      </div>
      <hr className="h-[1px] w-full border-none bg-[#A7B0A0] bg-opacity-30" />
      <div className="flex items-center justify-between gap-3">
        <p className="w-[70%] px-2 text-[#A7B0A0]">
          Ao prosseguir para solicitação de devolução, você concorda com os
          nossos
          <Link href="/" className="text-dark-lime-green">
            {' '}
            Termos de Serviço, Política de Privacidade,Política de Reembolso.
          </Link>
        </p>
        <Common.Button
          onClick={() => setRefoundGeneralIndex(1)}
          color="green"
          className="h-11 w-80 rounded text-lg font-bold text-black"
        >
          Pedir devolução
        </Common.Button>
      </div>
    </div>
  )
}
