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

        if (!item.includes('steamcommunity.com/tradeoffer/')) {
          return false
        }

        return true
      },
    ),
})

export const formResolver = yupResolver(formSchema)
