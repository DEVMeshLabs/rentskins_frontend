import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  name: yup.string(),

  email: yup.string(),

  'user-type': yup.string(),

  status: yup.string().default('todos'),
})

export const formResolver = yupResolver(formSchema)
