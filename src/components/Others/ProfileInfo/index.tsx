import Common from '@/components/Common'

interface Props {
  title: string
  value?: string | number
}

export default function ProfileInfo({ title, value }: Props) {
  return (
    <div
      className="flex w-56 flex-col items-center justify-center gap-1 rounded-xl border
      border-mesh-color-neutral-700 px-2 py-5"
    >
      <Common.Title className="text-mesh-color-neutral-100">
        {title}
      </Common.Title>
      <Common.Title className="text-mesh-color-neutral-300">
        {value}
      </Common.Title>
    </div>
  )
}
