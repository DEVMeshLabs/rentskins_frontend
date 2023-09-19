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
    )
    .test(
      'form-value-min-test',
      'O campo deve conter um valor igual ou acima de R$ 5,00 e igual ou abaixo de R$ 25.000.00.',
      (item) => {
        if (item === '' || item === undefined) {
          return true
        }

        let currencyToNumber
        currencyToNumber = item.replace(/\./g, '')
        currencyToNumber = currencyToNumber.replace('R$ ', '')
        currencyToNumber = currencyToNumber.replace(',', '.')

        if (Number(currencyToNumber) < 5 || Number(currencyToNumber) > 25000) {
          return false
        }

        return true
      },
    ),
  valueButtons: yup.string(),
  method: yup.string().required(),
})

export const formResolver = yupResolver(formSchema)
