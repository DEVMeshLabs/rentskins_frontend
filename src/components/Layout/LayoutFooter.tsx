import {
  IconFacebook,
  IconTwitter,
  IconInstagram,
  IconPinterest,
} from '@/components/Icons'
import IconLogo from '@/components/Icons/IconLogo'

export function LayoutFooter() {
  return (
    <footer>
      <div className="flex h-64 items-center justify-between bg-mesh-color-neutral-800 px-32">
        <div className="flex flex-col gap-4">
          <IconLogo />
          <p>
            <span className="text-mesh-color-others-gray">
              Copyright © 2023 RentSkins. <br /> All rights reserved.
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-16">
          <nav className="flex gap-12">
            <a
              href="/termosdeuso"
              target="_blank"
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </a>
            <a
              href="/privacidade"
              target="_blank"
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Privacidade
            </a>
            <a
              href="/sobre"
              target="_blank"
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Sobre Nós
            </a>
            <a
              href="/sobre"
              target="_blank"
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Suporte
            </a>
            <a
              href="/faq"
              target="_blank"
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
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
              href=""
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
