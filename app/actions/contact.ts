'use server'

import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  language: z.enum(['en', 'el', 'it', 'fr', 'de']),
  date: z.string().min(1, 'Please select a date'),
  contact: z
    .string()
    .min(5, 'Please provide a valid contact')
    .max(200)
    .refine(
      (val) => {
        // Accept email or phone/whatsapp number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\+?[\d\s\-().]{5,25}$/
        return emailRegex.test(val) || phoneRegex.test(val)
      },
      { message: 'Please enter a valid email or phone number' }
    ),
  message: z.string().max(1000).optional(),
  // Honeypot field — must be empty
  website: z.string().max(0, 'Bot detected'),
})

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Parse raw data
  const raw = {
    name: formData.get('name') as string,
    language: formData.get('language') as string,
    date: formData.get('date') as string,
    contact: formData.get('contact') as string,
    message: (formData.get('message') as string) || '',
    website: (formData.get('website') as string) || '', // honeypot
  }

  // Validate
  const result = ContactSchema.safeParse(raw)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    // If honeypot filled, silently succeed (fool the bot)
    if (fieldErrors.website) {
      return { success: true }
    }
    return {
      error: 'Validation failed',
      fieldErrors: fieldErrors as ContactFormState['fieldErrors'],
    }
  }

  const data = result.data

  // In production: send email/WhatsApp notification
  // Simulate async processing
  try {
    const body = [
      `New Transfer Enquiry — Pep Santorini`,
      ``,
      `Name: ${data.name}`,
      `Language: ${data.language.toUpperCase()}`,
      `Date: ${data.date}`,
      `Contact: ${data.contact}`,
      `Message: ${data.message || 'None'}`,
      ``,
      `Submitted at: ${new Date().toISOString()}`,
    ].join('\n')

    // Log for serverless contexts (replace with email/WA integration)
    console.log('[Contact Enquiry]\n', body)

    // If CONTACT_EMAIL env is set, could use Resend/NodeMailer here
    // await sendEmail({ to: process.env.CONTACT_EMAIL, subject: 'New Enquiry', body })

    return { success: true }
  } catch {
    return { error: 'Failed to send. Please try again.' }
  }
}
