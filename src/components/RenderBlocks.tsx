import React from 'react'
import type { Page } from '../../payload-types'
import { HeroBlock } from './blocks/HeroBlock'
import { ServicesBlock } from './blocks/ServicesBlock'
import { TwoColumnTextBlock } from './blocks/TwoColumnTextBlock'
import { ContactFormBlock } from './blocks/ContactFormBlock'

const blockComponents = {
  hero: HeroBlock,
  services: ServicesBlock,
  twoColumnText: TwoColumnTextBlock,
  contactForm: ContactFormBlock,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <main>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType] as React.FC<typeof block>

        if (!BlockComponent) return null

        return <BlockComponent key={index} {...block} />
      })}
    </main>
  )
}
