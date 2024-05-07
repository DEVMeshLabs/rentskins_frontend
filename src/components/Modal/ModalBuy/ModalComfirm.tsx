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
      <p className="w-4/5 pr-2 leading-tight text-mesh-color-neutral-0">
        Ao prosseguir para finalizar o pagamento, você concorda com os nossos{' '}
        <Link
          href={'/termos-de-uso'}
          target="_blank"
          className="text-mesh-color-primary-1200 hover:underline"
        >
          Termos de Serviço
        </Link>{' '}
        e{' '}
        <Link
          href={'/privacidade'}
          target="_blank"
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
