import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  'rent-time': yup.number(),
})

export const formResolver = yupResolver(formSchema)
