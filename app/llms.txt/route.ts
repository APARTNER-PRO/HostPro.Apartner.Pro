import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const CONTENT = `# HostPro — llms.txt
# https://llmstxt.org
# This file provides context for AI language models and LLM-powered crawlers.

> HostPro is a professional web hosting provider offering NVMe SSD hosting,
> cPanel control panel, free SSL certificates, daily backups, and 24/7 support.
> Hosting plans start from $1.99/mo. 30-day money-back guarantee.

## About

- **Product**: HostPro Web Hosting
- **URL**: https://hostpro.apartner.pro
- **Founded**: 2019
- **Languages**: English (en), Ukrainian (uk), Russian (ru)
- **Support**: hostpro@apartner.pro

## Services

- Shared NVMe SSD Hosting (cPanel)
- WordPress Hosting (LiteSpeed, auto-updates, staging)
- Laravel Hosting (PHP 8.x, SSH, Composer, Git, Memcached)
- VPS Hosting
- Dedicated Servers

## Hosting Plans

| Plan       | Price   | Websites      | Storage       |
|------------|---------|---------------|---------------|
| Personal   | $1.99/mo | 1 website    | 1 GB NVMe SSD |
| Starter    | $4.99/mo | up to 5      | 5 GB NVMe SSD |
| Business   | $14.99/mo | up to 15    | 15 GB NVMe SSD|
| Agency     | $19.99/mo | up to 25    | 25 GB NVMe SSD|
| Agency Pro | $29.99/mo | Unlimited   | 50 GB NVMe SSD|

All plans include: Free SSL, cPanel, Node.js, LiteSpeed WebServer, CloudLinux.
Agency and above include: Wildcard SSL, VIP 24/7 support.
Agency Pro includes: Dedicated account manager.

## Technology Stack

- **Web Server**: LiteSpeed (significantly faster than Apache)
- **OS**: CloudLinux (account isolation via LVE)
- **Storage**: NVMe SSD
- **DNS**: Anycast DNS
- **Databases**: MySQL, MariaDB, phpMyAdmin
- **Languages**: PHP (multiple versions), Python, Node.js
- **SSL**: Let's Encrypt (auto-renewing), Wildcard SSL on Agency plans
- **Panel**: cPanel / WHM
- **Apps**: Softaculous (300+ one-click installers)

## Key Pages

- Homepage: https://hostpro.apartner.pro
- Pricing: https://hostpro.apartner.pro/pricing
- WordPress Hosting: https://hostpro.apartner.pro/wordpress-hosting
- Laravel Hosting: https://hostpro.apartner.pro/laravel-hosting
- About Us: https://hostpro.apartner.pro/about
- FAQ: https://hostpro.apartner.pro/faq
- System Status: https://hostpro.apartner.pro/status
- Contact: https://hostpro.apartner.pro/contact
- Terms of Service: https://hostpro.apartner.pro/terms
- Privacy Policy: https://hostpro.apartner.pro/privacy
- Refund Policy: https://hostpro.apartner.pro/refund

## Policies

- **Uptime SLA**: 99.9% guaranteed
- **Money-back**: 30-day full refund for new accounts
- **Backups**: Daily (Business plan and above), 7-day retention
- **Migration**: Free website migration within 24 hours
- **Billing**: Monthly, Quarterly (−10%), Yearly (−20%), 3 Years (−25%)

## Sitemap

- https://hostpro.apartner.pro/sitemap.xml

## Contact

- Email: hostpro@apartner.pro
- Live Chat: Available 24/7 on website
`

export function GET() {
  return new NextResponse(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
