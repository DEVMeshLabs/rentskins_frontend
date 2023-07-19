import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const homeFormSchema = yup.object({
  card: yup.string(),
  checkbox: yup.string(),
  cpf: yup.string(),
  currency: yup.string(),
  date: yup.string(),
  email: yup.string(),
  monthyear: yup.string(),
  number: yup.string(),
  phone: yup.string(),
  postalcode: yup.string(),
  text: yup.string(),
})

export const homeFormResolver = yupResolver(homeFormSchema)
