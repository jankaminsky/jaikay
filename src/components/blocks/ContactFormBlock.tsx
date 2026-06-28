'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation'
import { submitContactForm } from '@/actions/contact'
import { FadeIn } from '@/components/FadeIn'

function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white font-mono uppercase px-8 py-4 text-[0.9rem] leading-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      {pending ? loadingLabel : label}
    </button>
  )
}

export const ContactFormBlock: React.FC<any> = ({
  heading,
  successMessage,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  messageLabel,
  submitButtonLabel,
  submitButtonLoadingLabel,
}) => {
  const [state, formAction] = useActionState(submitContactForm, { status: 'idle' })
  const pathname = usePathname()
  const isFr = pathname.startsWith('/fr/') || pathname === '/fr'

  const fNameLabel = firstNameLabel || (isFr ? 'Prénom' : 'First Name')
  const lNameLabel = lastNameLabel || (isFr ? 'Nom' : 'Last Name')
  const mailLabel = emailLabel || (isFr ? 'Courriel' : 'Email')
  const msgLabel = messageLabel || (isFr ? 'Message' : 'Message')
  const btnLabel = submitButtonLabel || (isFr ? 'Envoyer ->' : 'Submit ->')
  const loadingLabel = submitButtonLoadingLabel || (isFr ? 'Envoi en cours...' : 'Sending...')

  if (state.status === 'success') {
    return (
      <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
        <div className="px-5 md:px-[60px]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[3rem] leading-none mb-6 font-normal">{heading}</h2>
            <div className="p-8 border border-green-500 bg-green-50 text-green-800 font-medium text-lg">
              {state.message || successMessage}
            </div>
          </div>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn as="section" isBorder className="max-w-[1440px] mx-auto py-10">
      <div className="px-5 md:px-[60px]">
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h2 className="text-[3rem] leading-none mb-10 font-normal text-center">{heading}</h2>
          )}

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="locale" value={isFr ? 'fr' : 'en'} />
            
            {state.status === 'error' && state.message && (
              <div className="p-4 border border-red-500 bg-red-50 text-red-800 font-medium mb-6">
                {state.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstname" className="block font-mono text-[0.9rem] uppercase">{fNameLabel}</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className={`w-full border p-4 font-sans text-lg outline-none focus:ring-2 focus:ring-black ${state.errors?.firstname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {state.errors?.firstname && (
                  <p className="text-red-500 font-mono text-sm">{state.errors.firstname[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastname" className="block font-mono text-[0.9rem] uppercase">{lNameLabel}</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={`w-full border p-4 font-sans text-lg outline-none focus:ring-2 focus:ring-black ${state.errors?.lastname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {state.errors?.lastname && (
                  <p className="text-red-500 font-mono text-sm">{state.errors.lastname[0]}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-mono text-[0.9rem] uppercase">{mailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full border p-4 font-sans text-lg outline-none focus:ring-2 focus:ring-black ${state.errors?.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {state.errors?.email && (
                <p className="text-red-500 font-mono text-sm">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block font-mono text-[0.9rem] uppercase">{msgLabel}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full border p-4 font-sans text-lg outline-none focus:ring-2 focus:ring-black ${state.errors?.message ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {state.errors?.message && (
                <p className="text-red-500 font-mono text-sm">{state.errors.message[0]}</p>
              )}
            </div>

            <div className="pt-4 text-center md:text-left">
              <SubmitButton label={btnLabel} loadingLabel={loadingLabel} />
            </div>
          </form>
        </div>
      </div>
    </FadeIn>
  )
}
