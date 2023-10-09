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

export default function transformRarityInColor(itemRarity: TItemRarity) {
  if (itemRarity) {
    return {
      'Consumer Grade': () => '919291',
      'Industrial Grade': () => '6784a9',
      'Mil-Spec Grade': () => '4a5988',
      Distinguished: () => '4a5988',
      'High Grade': () => '4a5988',
      Rare: () => '4a5988',
      Restricted: () => '5e389a',
      Exceptional: () => '5e389a',
      Remarkable: () => '5e389a',
      Mythical: () => '5e389a',
      Classified: () => '912786',
      Superior: () => '912786',
      Exotic: () => '912786',
      Legendary: () => '912786',
      Covert: () => 'a33f37',
      Master: () => 'a33f37',
      Extraordinary: () => 'a33f37',
      Ancient: () => 'a33f37',
      'Exceedingly Rare': () => '957b13',
      Contraband: () => '6b551b',
    }[itemRarity]()
  }
  return '919291'
}
