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

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const isFr = formData.get('locale') === 'fr'
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
