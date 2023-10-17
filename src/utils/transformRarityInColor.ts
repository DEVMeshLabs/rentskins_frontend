export type TItemRarity =
  | 'Consumer Grade'
  | 'Industrial Grade'
  | 'Mil-Spec Grade'
  | 'Restricted'
  | 'Classified'
  | 'Covert'
  | 'Extraordinary'
  | 'Exceedingly Rare'
  | 'Contraband'
  | 'Master'
  | 'Superior'
  | 'Exotic'
  | 'Legendary'
  | 'Distinguished'
  | 'Remarkable'
  | 'Mythical'
  | 'Ancient'
  | 'High Grade'
  | 'Rare'
  | 'Exceptional'
  | 'Base Grade'

export default function transformRarityInColor(itemRarity: TItemRarity) {
  if (itemRarity) {
    return {
      'Consumer Grade': () => 'b0c3b7',
      'Base Grade': () => 'b0c3b7',
      'Industrial Grade': () => '397cd9',
      'Mil-Spec Grade': () => '2e32b1',
      Distinguished: () => '2e32b1',
      'High Grade': () => '2e32b1',
      Rare: () => '2e32b1',
      Restricted: () => '7f47f2',
      Exceptional: () => '7f47f2',
      Remarkable: () => '7f47f2',
      Mythical: () => '7f47f2',
      Classified: () => 'b22cdb',
      Superior: () => 'b22cdb',
      Exotic: () => 'b22cdb',
      Legendary: () => 'b22cdb',
      Covert: () => 'eb4740',
      Master: () => 'eb4740',
      Extraordinary: () => 'eb4740',
      Ancient: () => 'eb4740',
      'Exceedingly Rare': () => 'd3ae39',
      Contraband: () => 'd3ae39',
    }[itemRarity]()
  }
  return '919291'
}
