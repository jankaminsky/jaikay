import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Get in Touch',
    },
    {
      name: 'successMessage',
      type: 'text',
      required: true,
      defaultValue: 'Thanks for reaching out! We will get back to you shortly.',
    },
    {
      name: 'firstNameLabel',
      type: 'text',
      defaultValue: 'First Name',
    },
    {
      name: 'lastNameLabel',
      type: 'text',
      defaultValue: 'Last Name',
    },
    {
      name: 'emailLabel',
      type: 'text',
      defaultValue: 'Email',
    },
    {
      name: 'messageLabel',
      type: 'text',
      defaultValue: 'Message',
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit ->',
    },
    {
      name: 'submitButtonLoadingLabel',
      type: 'text',
      defaultValue: 'Sending...',
    },
  ],
}
