import React from 'react'
import type { Page } from '../../../payload-types'
import { FadeIn } from '../FadeIn'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'services' }>

export const ServicesBlock: React.FC<Props> = ({ servicesList }) => {
  return (
    <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-3 lg:grid-cols-6 gap-5 px-5">
        <FadeIn className="row-span-5 md:row-span-3 lg:col-span-1 lg:row-span-1">
          <div className="text-[0.9rem] leading-4">
            <p className="font-bold font-mono">SERVICES</p>
            <p className="font-sans font-normal">[ -&gt; ]</p>
          </div>
        </FadeIn>
        {servicesList?.map((service, i) => (
          <FadeIn key={i}>
            <div>
              <p className="font-bold font-mono text-[0.9rem] leading-4 uppercase">{service.title}</p>
              <ul className="font-mono text-[0.9rem] leading-4 list-inside">
                {service.items?.map((item, j) => (
                  <li key={j} className="list-none uppercase before:content-['->_'] before:font-sans">{item.item}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}
