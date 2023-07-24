import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  bank: yup.string().required('Campo necessário.'),

  agency: yup
    .string()
    .required('Campo necessário.')
    .length(4, 'O campo deve conter um número de agência válido.'),

  'account-number': yup
    .string()
    .required('Campo necessário.')
    .length(7, 'O campo deve conter um número de conta válido.'),

  'key-type': yup.string().required('Campo necessário.'),

  'key-cpf': yup
    .string()
    .required('Campo necessário.')
    .test('cpf-test', 'O campo deve ser um CPF válido.', (item) => {
      function calculateDigit(digits: string): string {
        const factors = digits.split('').map(Number).reverse()
        const sum = factors.reduce(
          (acc, value, index) => acc + value * (index + 2),
          0,
        )
        const remainder = sum % 11

        return remainder < 2 ? '0' : (11 - remainder).toString()
      }

      if (item) {
        const cleanedCPF = item.replace(/[^\d]/g, '') // Remover caracteres não numéricos

        if (cleanedCPF.length !== 11 || /^(.)\1*$/.test(cleanedCPF)) {
          return false // CPF inválido se não tiver 11 dígitos ou todos os dígitos forem iguais
        }

        const firstDigit = calculateDigit(cleanedCPF.substring(0, 9))
        const secondDigit = calculateDigit(
          cleanedCPF.substring(0, 9) + firstDigit,
        )

        return cleanedCPF.slice(-2) === firstDigit + secondDigit
      } else {
        return false
      }
    }),

  'key-email': yup
    .string()
    .required('Campo necessário.')
    .email('O campo deve ser um email válido.')
    .test('email-test', 'O campo deve ser um email válido.', (item) => {
      if (!item) {
        return false
      }

      const regex = /@.*\..+/
      return regex.test(item)
    }),

  'key-phone': yup
    .string()
    .required('Campo necessário.')
    .length(15, 'O campo deve conter um telefone válido.'),
})

export const formResolver = yupResolver(formSchema)
