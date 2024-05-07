import { ISkins } from '@/interfaces/ISkins'

export interface ISkinToCart {
  id: string
  cartId: string
  skinId: string
  skin: ISkins
}

export interface ISkinsToBuy {
  skin_id: string
  buyer_id: string
  seller_id: string
}

export interface ICart {
  id: string
  buyer_name: string
  buyer_id: string
  price: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  SkinToCart: ISkinToCart[]
}
