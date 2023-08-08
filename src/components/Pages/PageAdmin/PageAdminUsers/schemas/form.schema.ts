import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  name: yup.string(),

  email: yup
    .string()
    .nullable()
    .notRequired()
    .test('email-test', 'O campo deve ser um email válido.', (item) => {
      if (!item) {
        return true
      }

      const regex = /@.*\..+/
      return regex.test(item)
    }),

  'user-type': yup.string(),

  status: yup.string(),
})

export const formResolver = yupResolver(formSchema)
