export class Stickers {
  public static extractStickersFromString(string: string) {
    if (!string || string === ' ') {
      return []
    }
    const startNameRegex = /Sticker:/
    const endNameRegex = /<\/center><\/div>/

    const urlRegex = /https:\/\/steamcdn-a\.akamaihd\.net\/[^\s]+\b\.png/g

    const startNameIndex = string?.search(startNameRegex)
    const endNameIndex = string?.search(endNameRegex)

    if (startNameIndex === -1 || endNameIndex === -1) {
      return []
    }

    const stickerNameContent = string
      ?.substring(startNameIndex + 8, endNameIndex)
      ?.trim()

    const stickerUrlContent = string?.match(urlRegex)

    const stickerNameArray = stickerNameContent
      ?.split(',')
      ?.map((item) => item.trim())

    const stickersObject = Array.from(
      { length: stickerNameArray?.length },
      (_any: null, index: number) => {
        return {
          name: stickerNameArray[index],
          url: stickerUrlContent![index],
        }
      },
    )

    return stickersObject
    // if (
    //   !stickerMatches ||
    //   !nameMatches ||
    //   stickerMatches.length !== nameMatches.length
    // ) {
    //   console.error('Erro na extração de dados')
    //   return []
    // }

    // const stickersArray = []

    // for (let i = 0; i < stickerMatches.length; i++) {
    //   const url = stickerMatches[i].match(/src="([^"]+)"/)![1]
    //   const name = nameMatches[i].replace('Sticker: ', '').trim()

    //   stickersArray.push({ name, url })
    // }

    // console.log(stickersArray)

    // return stickersArray
  }
}
