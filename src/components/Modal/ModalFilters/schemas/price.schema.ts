import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formPriceSchema = yup.object({
  min: yup.string(),
  max: yup.string(),
})

export const formPriceResolver = yupResolver(formPriceSchema)
