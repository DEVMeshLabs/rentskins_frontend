import Common from '@/components/Common'

export function ModalRefundMethodInformationPayment() {
  return (
    <div className="flex flex-col gap-2">
      <Common.Title color="white" size="2xl" bold={600}>
        Selecione o método de pagamento
      </Common.Title>
      <div className="flex gap-5">
        {/* <Method
          value={5}
          method="mastercard"
          id="1"
          icon={<IconMastercard />}
          IsPayBank={true}
        />
        <Method
          value={10}
          method="payPal"
          id="2"
          icon={<IconBoleto />}
          IsPayBank={true}
        />
        <Method
          value={20}
          method="bankTransfer"
          id="3"
          icon={<IconBankTransfer />}
          IsPayBank={true}
        /> */}
      </div>
    </div>
  )
}
