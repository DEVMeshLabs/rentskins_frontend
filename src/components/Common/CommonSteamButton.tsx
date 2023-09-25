import { signIn } from 'next-auth/react'
import { IconSteam } from '../Icons'

type Props = {
  width?: string
  height?: string
  className?: string
}

export function CommonSteamButton({
  height = 'h-[60px]',
  width = 'w-[330px]',
  className,
}: Props) {
  return (
    <button
      onClick={() => signIn('steam', { callbackUrl: '/' })}
      type="button"
      className={
        className ||
        ` font-Roboto rounded-md bg-mesh-color-primary-1200 no-underline 
      transition-all duration-300 ease-in-out ${width} ${height} flex 
      items-center justify-center gap-4 transition-all hover:bg-mesh-gradient-steam-button`
      }
    >
      <IconSteam />
      <span className="text-[22px] font-bold text-mesh-color-neutral-1000">
        {' '}
        Entre com a sua Steam{' '}
      </span>
    </button>
  )
}
