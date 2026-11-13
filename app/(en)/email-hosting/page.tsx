import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import EmailHostingClient from '@/components/EmailHostingClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Email Hosting — Corporate Mailboxes on Your Domain | HostPro',
  description: 'Professional email hosting with IMAP/POP3/SMTP, spam protection, Webmail, free Certum SSL, and free .com.ua or .com domain.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/email-hosting/',
    languages: {
      'en': 'https://hostpro.apartner.pro/email-hosting/',
      'uk': 'https://hostpro.apartner.pro/uk/email-hosting/',
      'ru': 'https://hostpro.apartner.pro/ru/email-hosting/',
      'x-default': 'https://hostpro.apartner.pro/email-hosting/',
    },
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="email-hosting">
      <JsonLd lang="en" page="email-hosting" />
      <EmailHostingClient lang="en" />
    </PageWrapper>
  )
}

