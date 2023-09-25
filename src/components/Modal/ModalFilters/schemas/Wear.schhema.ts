import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formWearSchema = yup.object({
  'wear-filter': yup.array().of(yup.string()),
})

export const formWearResolver = yupResolver(formWearSchema)
