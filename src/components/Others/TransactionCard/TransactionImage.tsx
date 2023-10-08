import Image, { StaticImageData } from 'next/image'

interface IProps {
  image: string | StaticImageData
  alt: string
  width?: number
  height?: number
}

export function TransactionImage({
  image,
  alt,
  width = 112,
  height = 112,
}: IProps) {
  return (
    <Image
      src={image}
      alt={alt}
      className="w-28 rounded-lg bg-mesh-color-others-black p-4"
      width={width}
      height={height}
    />
  )
}
