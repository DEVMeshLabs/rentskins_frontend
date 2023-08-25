import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formCategorySchema = yup.object({
  'category-filter': yup.array().of(yup.string()),
})

export const formCategoryResolver = yupResolver(formCategorySchema)
