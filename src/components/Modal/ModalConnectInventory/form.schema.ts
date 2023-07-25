import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'trade-link': yup
    .string()
    .test(
      'trade-link-test',
      'O campo deve ser um link válido da Steam.',
      (item) => {
        if (item === '' || item === undefined) {
          return false
        }

        if (
          !item.includes('https://steamcommunity.com/tradeoffer') &&
          !item.includes('www.steamcommunity.com/tradeoffer')
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

  'receive-notifications': yup.bool(),

  'accept-terms': yup
    .bool()
    .required('O campo é necessário.')
    .isTrue('Você deve concordar com os termos antes de prosseguir.'),
})

export const formResolver = yupResolver(formSchema)
