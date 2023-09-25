import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  cpf: yup
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

  name: yup
    .string()
    .required('Campo necessário.')
    .test(
      'name-test',
      'O campo não pode conter números ou caracteres especiais.',
      (item) => {
        if (!item) {
          return false
        }
        const regex = /^[A-Za-z\s]+$/
        return regex.test(item)
      },
    ),

  birthday: yup
    .string()
    .required('Campo necessário.')
    .test(
      'card-validity-test',
      'O campo deve conter uma data válida.',
      (item) => {
        if (item?.length !== 10) {
          return false
        }

        const day = Number(item.slice(0, 2))
        const month = Number(item.slice(3, 5))
        const year = Number(item.slice(6, 10))

        const currentYear = new Date().getFullYear()

        if (
          day <= 0 ||
          day > 31 ||
          month <= 0 ||
          month > 12 ||
          year === currentYear ||
          year < currentYear - 100
        ) {
          return false
        }

        return true
      },
    ),

  phone: yup
    .string()
    .required('Campo necessário.')
    .length(15, 'O campo deve conter um telefone válido.'),
})

export const formResolver = yupResolver(formSchema)
