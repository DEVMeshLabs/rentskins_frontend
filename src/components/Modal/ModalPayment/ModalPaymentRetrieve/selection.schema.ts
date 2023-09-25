import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  value: yup
    .string()
    .required('Campo necessário!')
    .test(
      'form-value-test',
      'O campo deve conter um número positivo.',
      (item) => {
        if (!item) {
          return false
        }

        let currencyToNumber
        currencyToNumber = item.replace(/\./g, '')
        currencyToNumber = currencyToNumber.replace('R$ ', '')
        currencyToNumber = currencyToNumber.replace(',', '.')

        if (Number(currencyToNumber) <= 0) {
          return false
        }

        return true
      },
    ),
  method: yup.string().required(),
})

export const formResolver = yupResolver(formSchema)
