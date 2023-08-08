import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
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
