import React from 'react'
import type { Page } from '../../../payload-types'
import { FadeIn } from '../FadeIn'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'twoColumnText' }>

export const TwoColumnTextBlock: React.FC<Props> = ({ leftContent, rightContentBlocks }) => {
  return (
    <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-[60px] md:gap-5 px-5">
        <div className="w-full md:w-[40%]">
          <FadeIn>
            <div className="[&_h1]:text-[3rem] [&_h1]:font-normal [&_h1]:mb-3 [&_p]:text-[1.1rem]">
              {leftContent && <RichText data={leftContent} />}
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-[60%]">
          {rightContentBlocks?.map((block, i) => (
            <FadeIn key={i} className="mb-5">
              <div className="[&_p]:text-[1.3rem] [&_p]:font-medium">
                {block.content && <RichText data={block.content} />}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
