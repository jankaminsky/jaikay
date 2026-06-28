import React from 'react'
import type { Page } from '../../../payload-types'
import { FadeIn } from '../FadeIn'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export const HeroBlock: React.FC<Props> = ({ backgroundImage, content }) => {
  const imageUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : ''

  return (
    <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
      <div 
        className="bg-cover bg-center text-white px-5 md:px-[60px] py-[80px] text-[2rem] [&_p:first-child]:mb-5" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})` }}
      >
        <FadeIn>
          {content && <RichText data={content} />}
        </FadeIn>
      </div>
    </FadeIn>
  )
}
