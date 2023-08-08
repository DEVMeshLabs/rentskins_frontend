import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'trade-link': yup
    .string()
    .required('Campo necessário.')
    .test(
      'trade-link-test',
      'O campo deve ser um link válido da Steam.',
      (item) => {
        if (item === '' || item === undefined) {
          return false
        }

        if (
          !item.includes('steamcommunity.com/tradeoffer/new/?partner=') ||
          !item.includes('&token=')
        ) {
          return false
        }

        return true
      },
    ),

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

  phone: yup
    .string()
    .test('phone-test', 'O campo deve conter um telefone válido.', (item) => {
      if (item) {
        return item.length === 15
      }

      return true
    }),

  'receive-notifications': yup.bool(),

  'accept-terms': yup
    .bool()
    .required('O campo é necessário.')
    .isTrue('Você deve concordar com os termos antes de prosseguir.'),
})

export const formResolver = yupResolver(formSchema)
