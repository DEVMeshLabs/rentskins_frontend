import Common from '.'

interface IProps {
  title: string
  content?: string
}

export function CommonSearchFeedback({ title, content }: IProps) {
  return (
    <div className="mb-16 flex h-[50vh] items-center justify-center">
      <Common.Title bold={600} className="text-2xl text-mesh-color-neutral-200">
        Não foi encontrado nenhuma skin relacionado {content || 'à'}{' '}
        <span className="text-mesh-color-primary-1200">
          {title}
          <span className="text-mesh-color-neutral-200">.</span>
        </span>
      </Common.Title>
    </div>
  )
}
