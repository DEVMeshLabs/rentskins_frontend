import Unrank from '@/../public/rank/type2/0.png'
import Bronze from '@/../public/rank/type2/1.png'
import Silver from '@/../public/rank/type2/2.png'
import Gold from '@/../public/rank/type2/3.png'
import Titanium from '@/../public/rank/type2/4.png'
import Sapphire from '@/../public/rank/type2/5.png'
import Ruby from '@/../public/rank/type2/6.png'
import Emerald from '@/../public/rank/type2/7.png'

export class Rank {
  public static retrieveRank(reliability: string) {
    const percentage =
      reliability !== 'Sem informações' ? Number(reliability) : null

    if (!percentage || percentage < 0) {
      return Unrank
    } else if (percentage > 0 && percentage <= 20) {
      return Bronze
    } else if (percentage > 20 && percentage <= 40) {
      return Silver
    } else if (percentage > 40 && percentage <= 60) {
      return Gold
    } else if (percentage > 60 && percentage <= 80) {
      return Titanium
    } else if (percentage > 80 && percentage <= 90) {
      return Sapphire
    } else if (percentage > 90 && percentage <= 95) {
      return Ruby
    } else if (percentage > 95) {
      return Emerald
    }
  }
}
