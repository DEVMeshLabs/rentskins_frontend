import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object({
  search: yup.string(),
})

export const formResolver = yupResolver(formSchema)
