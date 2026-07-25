'use server'

import { z } from 'zod'

// Define the schema creator function based on locale
const getContactFormSchema = (isFr: boolean) => z.object({
  firstname: z.string().min(1, isFr ? 'Le prénom est requis' : 'First name is required'),
  lastname: z.string().min(1, isFr ? 'Le nom est requis' : 'Last name is required'),
  email: z.string().email(isFr ? 'Veuillez saisir une adresse courriel valide' : 'Please enter a valid email address'),
  message: z.string().min(10, isFr ? 'Le message doit contenir au moins 10 caractères' : 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  errors?: {
    firstname?: string[]
    lastname?: string[]
    email?: string[]
    message?: string[]
  }
  message?: string
}

function containsSpamPatterns(firstname: string, lastname: string, message: string): boolean {
  const combinedText = `${firstname} ${lastname} ${message}`.toLowerCase()

  // Check for URLs or HTML tags in names (real names never contain http://, www., or HTML tags)
  const nameText = `${firstname} ${lastname}`.toLowerCase()
  if (/https?:\/\/|www\.|<a\s|\[url=/i.test(nameText)) {
    return true
  }

  // Check for excessive URLs in the message (2 or more links is almost always spam)
  const urlMatches = message.match(/https?:\/\/|www\.|\.com|\.ru|\.net|\.org|\[url=/gi)
  if (urlMatches && urlMatches.length >= 2) {
    return true
  }

  // Check for common automated bot / SEO marketing spam keywords
  const spamKeywords = [
    'seo services',
    'rank on google',
    'first page of google',
    'boost your traffic',
    'generate leads',
    'web design services',
    'domain registration',
    'telegram:',
    'whatsapp:',
    'guest post',
    'backlinks',
    'casino',
    'crypto investing',
    'eric jones',
  ]

  for (const keyword of spamKeywords) {
    if (combinedText.includes(keyword)) {
      return true
    }
  }

  // Check for BBCode / HTML link injections in message
  if (/<a\s+href=|\[url=|\{url\}/i.test(message)) {
    return true
  }

  return false
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const isFr = formData.get('locale') === 'fr'
  const fakeSuccessMessage = isFr
    ? 'Merci pour votre message. Nous vous contacterons bientôt.'
    : 'Thank you for your message. We will be in touch soon.'

  // 1. Honeypot Check (Invisible fields for bots)
  // Bots auto-fill all DOM inputs. If either honeypot field has text, silently discard as spam.
  const honeypotWebsite = formData.get('company_website')
  const honeypotPhone = formData.get('work_phone')
  if (honeypotWebsite || honeypotPhone) {
    console.warn('[Spam Protection] Blocked submission: Honeypot field triggered.')
    return { status: 'success', message: fakeSuccessMessage }
  }

  // 2. Time-trap Check (Minimum submission time)
  // Real humans take at least 3 seconds to fill out a form. Scrapers submit immediately or via direct POST.
  const loadedAtStr = formData.get('form_loaded_at')
  const loadedAt = loadedAtStr ? Number(loadedAtStr) : 0
  const now = Date.now()
  if (!loadedAt || isNaN(loadedAt) || now - loadedAt < 3000 || loadedAt > now + 60000) {
    console.warn('[Spam Protection] Blocked submission: Time-trap check failed (too fast or missing timestamp).')
    return { status: 'success', message: fakeSuccessMessage }
  }

  const contactFormSchema = getContactFormSchema(isFr)

  const data = {
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const validatedFields = contactFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: isFr ? 'Veuillez corriger les erreurs ci-dessous.' : 'Please fix the errors below.',
    }
  }

  // 3. Content Pattern Inspection
  // Check for SEO spam keywords, HTML injections, and URLs in names or messages.
  if (
    containsSpamPatterns(
      String(data.firstname || ''),
      String(data.lastname || ''),
      String(data.message || '')
    )
  ) {
    console.warn('[Spam Protection] Blocked submission: Spam content patterns detected.')
    return { status: 'success', message: fakeSuccessMessage }
  }

  // Submit the data to HubSpot Forms API securely from the server
  try {
    const portalId = '342977528'
    const formGuid = 'a20e2959-54ba-4b19-8754-b7011e4187f4'
    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

    const response = await fetch(hubspotEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: data.firstname },
          { name: 'lastname', value: data.lastname },
          { name: 'email', value: data.email },
          { name: 'message', value: data.message },
        ],
      }),
    })

    if (!response.ok) {
      console.error('HubSpot API Error:', await response.text())
      return {
        status: 'error',
        message: isFr ? "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer." : 'There was a problem submitting your form. Please try again.',
      }
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      status: 'error',
      message: isFr ? "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer." : 'There was a problem submitting your form. Please try again.',
    }
  }

  return {
    status: 'success',
    message: isFr ? 'Merci pour votre message. Nous vous contacterons bientôt.' : 'Thank you for your message. We will be in touch soon.',
  }
}
