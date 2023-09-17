import Common from '@/components/Common'
import Link from 'next/link'

interface IProps {
  label: string
  onClick: () => void
  itemAvailable: boolean
}

export function ModalConfirm({ label, onClick, itemAvailable }: IProps) {
  return (
    <div className="flex items-end pt-2">
      <p className="w-4/5 leading-tight text-mesh-color-neutral-0">
        Ao prosseguir para finalizar o pagamento, você concorda com os nossos{' '}
        <Link
          href={'/termos-de-uso'}
          className="text-mesh-color-primary-1200 hover:underline"
        >
          Termos de Serviço
        </Link>
        <span className="text-mesh-color-primary-1200">, </span>
        <Link
          href={'/privacidade'}
          className="text-mesh-color-primary-1200 hover:underline"
        >
          Política de Privacidade.
        </Link>
      </p>
      <Common.Button
        type="button"
        color="green"
        width="190px"
        height="45px"
        className="h-11 text-lg font-bold text-black"
        onClick={onClick}
        disable={!itemAvailable}
      >
        {label}
      </Common.Button>
    </div>
  )
}
