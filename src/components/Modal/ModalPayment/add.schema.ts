import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  value: yup
    .string()
    .test('form-value-test', 'O valor deve ser um número positivo.', (item) => {
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
    }),
  valueButtons: yup.string(),
  method: yup.string().required(),
})

export const formResolver = yupResolver(formSchema)
