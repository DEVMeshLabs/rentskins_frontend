import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  email: yup
    .string()
    .email('O campo deve ser um email válido.')
    .test('email-test', 'O campo deve ser um email válido.', (item) => {
      if (item) {
        const regex = /@.*\..+/
        return regex.test(item)
      }

      return true
    }),
  phone: yup
    .string()
    .test('phone-test', 'O campo deve conter um telefone válido.', (item) => {
      if (item) {
        return item.length === 15
      }

      return true
    }),
})

export const formResolver = yupResolver(formSchema)
