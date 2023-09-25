import Common from '@/components/Common'
import Image from 'next/image'

interface Props {
  name: string
  nameColor: string
  iconUrl: string
}

export default function ModalRefundInformationCard({
  name,
  nameColor,
  iconUrl,
}: Props) {
  const [skinType, skinName] = name.split('|')
  return (
    <section className="flex w-full items-center justify-between rounded-xl bg-[#222723] p-5">
      <div className="flex items-center gap-6">
        <div
          className="border-dark-olive-green bg-mesh-skin-gradient flex h-32 w-48
          flex-col items-center rounded-lg border-2"
        >
          <div
            className="h-1 w-32 rounded-b-full"
            style={{ backgroundColor: `#${nameColor}` }}
          />
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`}
            alt="placeholder"
            width={138}
            height={103}
          />
        </div>
        <div className="flex h-24 flex-col justify-between gap-3">
          <div>
            <Common.Title bold={600} size="2xl" color="white">
              {skinName}
            </Common.Title>
            <Common.Title
              bold={500}
              size="xl"
              color="cinza"
              className="opacity-60"
            >
              Nova de fábrica
            </Common.Title>
          </div>
          <Common.Title
            bold={500}
            size="xl"
            color="cinza"
            className="opacity-60"
          >
            {skinType}
          </Common.Title>
        </div>
      </div>
      <div>
        <Common.Title bold={600} size="3xl" color="white">
          R$180
        </Common.Title>
        <Common.Title color="white" size="md" bold={400}>
          <strong>FT / </strong>
          <span className="opacity-60">0.0003</span>
        </Common.Title>
      </div>
    </section>
  )
}
