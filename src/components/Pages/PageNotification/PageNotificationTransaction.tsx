import TransactionCard from '@/components/Others/TransactionCard'
import { StaticImageData } from 'next/image'
// import TransactionsTable from '../Settings/Transactions/table'

interface IData {
  image: string | StaticImageData
  name: string
  weapon: string
  condition: string
  float: number
  value: number
}

interface IProps {
  data: IData[]
  loading: boolean
}

export function PageNotificationTransaction({ data, loading }: IProps) {
  const renderPending = data.map((item, index) => (
    <TransactionCard.Root key={'transactions-' + index}>
      <div className="flex items-center gap-4">
        <TransactionCard.Image image={item.image} alt={item.name} />
        <TransactionCard.Label name={item.name} weapon={item.weapon} />
      </div>
      <TransactionCard.Content
        text={item.condition}
        subtext={item.float}
        textIsCurrency={false}
      />
      <TransactionCard.Content text={item.value} textIsCurrency />
      <TransactionCard.Actions>
        <TransactionCard.Button
          modal
          modalOptions={{ action: 'accept', id: index + 1 }}
          buttonStyle="full"
          text="Aceitar troca"
        />
        <TransactionCard.Button
          modal
          modalOptions={{ action: 'decline', id: index + 1 }}
          buttonStyle="opaque"
          text="Cancelar"
        />
      </TransactionCard.Actions>
    </TransactionCard.Root>
  ))

  return (
    <div>
      <div className="mb-12 mt-4 pr-4">
        <span className="text-lg font-medium text-mesh-color-neutral-200">
          Pendentes
        </span>
        <div
          className="mt-4 flex h-[24rem] w-full scroll-p-24 flex-col gap-4 overflow-y-scroll pr-2"
          data-aos="fade-up"
        >
          {data ? renderPending : <TransactionCard.Skeleton quantity={3} />}
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="my-14 h-1 w-full rounded-full bg-mesh-color-others-black-olive"
      />
      <div data-aos="fade-up">
        <div className="grid grid-cols-6 rounded-lg bg-mesh-color-neutral-800 py-2 text-lg font-medium text-mesh-color-neutral-100">
          <span className="text-center">Item</span>
          <span className="text-left">Descrição</span>
          <span className="text-left">Características</span>
          <span className="text-center">Status</span>
          <span className="text-center">Preço</span>
          <span className="text-center">Tipo</span>
        </div>
        <div className="mb-16 mt-4 w-full text-center">
          {/* {<TransactionsTable data={transactionsMock.finished} />} */}
        </div>
      </div>
    </div>
  )
}
