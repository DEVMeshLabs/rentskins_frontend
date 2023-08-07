import Link from 'next/link'

interface IProps {
  items: string[]
}

export function ItemLink({ items }: IProps) {
  const renderComponent = () => {
    return items.map((item, index) => (
      <Link
        href={`/categorias/${item}`}
        key={'itemlink-' + item + '-' + index}
        rel="noopener noreferrer"
      >
        <li className="mx-1 flex h-12 cursor-pointer items-center whitespace-nowrap rounded p-2 font-semibold hover:bg-[#3C403C]">
          {item}
        </li>
      </Link>
    ))
  }
  return <>{renderComponent()}</>
}
