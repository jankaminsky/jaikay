import React from 'react'
import type { Footer as FooterType } from '../../../payload-types'
import { FadeIn } from '../FadeIn'

export const Footer: React.FC<{ footer: FooterType }> = ({ footer }) => {
  const { emailLabel, emailAddress, copyrightNotice } = footer

  return (
    <footer>
      <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-[60px] md:gap-5 px-5">
          <div className="w-full md:w-[40%]">
            <div className="mb-5 [&_p]:text-[1.3rem] [&_p]:font-medium [&_p]:text-pretty">
              <p>{emailLabel}</p>
              <p><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <div className="mb-5 [&_p]:text-[1.3rem] [&_p]:font-medium [&_p]:text-pretty">
              <p>{copyrightNotice}</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  )
}
