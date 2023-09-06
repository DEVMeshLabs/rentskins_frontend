// 'use client'
// import QRCodeExample from '@/../public/qrcode-example.png'
// import Common from '@/components/Common'
// import Form from '@/components/Forms'
// import { LayoutLoading } from '@/components/Layout/LayoutLoading'
// import usePaymentStore from '@/stores/payment.store'
// import Image from 'next/image'
// import { MouseEventHandler, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { formResolver } from './schemas/pix.schema'

// interface IProps {
//   handleFormSubmit: any
//   handleFormCancel: MouseEventHandler
// }

// export function PagePaymentRechargePix({
//   handleFormSubmit,
//   handleFormCancel,
// }: IProps) {
//   const [isLoading] = useState(false)
//   const [pageIndex, setPageIndex] = useState(0)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, dirtyFields },
//   } = useForm({
//     resolver: formResolver,
//     defaultValues: {
//       name: undefined,
//       cpf: undefined,
//     },
//   })

//   const onSubmit = (data: any) => {
//     setPageIndex(1)
//   }

//   const enableButton = dirtyFields.name && dirtyFields.cpf

//   const { paymentAdd } = usePaymentStore()

//   const textAreaValue =
//     '00020101021226860014br.gov.bcb.pix2564qrpix.bradesco.com.br/qr/v2/46477fb7-d638-46d4-9f4d-f154c3ab5d7b5204000053039865406700.735802BR5925PAGBRASIL PAGAMENTOS LTDA6012PORTO ALEGRE62090505131196304CA18'

//   const renderStepTwo = (
//     <LayoutLoading
//       label="Processando..."
//       enabled={isLoading}
//       className="flex h-2/3 items-center justify-center"
//     >
//       <Common.Title size="lg" bold={600} className="mt-8">
//         Digitalize o código QR usando o aplicativo da carteira/banco.
//       </Common.Title>
//       <Form.Root onSubmit={handleFormSubmit} className="mt-4">
//         <Image src={QRCodeExample} alt="QRCode" width={150} />
//         <div className="mt-8 h-1/3">
//           <Common.Title bold={600} size="lg">
//             Ou cole o código alternativo no aplicativo para concluir o
//             pagamento.
//           </Common.Title>

//           <textarea
//             readOnly={true}
//             className="focus:outline-pink-500n h-36 max-h-36 w-full resize-none overflow-hidden rounded-md
//               border-2 border-mesh-color-primary-1100/50 bg-mesh-color-others-eerie-black px-3 py-3 text-black text-white/70"
//           >
//             {textAreaValue}
//           </textarea>
//         </div>
//         <div className="mt-8 flex justify-between text-xl font-semibold">
//           <span>Total:</span>

//           <span className="text-mesh-color-primary-800">
//             {Number(paymentAdd.value)?.toLocaleString('pt-br', {
//               style: 'currency',
//               currency: 'BRL',
//               minimumFractionDigits: 2,
//             })}
//           </span>
//         </div>

//         <div className="flex flex-col gap-4 text-xl font-semibold">
//           <Form.Button buttonStyle="full" disabled={!enableButton}>
//             Pagar
//           </Form.Button>
//           <Form.Button
//             type="button"
//             buttonStyle="opaque"
//             onClick={handleFormCancel}
//           >
//             Cancelar
//           </Form.Button>
//         </div>
//       </Form.Root>
//     </LayoutLoading>
//   )

//   const renderStepOne = (
//     <Form.Root
//       className="my-8 flex w-full flex-col gap-4"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <Form.Input.Text
//         name="name"
//         label="Nome"
//         placeholder="Nome Completo"
//         register={register('name')}
//         errors={errors.name}
//       />

//       <Form.Input.CPF
//         name="cpf"
//         label="CPF"
//         placeholder="000.000.000-00"
//         register={register('cpf')}
//         errors={errors.cpf}
//       />

//       <div className="mt-4">
//         <div className="flex justify-between text-xl font-semibold">
//           <span>Total:</span>
//           <span className="text-mesh-color-primary-800">
//             {Number(paymentAdd.value)?.toLocaleString('pt-br', {
//               style: 'currency',
//               currency: 'BRL',
//               minimumFractionDigits: 2,
//             })}
//           </span>
//         </div>

//         <div className="flex flex-col gap-4 text-xl font-semibold">
//           <Form.Button
//             type="submit"
//             buttonStyle="full"
//             disabled={!enableButton}
//           >
//             Continuar
//           </Form.Button>
//           <Form.Button
//             type="button"
//             buttonStyle="opaque"
//             onClick={handleFormCancel}
//           >
//             Cancelar
//           </Form.Button>
//         </div>
//       </div>
//     </Form.Root>
//   )

//   return (
//     <>
//       {pageIndex === 0 && renderStepOne}
//       {pageIndex === 1 && renderStepTwo}
//     </>
//   )
// }
