import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'trade-link': yup
    .string()
    .test('form-value-test', 'O valor deve ser um número positivo.', (item) => {
      if (item === '' || item === undefined) {
        return true
      }

      let currencyToNumber
      currencyToNumber = item.replace(/\./g, '')
      currencyToNumber = currencyToNumber.replace('R$ ', '')
      currencyToNumber = currencyToNumber.replace(',', '.')

      if (Number(currencyToNumber) <= 0) {
        return false
      }

      return true
    }),

  email: yup
    .string()
    .required('Campo necessário.')
    .email('O campo deve ser um email válido.')
    .test('email-test', 'O campo deve ser um email válido.', (item) => {
      if (!item) {
        return false
      }

      const regex = /@.*\..+/
      return regex.test(item)
    }),

  'receive-notifications': yup.bool(),

  'accept-terms': yup.bool().required('O campo é necessário.'),
})

export const formResolver = yupResolver(formSchema)
