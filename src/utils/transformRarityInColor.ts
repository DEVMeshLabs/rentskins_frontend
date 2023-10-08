export type TItemRarity =
  | 'Consumer grade'
  | 'Industrial grade'
  | 'Mil-spec'
  | 'Restricted'
  | 'Classified'
  | 'Covert'
  | 'Exceedingly Rare'
  | 'Contraband'

export default function transformRarityInColor(itemRarity: TItemRarity) {
  return {
    'Consumer grade': () => '919291',
    'Industrial grade': () => '6784a9',
    'Mil-spec': () => '4a5988',
    Restricted: () => '5e389a',
    Classified: () => '912786',
    Covert: () => 'a33f37',
    'Exceedingly Rare': () => '957b13',
    Contraband: () => '6b551b',
  }[itemRarity || 'Consumer grade']()
}
