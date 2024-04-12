import {
  IconFacebook,
  IconInstagram,
  IconPinterest,
  IconTwitter,
} from '@/components/Icons'
import IconLogo from '@/components/Icons/IconLogo'
import Link from 'next/link'

export function LayoutFooter() {
  return (
    <footer>
      <div className="flex h-48 items-center justify-between bg-mesh-color-neutral-800 px-32 laptop:h-64">
        <div className="flex flex-col gap-4">
          <IconLogo />
          <p>
            <span className="text-mesh-color-others-gray">
              Copyright © 2023 RentSkins. <br /> All rights reserved.
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-16">
          <nav className="flex gap-6 text-xs laptop:gap-12 laptop:text-base">
            <Link
              href="/termos-de-uso"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/sobre"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Sobre Nós
            </Link>
            <Link
              href="/suporte"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Suporte
            </Link>
            <Link
              href="/faq"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              FAQ
            </Link>
          </nav>
          <nav className="flex gap-6">
            <a
              href=""
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mesh-color-neutral-500"
              rel="noopener noreferrer"
            >
              <IconFacebook />
            </a>

            <a
              href=""
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mesh-color-neutral-500"
              rel="noopener noreferrer"
            >
              <IconTwitter />
            </a>

            <a
              href="https://www.instagram.com/RentSkinsbr/"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mesh-color-neutral-500"
              rel="noopener noreferrer"
            >
              <IconInstagram />
            </a>

            <a
              href=""
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mesh-color-neutral-500"
              rel="noopener noreferrer"
            >
              <IconPinterest />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
