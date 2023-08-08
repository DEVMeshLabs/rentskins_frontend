import Common from '@/components/Common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function TermoDeUso() {
  return (
    <main className="w-full bg-mesh-color-others-black">
      <div className="mx-auto w-10/12 py-10">
        <Common.Title
          bold={700}
          color="white"
          className="flex justify-center text-center text-5xl"
        >
          Termos e condições
        </Common.Title>

        <div className="mt-2 space-y-10 pb-20">
          <div>
            <Common.Title bold={700} color="white" className="text-2xl">
              Bem-vindo ao projeto
            </Common.Title>
            <p className="mt-5 text-mesh-color-neutral-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odit
              animi, repudiandae optio qui architecto excepturi perspiciatis,
              porro voluptate distinctio vitae nam. Corrupti necessitatibus
              magnam dolor quam quis consequatur quae.
            </p>
          </div>

          <div>
            <Common.Title bold={700} color="white" className="text-2xl">
              1. Termos e condições
            </Common.Title>
            <p className="mt-5 text-mesh-color-neutral-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odit
              animi, repudiandae optio qui architecto excepturi perspiciatis,
              porro voluptate distinctio vitae nam. Corrupti necessitatibus
              magnam dolor quam quis consequatur quae. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quod odit animi, repudiandae
              optio qui architecto excepturi perspiciatis, porro voluptate
              distinctio vitae nam. Corrupti necessitatibus magnam dolor quam
              quis consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae.
            </p>
          </div>

          <div>
            <Common.Title bold={700} color="white" className="text-2xl">
              2. Termos e condições devoluçãoo
            </Common.Title>
            <p className="mt-5 text-mesh-color-neutral-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odit
              animi, repudiandae optio qui architecto excepturi perspiciatis,
              porro voluptate distinctio vitae nam. Corrupti necessitatibus
              magnam dolor quam quis consequatur quae. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quod odit animi, repudiandae
              optio qui architecto excepturi perspiciatis, porro voluptate
              distinctio vitae nam. Corrupti necessitatibus magnam dolor quam
              quis consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quod odit animi, repudiandae optio qui
              architecto excepturi perspiciatis, porro voluptate distinctio
              vitae nam. Corrupti necessitatibus magnam dolor quam quis
              consequatur quae.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
