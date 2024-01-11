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
        currencyToNumber = item.replace('R$ ', '')
        currencyToNumber = currencyToNumber.replace(',', '.')

        if (Number(currencyToNumber) <= 0) {
          return false
        }

        return true
      },
    )
    .test(
      'form-value-min-test',
      'O campo deve conter um valor maior ou igual a R$ 10,00.',
      (item) => {
        if (item === '' || item === undefined) {
          return true
        }

        let currencyToNumber
        currencyToNumber = item.replace('R$ ', '')
        currencyToNumber = currencyToNumber.replace(',', '.')

        if (Number(currencyToNumber) < 10) {
          return false
        }

        return true
      },
    ),
  warning: yup
    .bool()
    .isTrue('Você deve concordar com os termos para prosseguir.'),
  terms: yup.bool(),
  rent: yup.bool(),
  sell: yup.bool(),
})

export const formResolver = yupResolver(formSchema)
