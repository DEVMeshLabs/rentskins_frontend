import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'api-key': yup
    .string()
    .notRequired()
    .test(
      'apikey-test',
      'O campo deve conter uma chave API válida.',
      (item) => {
        if (!item) {
          return true
        }

        const regex = /^[a-zA-Z0-9]+$/

        return regex.test(item) && item.length === 32
      },
    ),
})

export const formResolver = yupResolver(formSchema)
