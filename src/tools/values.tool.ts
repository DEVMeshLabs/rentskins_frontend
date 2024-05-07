export class Values {
  public static currencyToNumber(currency: string) {
    if (typeof currency === 'number') {
      return currency
    }

    if (currency) {
      const number = parseFloat(
        currency.replace('R$', '').replaceAll('.', '').replace(',', '.'),
      )

      if (isNaN(number)) {
        return undefined
      }

      return number
    }
  }
}
