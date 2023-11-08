export interface ITransaction {
  id: string
  skin_id: string
  buyer_id: string
  seller_id: string
  seller_confirm: 'Pendente' | 'Aceito' | 'Recusado'
  buyer_confirm: 'Pendente' | 'Aceito' | 'Recusado'
  balance: number
  status: 'Em andamento' | 'Falhou' | 'Concluído'
  createdAt: Date
  salesAt: null | string
  updatedAt: null | string
  deletedAt: null | string
  skin: {
    id: string
    asset_id: string
    skin_image: string
    skin_name: string
    skin_category: string
    skin_weapon: string
    skin_price: number
    skin_float: string
    skin_color: string
    skin_link_game: string
    skin_link_steam: string
    median_price: number
    skin_rarity: string
    seller_name: string
    seller_id: string
    status: 'Pending'
    status_float: string
    sale_type: 'sale' | 'rent'
    sellerAt: null | string
    createdAt: Date
    updatedAt: null | string
    deletedAt: null | string
  }
}
