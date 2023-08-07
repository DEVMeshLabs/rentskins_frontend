import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'type-filter': yup.array().of(yup.string()),
})

export const formResolver = yupResolver(formSchema)
