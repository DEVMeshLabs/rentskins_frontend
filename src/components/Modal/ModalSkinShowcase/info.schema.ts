import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  value: yup
    .string()
    .test(
      'form-value-test',
      'O campo deve conter um número positivo.',
      (item) => {
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
      },
    ),
  warning: yup
    .bool()
    .isTrue('Você deve concordar com os termos para prosseguir.'),
  terms: yup.bool(),
})

export const formResolver = yupResolver(formSchema)
