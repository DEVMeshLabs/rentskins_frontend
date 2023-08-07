import SkeletonCardSkin from '@/components/SkeletonCardSkin'

interface IProps {
  quantitySkeletons?: number
}

export default function AllSkeletonSkins({ quantitySkeletons = 15 }: IProps) {
  const skeletonSkins = Array(quantitySkeletons).fill(1)
  return (
    <div className="flex w-full flex-wrap justify-center gap-3">
      {skeletonSkins.map((_, idx) => (
        <div key={idx}>
          <SkeletonCardSkin />
        </div>
      ))}
    </div>
  )
}
