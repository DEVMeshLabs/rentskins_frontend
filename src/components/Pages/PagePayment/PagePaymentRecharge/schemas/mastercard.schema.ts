import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  email: yup
    .string()
    .email('O campo deve ser um email válido.')
    .required('Campo necessário.')
    .test('email-test', 'O campo deve ser um email válido.', (item) => {
      if (!item) {
        return false
      }

      const regex = /@.*\..+/
      return regex.test(item)
    }),

  'card-number': yup
    .string()
    .required('Campo necessário.')
    .length(19, 'O campo deve conter um número de cartão válido.'),

  'card-validity': yup
    .string()
    .required('Campo necessário.')
    .test(
      'card-validity-test',
      'O campo deve conter uma data válida.',
      (item) => {
        if (item?.length !== 5) {
          return false
        }

        const day = Number(item.slice(0, 2))
        const month = Number(item.slice(3, 5))

        if (day <= 0 || day > 31 || month <= 0 || month > 12) {
          return false
        }

        return true
      },
    ),

  'card-cvc': yup
    .string()
    .required('Campo necessário.')
    .length(3, 'O campo deve conter um CVC válido.'),

  'card-owner': yup
    .string()
    .required('Campo necessário.')
    .test(
      'card-owner-test',
      'O campo não pode conter números ou caracteres especiais.',
      (item) => {
        if (!item) {
          return false
        }
        const regex = /^[A-Za-z\s]+$/
        return regex.test(item)
      },
    ),
})

export const formResolver = yupResolver(formSchema)
