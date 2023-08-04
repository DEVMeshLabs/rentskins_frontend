import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'min-price': yup.string(),
  'max-price': yup.string(),
})

export const formResolver = yupResolver(formSchema)
