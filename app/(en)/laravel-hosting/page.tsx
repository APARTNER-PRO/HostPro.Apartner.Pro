import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import LaravelClient from '@/components/LaravelClient'

export const metadata: Metadata = {
  title: 'High-Performance Laravel Hosting',
  description: 'Optimized hosting for Laravel applications with PHP 8.3, Redis, Git integration and SSH access.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="laravel-hosting">
      <LaravelClient lang={lang} />
    </PageWrapper>
  )
}
