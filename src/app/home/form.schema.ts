import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const homeFormSchema = yup.object({
  card: yup.string(),
  checkbox: yup.bool().equals([true]),
  cpf: yup.string(),
  currency: yup.string(),
  date: yup.string(),
  email: yup.string(),
  monthyear: yup.string(),
  number: yup.string(),
  phone: yup.string(),
  postalcode: yup.string(),
  texts: yup.string().test('text-test', 'Error no texto', (value) => {
    return value?.length === 3
  }),
})

export const homeFormResolver = yupResolver(homeFormSchema)
