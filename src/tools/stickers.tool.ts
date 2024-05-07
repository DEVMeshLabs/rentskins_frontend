export class Stickers {
  public static extractStickersFromString(
    string: string,
    type: 'Sticker' | 'Patch',
  ) {
    if (!string || string === ' ') {
      return []
    }
    const startNameRegex = type === 'Sticker' ? /Sticker:/ : /Patch:/
    const endNameRegex = /<\/center><\/div>/

    const urlRegex = /https:\/\/steamcdn-a\.akamaihd\.net\/[^\s]+\b\.png/g

    const startNameIndex = string?.search(startNameRegex)
    const endNameIndex = string?.search(endNameRegex)

    if (startNameIndex === -1 || endNameIndex === -1) {
      return []
    }

    const stickerNameContent = string
      ?.substring(startNameIndex + (type === 'Sticker' ? 8 : 7), endNameIndex)
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
  }
}
