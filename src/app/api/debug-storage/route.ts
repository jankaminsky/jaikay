import { NextResponse } from 'next/server'

/**
 * GET /api/debug-storage
 * 
 * Diagnostic endpoint to check Vercel Blob storage configuration.
 * ⚠️ DELETE THIS ROUTE after debugging.
 */
export async function GET() {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  const nodeEnv = process.env.NODE_ENV

  // Parse store ID from token if it exists
  const storeId = blobToken?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

  return NextResponse.json({
    NODE_ENV: nodeEnv,
    BLOB_TOKEN_EXISTS: !!blobToken,
    BLOB_TOKEN_LENGTH: blobToken?.length ?? 0,
    BLOB_TOKEN_PREFIX: blobToken?.substring(0, 20) ?? 'NOT SET',
    STORE_ID: storeId ?? 'COULD NOT PARSE',
    PLUGIN_ENABLED_CHECK: nodeEnv === 'production',
    PLUGIN_DISABLED_BY_TOKEN: !blobToken,
    WOULD_BE_DISABLED: (nodeEnv !== 'production') || !blobToken,
  })
}
