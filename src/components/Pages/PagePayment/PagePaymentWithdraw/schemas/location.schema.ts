import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  city: yup.string().required('Campo necessário.'),
  state: yup.string().required('Campo necessário.'),
  'postal-code': yup
    .string()
    .required('Campo necessário.')
    .length(9, 'O campo deve conter um CEP válido.'),
  neighborhood: yup.string().required('Campo necessário.'),
  'complement-number': yup.string(),
  address: yup.string().required('Campo necessário.'),
})

export const formResolver = yupResolver(formSchema)
