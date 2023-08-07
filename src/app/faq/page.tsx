import Common from '@/components/Common'
import { PageFAQ } from '@/components/Pages/PageFAQ/PageFAQ'

export default function Faq() {
  return (
    <main className="mx-auto mt-6 w-10/12">
      <Common.Title
        bold={700}
        color="white"
        className="mx-auto flex justify-center text-5xl"
      >
        Perguntas Frequentes (FAQ)
      </Common.Title>
      <PageFAQ />
    </main>
  )
}
