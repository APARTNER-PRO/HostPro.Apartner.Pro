'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Lang, getT } from '@/lib/i18n'
import FadeIn from './FadeIn'
import Breadcrumbs from './Breadcrumbs'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

type Period = '1' | '12' | '36'

const PLANS = {
  '1': [
    {
      id: 'mail1-1',
      pid: 1164,
      priceId: 'pri_01m784pcfm3pgzknhcyva5ngsd',
      billingcycle: 'monthly',
      name: { uk: 'Пошта Старт', ru: 'Почта Старт', en: 'Mail Start' },
      desc: { uk: 'Хороший вибір для розробників і веб-студій', ru: 'Хороший выбор для разработчиков и веб-студий', en: 'Great choice for developers and web studios' },
      mailDomains: 1,
      accounts: 50,
      disk: '25 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 16.00,
      price: 16.00,
      savings: 0,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller1-trial',
      popular: false,
      color: '#60A5FA',
    },
    {
      id: 'mail2-1',
      pid: 1165,
      priceId: 'pri_01m7a7dzqn2fqp78exxv350rzm',
      billingcycle: 'monthly',
      name: { uk: 'Пошта Бізнес', ru: 'Почта Бизнес', en: 'Mail Business' },
      desc: { uk: 'Ідеально для старту власного поштового бізнесу', ru: 'Идеально для старта собственного почтового бизнеса', en: 'Perfect to start your own mail business' },
      mailDomains: 10,
      accounts: 500,
      disk: '60 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 30.00,
      price: 30.00,
      savings: 0,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller2-trial',
      popular: true,
      color: '#FB7185',
    },
    {
      id: 'mail3-1',
      pid: 1166,
      priceId: 'pri_01m7a7rb5654fh4kwpfdsx5xv0',
      billingcycle: 'monthly',
      name: { uk: 'Пошта Про', ru: 'Почта Про', en: 'Mail Pro' },
      desc: { uk: 'Для масштабних поштових проєктів', ru: 'Для масштабных почтовых проектов', en: 'For large-scale mail projects' },
      mailDomains: 20,
      accounts: 1000,
      disk: '120 GB',
      hasDedicatedIp: true,
      ssl: true,
      domain: true,
      priceOld: 55.00,
      price: 55.00,
      savings: 0,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller3-trial',
      popular: false,
      color: '#A78BFA',
    },
  ],
  '12': [
    {
      id: 'mail1-12',
      pid: 1164,
      priceId: 'pri_01m7a76hsw3484m5q1r44tc78w',
      billingcycle: 'annually',
      name: { uk: 'Пошта Старт', ru: 'Почта Старт', en: 'Mail Start' },
      desc: { uk: 'Хороший вибір для розробників і веб-студій', ru: 'Хороший выбор для разработчиков и веб-студий', en: 'Great choice for developers and web studios' },
      mailDomains: 1,
      accounts: 50,
      disk: '25 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 16.00,
      price: 12.80,
      savings: 38.40,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller1-trial',
      popular: false,
      color: '#60A5FA',
    },
    {
      id: 'mail2-12',
      pid: 1165,
      priceId: 'pri_01m7a7kvs7006exdtw9sgcgqzj',
      billingcycle: 'annually',
      name: { uk: 'Пошта Бізнес', ru: 'Почта Бизнес', en: 'Mail Business' },
      desc: { uk: 'Ідеально для старту власного поштового бізнесу', ru: 'Идеально для старта собственного почтового бизнеса', en: 'Perfect to start your own mail business' },
      mailDomains: 10,
      accounts: 500,
      disk: '60 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 30.00,
      price: 25.80,
      savings: 50.40,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller2-trial',
      popular: true,
      color: '#FB7185',
    },
    {
      id: 'mail3-12',
      pid: 1166,
      priceId: 'pri_01m7a7t967rwvfyqdndar53phb',
      billingcycle: 'annually',
      name: { uk: 'Пошта Про', ru: 'Почта Про', en: 'Mail Pro' },
      desc: { uk: 'Для масштабних поштових проєктів', ru: 'Для масштабных почтовых проектов', en: 'For large-scale mail projects' },
      mailDomains: 20,
      accounts: 1000,
      disk: '120 GB',
      hasDedicatedIp: true,
      ssl: true,
      domain: true,
      priceOld: 55.00,
      price: 49.80,
      savings: 62.40,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller3-trial',
      popular: false,
      color: '#A78BFA',
    },
  ],
  '36': [
    {
      id: 'mail1-36',
      pid: 1164,
      priceId: 'pri_01m7a7bsfd8mvmsrr1fgvbzxj6',
      billingcycle: 'triennially',
      name: { uk: 'Пошта Старт', ru: 'Почта Старт', en: 'Mail Start' },
      desc: { uk: 'Хороший вибір для розробників і веб-студій', ru: 'Хороший выбор для разработчиков и веб-студий', en: 'Great choice for developers and web studios' },
      mailDomains: 1,
      accounts: 50,
      disk: '25 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 16.00,
      price: 10.99,
      savings: 180.36,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller1-trial',
      popular: false,
      color: '#60A5FA',
    },
    {
      id: 'mail2-36',
      pid: 1165,
      priceId: 'pri_01m7a7pbq1kf7j4vsp0jt8mrgb',
      billingcycle: 'triennially',
      name: { uk: 'Пошта Бізнес', ru: 'Почта Бизнес', en: 'Mail Business' },
      desc: { uk: 'Ідеально для старту власного поштового бізнесу', ru: 'Идеально для старта собственного почтового бизнеса', en: 'Perfect to start your own mail business' },
      mailDomains: 10,
      accounts: 500,
      disk: '60 GB',
      hasDedicatedIp: false,
      ssl: true,
      domain: true,
      priceOld: 30.00,
      price: 21.99,
      savings: 288.36,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller2-trial',
      popular: true,
      color: '#FB7185',
    },
    {
      id: 'mail3-36',
      pid: 1166,
      priceId: 'pri_01m7a7x83vr4babakm0qrkb74n',
      billingcycle: 'triennially',
      name: { uk: 'Пошта Про', ru: 'Почта Про', en: 'Mail Pro' },
      desc: { uk: 'Для масштабних поштових проєктів', ru: 'Для масштабных почтовых проектов', en: 'For large-scale mail projects' },
      mailDomains: 20,
      accounts: 1000,
      disk: '120 GB',
      hasDedicatedIp: true,
      ssl: true,
      domain: true,
      priceOld: 55.00,
      price: 44.99,
      savings: 360.36,
      trialUrl: 'https://billing.hostpro.ua/index.php?rp=/store/linux-reseling-trial/reseller3-trial',
      popular: false,
      color: '#A78BFA',
    },
  ],
}

const CSS = `
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes pulseOrb{0%,100%{opacity:.35}50%{opacity:.7}}
  .em-orb{animation:pulseOrb 5s ease-in-out infinite}
  .em-badge-anim{animation:floatBadge 3s ease-in-out infinite}
  .em-feat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:transform .25s,background .25s,border-color .25s}
  .em-feat-card:hover{transform:translateY(-4px);background:rgba(255,255,255,.055);border-color:rgba(96,165,250,.2)}
  .em-plan-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:28px 24px;position:relative;transition:transform .3s,border-color .3s,background .3s;display:flex;flex-direction:column}
  .em-plan-card:hover{transform:translateY(-8px);border-color:rgba(96,165,250,.25);background:rgba(255,255,255,.05)}
  .em-plan-card.popular{background:linear-gradient(160deg,rgba(244,63,94,.08),rgba(225,29,72,.05));border-color:rgba(244,63,94,.35);box-shadow:0 0 60px rgba(244,63,94,.1)}
  .em-plan-card.popular:hover{border-color:rgba(244,63,94,.5)}
  .em-btn{width:100%;border-radius:12px;font-weight:700;cursor:pointer;transition:all .2s;padding:14px;font-size:15px;font-family:'DM Sans',sans-serif;text-align:center;text-decoration:none;display:block;box-sizing:border-box}
  .em-btn-secondary{background:rgba(255,255,255,.07);color:#fff;border:1px solid rgba(255,255,255,.12)}
  .em-btn-secondary:hover{background:rgba(255,255,255,.13);transform:scale(1.02)}
  .em-btn-primary{background:linear-gradient(135deg,#F43F5E,#E11D48);color:#fff;border:none}
  .em-btn-primary:hover{filter:brightness(1.12);transform:scale(1.02)}
  .em-period-btn{border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;padding:11px 22px;transition:all .2s;border:1px solid transparent;color:rgba(240,244,255,.5);background:transparent}
  .em-period-btn.active{background:rgba(96,165,250,.15);color:#60A5FA;border-color:rgba(96,165,250,.3)}
  .em-period-btn:hover:not(.active){color:rgba(240,244,255,.8);background:rgba(255,255,255,.04)}
  .em-plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}
  .em-feats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
  .em-spec-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:13px}
  .em-spec-row:last-child{border-bottom:none}
  .em-check{width:16px;height:16px;flex-shrink:0}
  .em-addons-box{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:32px;margin-top:48px}
  .em-addons-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:20px}
  .em-addon-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:all .25s ease}
  .em-addon-card:hover{background:rgba(255,255,255,.045);border-color:rgba(96,165,250,.25);transform:translateY(-2px)}
  .em-addon-icon{width:46px;height:46px;border-radius:12px;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
  .em-addon-price{text-align:right;flex-shrink:0}
  @media(max-width:900px){.em-plans-grid{grid-template-columns:1fr}.em-addons-grid{grid-template-columns:1fr}}
  @media(max-width:600px){.em-feats-grid{grid-template-columns:1fr}.em-addons-box{padding:22px}.em-addon-card{flex-direction:column;align-items:flex-start}.em-addon-price{text-align:left;margin-top:6px}}
`

const TEXTS: Record<string, Record<Lang, string>> = {
  badge:    { uk: '📧 Корпоративна пошта · IMAP/POP3/SMTP · Spam Protection · SSL', ru: '📧 Корпоративная почта · IMAP/POP3/SMTP · Spam Protection · SSL', en: '📧 Corporate Email · IMAP/POP3/SMTP · Spam Protection · SSL' },
  title1:   { uk: 'Хостинг пошти для', ru: 'Хостинг почты для', en: 'Email hosting for' },
  title2:   { uk: 'вашого бізнесу', ru: 'вашего бизнеса', en: 'your business' },
  sub:      { uk: 'Корпоративні поштові скриньки на вашому домені. Надійний захист від спаму, IMAP/POP3/SMTP та зручний Webmail.', ru: 'Корпоративные почтовые ящики на вашем домене. Надёжная защита от спама, IMAP/POP3/SMTP и удобный Webmail.', en: 'Corporate mailboxes on your domain. Reliable spam protection, IMAP/POP3/SMTP and convenient Webmail.' },
  heroCta:  { uk: 'Обрати тариф →', ru: 'Выбрать тариф →', en: 'Choose Plan →' },
  featTitle: { uk: 'Все, що потрібно для корпоративної пошти', ru: 'Всё, что нужно для корпоративной почты', en: 'Everything you need for corporate email' },
  pricingTitle: { uk: 'Прозорі тарифи', ru: 'Прозрачные тарифы', en: 'Transparent pricing' },
  pricingSub: { uk: 'Оберіть термін — чим довше, тим більша знижка', ru: 'Выберите срок — чем дольше, тем больше скидка', en: 'Choose a term — the longer, the bigger the discount' },
  mo:       { uk: ' / міс', ru: ' / мес', en: ' / mo' },
  orderBtn: { uk: 'Замовити', ru: 'Заказать', en: 'Order Now' },
  trialBtn: { uk: 'Тест 5 днів', ru: 'Тест 5 дней', en: '5-day Trial' },
  popular:  { uk: '🔥 Найпопулярніший', ru: '🔥 Самый популярный', en: '🔥 Most Popular' },
  discount: { uk: 'Знижка 20%', ru: 'Скидка 20%', en: '20% Discount' },
  saving:   { uk: 'Економія:', ru: 'Экономия:', en: 'Save:' },
  mailDomains: { uk: 'Домени для пошти', ru: 'Домены для почты', en: 'Email Domains' },
  accounts: { uk: 'Поштових скриньок', ru: 'Почтовых ящиков', en: 'Mailboxes' },
  disk:     { uk: 'SSD-диск', ru: 'SSD-диск', en: 'SSD Storage' },
  phpMem:   { uk: "Пам'ять PHP", ru: 'Память PHP', en: 'PHP Memory' },
  ip:       { uk: 'Виділена IP-адреса', ru: 'Выделенный IP-адрес', en: 'Dedicated IP address' },
  ssl:      { uk: 'Certum Commercial SSL', ru: 'Certum Commercial SSL', en: 'Certum Commercial SSL' },
  domain:   { uk: 'Домен .com.ua / .com у подарунок', ru: 'Домен .com.ua / .com в подарок', en: 'Free .com.ua / .com Domain' },
  period12: { uk: '12 місяців', ru: '12 месяцев', en: '12 months' },
  period24: { uk: '24 місяці', ru: '24 месяца', en: '24 months' },
  period36: { uk: '36 місяців', ru: '36 месяцев', en: '36 months' },
  includedLabel: { uk: 'Включено:', ru: 'Включено:', en: 'Included:' },
  freeLabel: { uk: 'Безкоштовно', ru: 'Бесплатно', en: 'Free' },
  notIncluded: { uk: 'Не включено', ru: 'Не включено', en: 'Not included' },
  addonsTitle: { uk: 'Додаткові послуги', ru: 'Дополнительные услуги', en: 'Additional Services' },
  addonsSub: { uk: 'Корисні опції для розширення можливостей вашої пошти', ru: 'Полезные опции для расширения возможностей вашей почты', en: 'Useful add-ons to expand your email capabilities' },
  addonIpTitle: { uk: 'Виділена IP-адреса', ru: 'Выделенный IP-адрес', en: 'Dedicated IP address' },
  addonIpDesc: { uk: 'Власна IP-адреса для поштового сервера (в тарифі Про — включено безкоштовно)', ru: 'Собственный IP-адрес для почтового сервера (в тарифе Про — включён бесплатно)', en: 'Dedicated IP for mail server (included free in Pro plan)' },
  addonDiskTitle: { uk: 'Додатковий диск 10 GB', ru: 'Дополнительный диск 10 GB', en: 'Extra Storage 10 GB' },
  addonDiskDesc: { uk: 'Додатковий простір на надшвидких NVMe-дисках для зберігання пошти', ru: 'Дополнительное место на сверхбыстрых NVMe-дисках для хранения почты', en: 'Extra high-speed NVMe storage for mailboxes' },
  perMonth:  { uk: '/міс', ru: '/мес', en: '/mo' },
  termLabel: { uk: 'При оплаті на', ru: 'При оплате на', en: 'When billed for' },
  protocolsLabel: { uk: 'Поштові протоколи', ru: 'Почтовые протоколы', en: 'Mail Protocols' },
  webmailLabel: { uk: 'Вебінтерфейс', ru: 'Веб-интерфейс', en: 'Webmail' },
  forwardingLabel: { uk: 'Переадресація пошти', ru: 'Переадресация почты', en: 'Email Forwarding' },
  antivirusLabel: { uk: 'Антивірусна перевірка', ru: 'Антивирусная проверка', en: 'Antivirus' },
  spamLabel: { uk: 'Перевірка на спам', ru: 'Проверка на спам', en: 'Spam Protection' },
  listsLabel: { uk: 'Списки розсилки', ru: 'Списки рассылки', en: 'Mailing Lists' },
  includedStatus: { uk: 'Включено', ru: 'Включено', en: 'Included' },
  domainTermNote: { uk: 'на 36 міс.', ru: 'на 36 мес.', en: 'on 36 mo.' },
  faqTitle:  { uk: 'Часті запитання про хостинг пошти', ru: 'Частые вопросы о хостинге почты', en: 'Frequently Asked Questions about Email Hosting' },
  faqSub:    { uk: 'Відповіді на популярні питання щодо налаштування та роботи корпоративної пошти HostPro', ru: 'Ответы на популярные вопросы о настройке и работе корпоративной почты HostPro', en: 'Answers to common questions about setting up and managing HostPro corporate email' },
  seoTitle:  { uk: 'Корпоративна пошта для бізнесу', ru: 'Корпоративная почта для бизнеса', en: 'Corporate Email for Business' },
  seoText:   {
    uk: 'Хостинг пошти від HostPro — це надійні корпоративні поштові скриньки на вашому домені. Захист від спаму, підтримка IMAP, POP3 та SMTP, зручний Webmail-доступ з будь-якого пристрою. Включений Certum Commercial SSL і домен .com.ua або .com у подарунок при оплаті на 36 місяців. Ідеально для компаній будь-якого розміру.',
    ru: 'Хостинг почты от HostPro — это надёжные корпоративные почтовые ящики на вашем домене. Защита от спама, поддержка IMAP, POP3 и SMTP, удобный Webmail-доступ с любого устройства. Включён Certum Commercial SSL и домен .com.ua или .com в подарок при оплате на 36 месяцев.',
    en: 'HostPro email hosting provides reliable corporate mailboxes on your domain. Spam protection, IMAP/POP3/SMTP support, and convenient Webmail access from any device. Includes Certum Commercial SSL and a free .com.ua or .com domain when billed for 36 months.',
  },
}

const FEATURES: { icon: string; title: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    icon: '📨',
    title: { uk: 'Поштові протоколи', ru: 'Почтовые протоколы', en: 'Mail Protocols' },
    desc:  { uk: 'POP3, IMAP, SMTP — швидке та зручне підключення пошти на комп’ютерах і смартфонах у будь-яких поштових клієнтах.', ru: 'POP3, IMAP, SMTP — быстрое и удобное подключение почты на компьютерах и смартфонах в любых почтовых клиентах.', en: 'POP3, IMAP, SMTP — fast and convenient mail setup on computers and smartphones in any email clients.' },
  },
  {
    icon: '🔒',
    title: { uk: 'Шифрування SSL', ru: 'Шифрование SSL', en: 'SSL Encryption' },
    desc:  { uk: 'Certum Commercial SSL забезпечує надійне шифрування з\'єднань та конфіденційність усієї кореспонденції.', ru: 'Certum Commercial SSL обеспечивает надёжное шифрование соединений и конфиденциальность всей корреспонденции.', en: 'Certum Commercial SSL provides reliable connection encryption and privacy for all correspondence.' },
  },
  {
    icon: '🌐',
    title: { uk: 'Вебінтерфейс', ru: 'Веб-интерфейс', en: 'Webmail Interface' },
    desc:  { uk: 'Зручний доступ до пошти через браузер з будь-якого пристрою без необхідності встановлення окремих програм.', ru: 'Удобный доступ к почте через браузер с любого устройства без необходимости установки отдельных программ.', en: 'Convenient browser-based email access from any device without needing to install dedicated software.' },
  },
  {
    icon: '🔄',
    title: { uk: 'Переадресація пошти', ru: 'Переадресация почты', en: 'Email Forwarding' },
    desc:  { uk: 'Автоматичне перенаправлення вхідних листів на будь-які інші адреси, поштові аліаси та налаштування автовідповідачів.', ru: 'Автоматическое перенаправление входящих писем на любые другие адреса, почтовые алиасы и настройка автоответчиков.', en: 'Automatic forwarding of incoming emails to any other addresses, email aliases, and autoresponder settings.' },
  },
  {
    icon: '🛡️',
    title: { uk: 'Антивірусна перевірка', ru: 'Антивирусная проверка', en: 'Antivirus Protection' },
    desc:  { uk: 'Постійне сканування вхідної та вихідної кореспонденції для захисту від шкідливого ПЗ, вірусів та небезпечних вкладень.', ru: 'Постоянное сканирование входящей и исходящей корреспонденции для защиты от вредоносного ПО, вирусов и опасных вложений.', en: 'Continuous scanning of incoming and outgoing correspondence to protect against malware, viruses, and dangerous attachments.' },
  },
  {
    icon: '🚫',
    title: { uk: 'Перевірка на спам', ru: 'Проверка на спам', en: 'Spam Protection' },
    desc:  { uk: 'Потужні фільтри SpamExperts та SpamAssassin відсіюють до 99% спаму ще до потрапляння у вашу поштову скриньку.', ru: 'Мощные фильтры SpamExperts и SpamAssassin отсеивают до 99% спама ещё до попадания в ваш почтовый ящик.', en: 'Powerful SpamExperts and SpamAssassin filters screen out up to 99% of spam before it reaches your inbox.' },
  },
  {
    icon: '📋',
    title: { uk: 'Списки розсилки', ru: 'Списки рассылки', en: 'Mailing Lists' },
    desc:  { uk: 'Створюйте списки для швидкого групового листування з колегами, клієнтами та партнерами в один клік.', ru: 'Создавайте списки для быстрой групповой переписки с коллегами, клиентами и партнерами с помощью одного клика.', en: 'Create mailing lists for fast group messaging with colleagues, clients, and partners in one click.' },
  },
  {
    icon: '🎁',
    title: { uk: 'Домен .com.ua у подарунок', ru: 'Домен .com.ua в подарок', en: 'Free .com.ua Domain' },
    desc:  { uk: 'При замовленні будь-якого тарифу на 36 місяців отримайте домен у зоні .com.ua абсолютно безкоштовно.', ru: 'При заказе любого тарифа на 36 месяцев получите домен в зоне .com.ua абсолютно бесплатно.', en: 'Get a free .com.ua domain when ordering any plan for 36 months.' },
  },
  {
    icon: '🌍',
    title: { uk: 'Домен .com у подарунок', ru: 'Домен .com в подарок', en: 'Free .com Domain' },
    desc:  { uk: 'При замовленні будь-якого тарифу на 36 місяців отримайте міжнародний домен у зоні .com абсолютно безкоштовно.', ru: 'При заказе любого тарифа на 36 месяцев получите международный домен в зоне .com абсолютно бесплатно.', en: 'Get a free .com domain when ordering any plan for 36 months.' },
  },
]

const FAQ_ITEMS: { q: Record<Lang, string>; a: Record<Lang, string> }[] = [
  {
    q: {
      uk: 'Що таке хостинг пошти й навіщо він бізнесу?',
      ru: 'Что такое хостинг почты и зачем он бизнесу?',
      en: 'What is email hosting and why does a business need it?',
    },
    a: {
      uk: 'Поштовий хостинг — це окрема послуга, що надає виділений простір на серверах HostPro виключно для приймання, надсилання та безпечного зберігання електронної пошти. На відміну від стандартного хостингу для сайтів, ресурси сервера на 100% оптимізовані під поштові служби та високу швидкість обробки листів. Ця послуга ідеальна для компаній, яким потрібна надійна корпоративна пошта на власному домені — для ділового листування, приймання замовлень та комунікації з клієнтами з гарантованою доставкою у вхідні та захистом від спаму й вірусів.',
      ru: 'Почтовый хостинг — это отдельная услуга, предоставляющая выделенное дисковое пространство на серверах HostPro исключительно для приёма, отправки и надёжного хранения электронной почты. В отличие от стандартного веб-хостинга, ресурсы сервера полностью оптимизированы для стабильной работы почтовых служб. Это идеальное решение для бизнеса, которому необходима надёжная корпоративная почта на собственном домене — для деловой переписки, приёма заявок и поддержки клиентов с гарантированной доставляемостью во «Входящие» и защитой от спама.',
      en: 'Email hosting is a dedicated service providing storage on high-performance HostPro servers exclusively for receiving, sending, and securely managing electronic mail. Unlike generic web hosting, server resources are strictly optimized for mail services, high deliverability, and fast message indexing. It is the perfect solution for businesses requiring dependable corporate email on their own domain — for sales inquiries, partner correspondence, and support with guaranteed inbox delivery and spam screening.',
    },
  },
  {
    q: {
      uk: 'Що входить у хостинг для пошти від HostPro?',
      ru: 'Что входит в хостинг для почты от HostPro?',
      en: 'What is included in HostPro email hosting?',
    },
    a: {
      uk: 'Наш поштовий хостинг містить усе необхідне для зручної та безпечної роботи: сучасний веб-інтерфейс Webmail для доступу через браузер з будь-якого пристрою, підтримку Outlook, Apple Mail, Thunderbird, Gmail та смартфонів за протоколами IMAP, POP3 та SMTP. Також включено комерційний SSL-сертифікат Certum, антивірусну перевірку, захист від спаму SpamExperts та SpamAssassin, щоденні регулярні бекапи, безкоштовний домен .com.ua або .com при оплаті на 36 місяців і можливість замовлення або включену виділену IP-адресу (безкоштовно у тарифі Про).',
      ru: 'Наш хостинг почты включает всё необходимое для безопасной и продуктивной работы: современный Webmail-интерфейс для доступа через браузер с любого устройства, поддержку популярных почтовых программ (Outlook, Apple Mail, Thunderbird, Gmail) по протоколам IMAP, POP3 и SMTP. Каждый тариф включает SSL-сертификат Certum, антивирусную проверку, фильтрацию спама SpamExperts и SpamAssassin, регулярные резервные копии, бесплатный домен .com.ua или .com при оплате на 36 месяцев и выделенный IP-адрес (бесплатно в тарифе Про).',
      en: 'Our email hosting includes everything needed for reliable and secure communication: modern Webmail browser access from any device, full compatibility with Outlook, Apple Mail, Thunderbird, and mobile apps via IMAP, POP3, and SMTP. Each plan also includes commercial Certum SSL encryption, proactive antivirus, SpamExperts & SpamAssassin filtering, automated backups, a free .com.ua or .com domain on 36-month billing, and dedicated IP options (free in the Pro plan).',
    },
  },
  {
    q: {
      uk: 'Навіщо поштовому хостингу виділена IP-адреса?',
      ru: 'Зачем почтовому хостингу выделенный IP-адрес?',
      en: 'Why does email hosting need a dedicated IP address?',
    },
    a: {
      uk: 'Виділена IP-адреса закріплюється виключно за вашим поштовим акаунтом і допомагає зберігати бездоганну репутацію відправника. Якщо на окремій IP працює лише ваша пошта — сторонні користувачі не зможуть зіпсувати її репутацію масовими розсилками. Це зводить до нуля ризик потрапляння ваших листів до спаму або блокування поштовими сервісами на кшталт Gmail, Outlook та Yahoo. У тарифі «Пошта Про» виділена IP-адреса надається безкоштовно, а для інших тарифів її можна підключити всього за $4.00/міс.',
      ru: 'Выделенный IP-адрес закрепляется исключительно за вашим почтовым сервером и гарантирует чистую репутацию отправителя. На общем IP действия других пользователей могут негативно сказаться на доставляемости. Персональный IP полностью изолирует вашу почту от соседей, защищая коммерческие письма от попадания в спам и блокировок со стороны Gmail, Outlook и других глобальных провайдеров. В тарифе «Почта Про» выделенный IP предоставляется бесплатно, а для остальных тарифов доступен как опция за $4.00/мес.',
      en: 'A dedicated IP address is assigned exclusively to your mail account and preserves an uncompromised sender reputation. When only your organization uses that IP, external users cannot degrade its score with unauthorized or spam mailings. This ensures maximum inbox delivery and eliminates blocks by major services like Gmail, Outlook, and Yahoo. A dedicated IP is included free in our Mail Pro plan, and available for only $4.00/mo on other plans.',
    },
  },
  {
    q: {
      uk: 'Які поштові скриньки можна розміщувати на хостингу?',
      ru: 'Какие почтовые ящики можно размещать на хостинге?',
      en: 'What mailboxes can be hosted on the service?',
    },
    a: {
      uk: 'Найчастіше цю послугу використовують як хостинг для корпоративної пошти — для обміну листами всередині команди та з клієнтами на ваших доменних іменах (наприклад, info@vash-domen.com, sales@, support@ тощо). Ви самі визначаєте, скільки скриньок створити (від 50 до 1000 залежно від тарифу), який обсяг диска виділити кожній та як ними керувати. Ми надаємо зручне керування поштовими DNS-записами (MX, SPF, DKIM, DMARC), аліасами та правилами переадресації.',
      ru: 'Чаще всего услугу используют именно как хостинг для корпоративной почты — для защищённого обмена письмами внутри команды и с клиентами на собственных доменах (например, info@vash-domen.com, sales@, support@). Вы сами определяете, сколько ящиков создать (от 50 до 1000 в зависимости от тарифа), какой объём выделить каждому сотруднику и как настроить маршрутизацию. Предоставляется удобное управление DNS-записями (MX, SPF, DKIM, DMARC), алиасами и автоответчиками.',
      en: 'Most often this service is used as dedicated corporate email hosting — for seamless communication within teams and with clients on your custom domain (e.g., info@yourdomain.com, sales@, support@). You decide how many mailboxes to create (from 50 up to 1,000 depending on the plan), how much storage quota to allocate to each, and how forwarding rules are applied. Full support for critical DNS records (MX, SPF, DKIM, DMARC) ensures complete protection against spoofing.',
    },
  },
]

const T_PERIOD: Record<Period, Record<Lang, string>> = {
  '1':  { uk: '1 місяць',  ru: '1 месяц',    en: '1 month' },
  '12': { uk: '12 місяців', ru: '12 месяцев', en: '12 months' },
  '36': { uk: '36 місяців', ru: '36 месяцев', en: '36 months' },
}

const DISCOUNT_LABEL: Record<Period, Record<Lang, string | null>> = {
  '1':  { uk: null,   ru: null,   en: null },
  '12': { uk: '−20%', ru: '−20%', en: '−20%' },
  '36': { uk: '−31%', ru: '−31%', en: '−31%' },
}

export default function EmailHostingClient({ lang }: { lang: Lang }) {
  const [period, setPeriod] = useState<Period>('12')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const p = lang === 'en' ? '' : `/${lang}`
  const plans = PLANS[period]
  const T = getT(lang)

  const t = (key: string): string => {
    const entry = TEXTS[key]
    return entry ? entry[lang] || entry['uk'] : key
  }

  const handleBuy = (priceId: string) => {
    if (!priceId) return
    if (!(window as any).Paddle) {
      alert('Paddle is still loading, please wait a moment...')
      return
    }
    const Paddle = (window as any).Paddle
    Paddle.Initialize({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_5479fe94fca51b60d7791b81725',
    })
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const urlParams = new URLSearchParams(window.location.search)
    const priceParam = urlParams.get('price') || urlParams.get('priceId')
    if (priceParam) {
      setTimeout(() => handleBuy(priceParam), 800)
    }
  }, [])

  const fmtPrice = (val: number) => val.toFixed(2)

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HERO ── */}
      <section
        className="grid-bg"
        style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 90, paddingBottom: 60 }}
      >
        <div className="orb em-orb" style={{ width: 700, height: 700, background: 'radial-gradient(circle,rgba(96,165,250,.13),transparent)', top: '5%', left: '50%', transform: 'translateX(-50%)', position: 'absolute' }} />
        <div style={{ textAlign: 'center', maxWidth: 860, padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <Breadcrumbs lang={lang} page="email-hosting" pageName={t('title1') + ' ' + t('title2')} />
          <div
            className="em-badge-anim"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(96,165,250,.1)', border: '1px solid rgba(96,165,250,.25)', borderRadius: 100, padding: '6px 18px', fontSize: 13, color: '#60A5FA', marginBottom: 32, fontWeight: 500 }}
          >
            {t('badge')}
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,70px)', lineHeight: 1.08, letterSpacing: '-2px', marginBottom: 24 }}>
            <span style={{ display: 'block', color: '#F0F4FF' }}>{t('title1')}</span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg,#60A5FA,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('title2')}</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(240,244,255,.6)', lineHeight: 1.75, maxWidth: 680, margin: '0 auto 44px', fontWeight: 300 }}>
            {t('sub')}
          </p>
          <Link
            href="#email-pricing"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: 14, fontWeight: 700, fontSize: 17, boxShadow: '0 0 40px rgba(59,130,246,.25)', transition: 'all .2s' }}
            className="hp-cta-link"
          >
            {t('heroCta')}
          </Link>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section>
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
              {t('featTitle')}
            </h2>
          </FadeIn>
          <div className="em-feats-grid">
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 80} className="em-feat-card">
                <div style={{ fontSize: 38, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{f.title[lang]}</h3>
                <p style={{ fontSize: 14, color: 'rgba(240,244,255,.55)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc[lang]}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="email-pricing">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
              {t('pricingTitle')}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{t('pricingSub')}</p>
          </FadeIn>

          {/* Period toggle */}
          <FadeIn style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 4, gap: 4 }}>
              {(['1', '12', '36'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`em-period-btn${period === p ? ' active' : ''}`}
                >
                  {T_PERIOD[p][lang]}
                  {DISCOUNT_LABEL[p][lang] && (
                    <span style={{
                      marginLeft: 7,
                      background: period === p ? 'rgba(96,165,250,.2)' : 'rgba(110,231,183,.08)',
                      color: period === p ? '#60A5FA' : '#6EE7B7',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 6,
                      border: period === p ? '1px solid rgba(96,165,250,.3)' : '1px solid rgba(110,231,183,.15)',
                    }}>
                      {DISCOUNT_LABEL[p][lang]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Cards */}
          <FadeIn>
            <div className="em-plans-grid">
              {plans.map((plan, i) => (
                <div key={plan.id} className={`em-plan-card${plan.popular ? ' popular' : ''}`}>
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F43F5E,#E11D48)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                      {t('popular')}
                    </div>
                  )}

                  {/* Name + desc */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: plan.color, boxShadow: `0 0 14px ${plan.color}`, flexShrink: 0 }} />
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800 }}>{plan.name[lang]}</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', fontWeight: 300, lineHeight: 1.5 }}>{plan.desc[lang]}</p>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', textDecoration: 'line-through', marginBottom: 2, visibility: plan.priceOld > plan.price ? 'visible' : 'hidden' }}>
                      ${fmtPrice(plan.priceOld)}{t('mo')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 38, fontWeight: 800, color: plan.popular ? '#FB7185' : '#fff', lineHeight: 1 }}>
                        ${fmtPrice(plan.price)}
                      </span>
                      <span style={{ fontSize: 14, color: 'rgba(240,244,255,.4)', fontWeight: 400 }}>{t('mo')}</span>
                    </div>
                  </div>

                  {/* Saving */}
                  <div style={{ minHeight: 30, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                    {plan.savings > 0 && (
                      <div style={{ fontSize: 12, color: '#6EE7B7', background: 'rgba(110,231,183,.08)', border: '1px solid rgba(110,231,183,.15)', borderRadius: 8, padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {t('saving')} <strong>${fmtPrice(plan.savings)}</strong>
                      </div>
                    )}
                  </div>

                  {/* Period note */}
                  <div style={{ fontSize: 12, color: 'rgba(240,244,255,.35)', marginBottom: 20 }}>
                    {t('termLabel')} {T_PERIOD[period][lang]}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBuy(plan.priceId)}
                    className={`em-btn ${plan.popular ? 'em-btn-primary' : 'em-btn-secondary'}`}
                  >
                    {t('orderBtn')}
                  </button>

                  {/* Specs */}
                  <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                    <p style={{ fontSize: 11, color: 'rgba(240,244,255,.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
                      {t('includedLabel')}
                    </p>
                    {[
                      { label: t('mailDomains'), val: plan.mailDomains },
                      { label: t('accounts'),    val: plan.accounts },
                      { label: t('disk'),        val: plan.disk },
                    ].map((row, ri) => (
                      <div key={ri} className="em-spec-row">
                        <span style={{ color: 'rgba(240,244,255,.5)' }}>{row.label}</span>
                        <span style={{ color: '#fff', fontWeight: 600 }}>{row.val}</span>
                      </div>
                    ))}
                    {/* Dedicated IP */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)' }}>{t('ip')}</span>
                      {plan.hasDedicatedIp ? (
                        <span style={{ color: '#6EE7B7', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                          <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#10B981" fillOpacity=".2"/><path d="M5 8l2 2 4-4" stroke="#6EE7B7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {t('freeLabel')}
                        </span>
                      ) : (
                        <span style={{ color: 'rgba(240,244,255,.35)', fontSize: 12, fontWeight: 500 }}>{t('notIncluded')}</span>
                      )}
                    </div>
                    {/* Protocols */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)' }}>{t('protocolsLabel')}</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>POP3, IMAP, SMTP</span>
                    </div>
                    {/* SSL */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('ssl')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('freeLabel')}</span>
                    </div>
                    {/* Webmail */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('webmailLabel')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('includedStatus')}</span>
                    </div>
                    {/* Forwarding */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('forwardingLabel')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('includedStatus')}</span>
                    </div>
                    {/* Antivirus */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('antivirusLabel')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('includedStatus')}</span>
                    </div>
                    {/* Spam check */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('spamLabel')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('includedStatus')}</span>
                    </div>
                    {/* Mailing lists */}
                    <div className="em-spec-row">
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity=".15"/><path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {t('listsLabel')}
                      </span>
                      <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('includedStatus')}</span>
                    </div>
                    {/* Domain */}
                    <div className="em-spec-row" style={{ borderBottom: 'none' }}>
                      <span style={{ color: 'rgba(240,244,255,.5)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg className="em-check" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill={plan.color} fillOpacity={period === '36' ? '.15' : '.06'}/>
                          <path d="M5 8l2 2 4-4" stroke={period === '36' ? plan.color : 'rgba(240,244,255,.3)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('domain')}
                      </span>
                      {period === '36' ? (
                        <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>{t('freeLabel')}</span>
                      ) : (
                        <span style={{ color: 'rgba(240,244,255,.35)', fontSize: 11, fontWeight: 500 }}>{t('domainTermNote')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── ADDITIONAL SERVICES ── */}
          <FadeIn>
            <div className="em-addons-box">
              <div style={{ marginBottom: 4 }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(20px,3vw,26px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                  {t('addonsTitle')}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(240,244,255,.45)', fontWeight: 300, margin: 0 }}>
                  {t('addonsSub')}
                </p>
              </div>
              <div className="em-addons-grid">
                <div className="em-addon-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="em-addon-icon">🌐</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                        {t('addonIpTitle')}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', fontWeight: 300, lineHeight: 1.4 }}>
                        {t('addonIpDesc')}
                      </div>
                    </div>
                  </div>
                  <div className="em-addon-price">
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#60A5FA' }}>$4.00</span>
                    <span style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', fontWeight: 400 }}>{t('mo')}</span>
                  </div>
                </div>

                <div className="em-addon-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="em-addon-icon">💾</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                        {t('addonDiskTitle')}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', fontWeight: 300, lineHeight: 1.4 }}>
                        {t('addonDiskDesc')}
                      </div>
                    </div>
                  </div>
                  <div className="em-addon-price">
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#60A5FA' }}>$7.00</span>
                    <span style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', fontWeight: 400 }}>{t('mo')}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div className="section-container" style={{ maxWidth: 840 }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
              {t('faqTitle')}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(240,244,255,.5)', fontWeight: 300, margin: 0 }}>
              {t('faqSub')}
            </p>
          </FadeIn>

          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isOpen ? 'rgba(96, 165, 250, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                      borderRadius: 16,
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: isOpen ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '22px 26px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 16,
                        gap: 16,
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        color: isOpen ? '#60A5FA' : '#F0F4FF',
                        transition: 'color 0.25s ease',
                        fontFamily: 'Syne, sans-serif',
                      }}
                    >
                      <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4 }}>{item.q[lang]}</span>
                      <div
                        style={{
                          flexShrink: 0,
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: isOpen ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: isOpen ? '#60A5FA' : 'rgba(240, 244, 255, 0.4)',
                          transition: 'all 0.3s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>
                    <div
                      style={{
                        maxHeight: isOpen ? 600 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <div
                        style={{
                          padding: '0 26px 24px',
                          fontSize: 15,
                          color: 'rgba(240, 244, 255, 0.65)',
                          lineHeight: 1.75,
                          fontWeight: 300,
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                          paddingTop: 18,
                        }}
                      >
                        {item.a[lang]}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SEO TEXT ── */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,.05)', background: 'rgba(255,255,255,.01)' }}>
        <div className="section-container" style={{ maxWidth: 900 }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 20, color: '#fff' }}>
              {t('seoTitle')}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', lineHeight: 1.85, fontWeight: 300 }}>
              {t('seoText')}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

