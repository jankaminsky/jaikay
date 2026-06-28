import type { Metadata } from 'next'
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type PageParams = { segments: string[] }
type SearchParams = { [key: string]: string | string[] }

type PageProps = {
  params: Promise<PageParams>
  searchParams: Promise<SearchParams>
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { params, searchParams } = props
  return generatePageMetadata({ config, params, searchParams })
}

const NotFound = async (props: PageProps) => {
  const { params, searchParams } = props
  return NotFoundPage({ 
    config, 
    importMap, 
    params, 
    searchParams 
  })
}

export default NotFound
