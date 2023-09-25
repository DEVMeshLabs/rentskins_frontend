import SkeletonCardSkin from '@/components/Others/Skins/SkeletonCardSkin'

interface IProps {
  quantitySkeletons?: number
}

export default function AllSkeletonSkins({ quantitySkeletons = 15 }: IProps) {
  const skeletonSkins = Array.from({ length: quantitySkeletons })
  return (
    <div className="mb-7 mt-6 flex w-full flex-wrap justify-center gap-2">
      {skeletonSkins.map((_, idx) => (
        <div key={idx}>
          <SkeletonCardSkin />
        </div>
      ))}
    </div>
  )
}
