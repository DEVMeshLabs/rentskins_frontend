import dynamic from 'next/dynamic'

const AllSkinsCart = dynamic(() =>
  import('@/components/Others/Skins/AllSkinsCart').then(
    (module) => module.default,
  ),
)
const PageSummaryCart = dynamic(() =>
  import('@/components/Pages/PageSummary/PageSummaryCart').then(
    (module) => module.default,
  ),
)

export default function Carrinho() {
  return (
    <main className="flex w-full justify-center">
      <div className="my-6 flex w-3/4 items-start justify-center gap-6">
        <AllSkinsCart />
        <PageSummaryCart />
      </div>
    </main>
  )
}
