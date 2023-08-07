import Image, { StaticImageData } from 'next/image'

interface IProps {
  image: string | StaticImageData
  alt: string
}

export function TransactionImage({ image, alt }: IProps) {
  return (
    <Image
      src={image}
      alt={alt}
      className="w-28 rounded-lg bg-mesh-color-others-black p-4"
    />
  )
}
