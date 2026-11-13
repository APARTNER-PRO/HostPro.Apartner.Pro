import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import EmailHostingClient from '@/components/EmailHostingClient'
import JsonLd from '@/components/JsonLd'
import { Lang, getT, LANGS, getAlternates } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LANGS.filter((l) => l !== 'en').map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang

  const META: Record<string, { title: string; description: string }> = {
    uk: {
      title: 'Хостинг пошти — корпоративні скриньки на вашому домені | HostPro',
      description: 'Надійний хостинг пошти з підтримкою IMAP/POP3/SMTP, захистом від спаму, Webmail, безкоштовним Certum SSL та доменом у подарунок при оплаті на 36 місяців.',
    },
    ru: {
      title: 'Хостинг почты — корпоративные ящики на вашем домене | HostPro',
      description: 'Надёжный хостинг почты с поддержкой IMAP/POP3/SMTP, защитой от спама, Webmail, бесплатным Certum SSL и доменом в подарок при оплате на 36 месяцев.',
    },
  }

  const m = META[lang] ?? META['uk']
  return {
    title: m.title,
    description: m.description,
    alternates: getAlternates(lang, 'email-hosting'),
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="email-hosting">
      <JsonLd lang={lang} page="email-hosting" />
      <EmailHostingClient lang={lang} />
    </PageWrapper>
  )
}

