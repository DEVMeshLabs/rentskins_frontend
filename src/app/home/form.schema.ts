import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const homeFormSchema = yup.object({
  cpf: yup
    .string()
    .length(11, 'CPF deverá conter 11 caracteres.')
    .required('CPF requerido')
    .test('valid-cpf', 'CPF inválido', (value) => {
      if (!value) return false
      const cleanCPF = value.replace(/\D/g, '')

      if (cleanCPF.length !== 11) return false
      return true
    }),
  teste: yup.string(),
})

export const homeFormResolver = yupResolver(homeFormSchema)
