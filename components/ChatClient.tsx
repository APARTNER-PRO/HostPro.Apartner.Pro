'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import { Lang, getT } from '@/lib/i18n';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatClient({ lang = 'uk' }: { lang?: Lang }) {
  const T = useMemo(() => getT(lang).chat, [lang]);
  const p = lang === 'en' ? '' : `/${lang}`;

  // Smart chips based on conversation context - always reliable, never depends on AI output
  const getSmartChips = (lastContent: string): string[] => {
    const chipMatch = lastContent.match(/\[(?:CHIPS|ЧЕПС|CHIP|ЧИПС):\s*(.*)\]/i);
    if (chipMatch) {
      try {
        const raw = chipMatch[1];
        return raw.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      } catch (e) {
        console.error('Failed to parse chips', e);
      }
    }

    const c = lastContent.toLowerCase();
    const isUk = lang === 'uk';
    const isRu = lang === 'ru';

    if (c.includes('agency')) {
      return isUk
        ? ['Хочу купити Agency – Квартал', 'Хочу купити Agency – Рік', 'Хочу купити Agency – 3 роки']
        : isRu
        ? ['Хочу купить Agency – Квартал', 'Хочу купить Agency – Год', 'Хочу купить Agency – 3 года']
        : ['Buy Agency – Quarterly', 'Buy Agency – Yearly', 'Buy Agency – 3 Years'];
    }
    if (c.includes('agency pro')) {
      return isUk
        ? ['Хочу купити Agency Pro – Квартал', 'Хочу купити Agency Pro – Рік', 'Хочу купити Agency Pro – 3 роки']
        : isRu
        ? ['Хочу купить Agency Pro – Квартал', 'Хочу купить Agency Pro – Год', 'Хочу купить Agency Pro – 3 года']
        : ['Buy Agency Pro – Quarterly', 'Buy Agency Pro – Yearly', 'Buy Agency Pro – 3 Years'];
    }
    if (c.includes('business')) {
      return isUk
        ? ['Хочу купити Business – Квартал', 'Хочу купити Business – Рік', 'Хочу купити Business – 3 роки']
        : isRu
        ? ['Хочу купить Business – Квартал', 'Хочу купить Business – Год', 'Хочу купить Business – 3 года']
        : ['Buy Business – Quarterly', 'Buy Business – Yearly', 'Buy Business – 3 Years'];
    }
    return isUk
      ? ['Допоможи обрати тариф', 'Скільки коштує Agency?', 'Чи є знижки?']
      : isRu
      ? ['Помоги выбрать тариф', 'Сколько стоит Agency?', 'Есть ли скидки?']
      : ['Help me choose a plan', 'How much is Agency?', 'Are there discounts?'];
  };

  const getChipUrl = (chip: string): string | null => {
    const map: Record<string, string> = {
      'Хочу купити Agency – Квартал': `${p}?plan=agency&billing=quarterly`,
      'Хочу купити Agency – Рік': `${p}?plan=agency&billing=yearly`,
      'Хочу купити Agency – 3 роки': `${p}?plan=agency&billing=threeYears`,
      'Хочу купити Agency Pro – Квартал': `${p}?plan=agency-pro&billing=quarterly`,
      'Хочу купити Agency Pro – Рік': `${p}?plan=agency-pro&billing=yearly`,
      'Хочу купити Agency Pro – 3 роки': `${p}?plan=agency-pro&billing=threeYears`,
      'Хочу купити Business – Квартал': `${p}?plan=business&billing=quarterly`,
      'Хочу купити Business – Рік': `${p}?plan=business&billing=yearly`,
      'Хочу купити Business – 3 роки': `${p}?plan=business&billing=threeYears`,
      'Хочу купить Agency – Квартал': `${p}?plan=agency&billing=quarterly`,
      'Хочу купить Agency – Год': `${p}?plan=agency&billing=yearly`,
      'Хочу купить Agency – 3 года': `${p}?plan=agency&billing=threeYears`,
      'Хочу купить Agency Pro – Квартал': `${p}?plan=agency-pro&billing=quarterly`,
      'Хочу купить Agency Pro – Год': `${p}?plan=agency-pro&billing=yearly`,
      'Хочу купить Agency Pro – 3 года': `${p}?plan=agency-pro&billing=threeYears`,
      'Хочу купить Business – Квартал': `${p}?plan=business&billing=quarterly`,
      'Хочу купить Business – Год': `${p}?plan=business&billing=yearly`,
      'Хочу купить Business – 3 года': `${p}?plan=business&billing=threeYears`,
      'Buy Agency – Quarterly': `${p}?plan=agency&billing=quarterly`,
      'Buy Agency – Yearly': `${p}?plan=agency&billing=yearly`,
      'Buy Agency – 3 Years': `${p}?plan=agency&billing=threeYears`,
      'Buy Agency Pro – Quarterly': `${p}?plan=agency-pro&billing=quarterly`,
      'Buy Agency Pro – Yearly': `${p}?plan=agency-pro&billing=yearly`,
      'Buy Agency Pro – 3 Years': `${p}?plan=agency-pro&billing=threeYears`,
      'Buy Business – Quarterly': `${p}?plan=business&billing=quarterly`,
      'Buy Business – Yearly': `${p}?plan=business&billing=yearly`,
      'Buy Business – 3 Years': `${p}?plan=business&billing=threeYears`,
    };
    return map[chip] || null;
  };
  
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize with localized welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: T.welcome }]);
    }
  }, [T.welcome, messages.length]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const assistantMessageRef = useRef<HTMLDivElement>(null);
  const userMessageRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) {
      // Scroll to the user's message so it stays in view while AI is "typing"
      if (userMessageRef.current) {
        userMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        scrollToBottom();
      }
    } else if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        assistantMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        scrollToBottom();
      }
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target) {
        const href = target.getAttribute('href');
        // Detect payment links
        if (href && (href.includes('plan=') && href.includes('billing='))) {
          // Prevent immediate redirection
          e.preventDefault();
          e.stopPropagation();

          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#60A5FA', '#A78BFA', '#FB923C', '#F472B6'],
            zIndex: 9999
          });

          // Open in new tab after a short delay so user sees confetti
          setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
          }, 500);
        }
      }
    };

    // Use capture phase to intercept the click before other handlers
    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  const handleSubmit = async (e: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const messageContent = overrideInput || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    if (!overrideInput) setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          lang: lang
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setMessages((prev) => [...prev, data]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'An error occurred while communicating with the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Syne', sans-serif",
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px', color: '#fff' }}>
          {T.title}
        </h1>
        <p style={{ color: 'rgba(240, 244, 255, 0.6)' }}>
          {T.sub}
        </p>
      </div>

      <div style={{
        flex: 1,
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      }}>
        
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px', // Increased gap for better separation
          maxHeight: '600px', // Increased height
          paddingRight: '10px'
        }}>
          {messages.map((msg, i) => (
            <div 
              key={i} 
              ref={
                i === messages.length - 1 
                  ? (msg.role === 'assistant' ? assistantMessageRef : userMessageRef) 
                  : null
              }
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxWidth: '85%',
                scrollMarginTop: '40px', // Added offset for better scrolling
              }}>
              {msg.role === 'assistant' && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginLeft: '4px',
                  marginBottom: '2px' 
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--grad)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    animation: isLoading ? 'hp-bounce 1s infinite ease-in-out' : 'none'
                  }}>
                    🤖
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    HostPro AI
                  </span>
                </div>
              )}
              <div style={{
                background: msg.role === 'user' ? 'linear-gradient(135deg, #F43F5E, #E11D48)' : 'rgba(255, 255, 255, 0.06)',
                padding: '16px 22px',
                borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '4px 24px 24px 24px',
                color: '#fff',
                lineHeight: 1.6,
                fontSize: '15px',
                border: msg.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                boxShadow: msg.role === 'user' ? '0 10px 20px rgba(244, 63, 94, 0.15)' : 'none',
                backdropFilter: msg.role === 'assistant' ? 'blur(10px)' : 'none',
              }}>
                {msg.role === 'assistant' ? (
                  <div className="chat-markdown chat-markdown-container" style={{ fontSize: '15px', lineHeight: '1.6', color: 'rgba(240,244,255,0.9)' }}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <Link 
                            href={props.href || '#'} 
                            className="hp-chat-btn"
                            target="_blank"
                            {...props}
                          >
                            {props.children}
                          </Link>
                        )
                      }}
                    >
                      {(() => {
                        const content = msg.content || '';
                        return content
                          .replace(/\[(CHIPS|ЧЕПС|ЧИПС|CHIP):[\s\S]*?\]/gi, '')
                          .replace(/\[CONTACT_FORM\]/gi, '')
                          .trim();
                      })()}
                    </ReactMarkdown>
                    {(() => {
                      const content = msg.content || '';
                      if (i === messages.length - 1 && msg.role === 'assistant' && !isLoading) {
                        const chips = getSmartChips(content);
                        return (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                            {chips.map(chip => {
                              const url = getChipUrl(chip);
                              return url ? (
                                <a
                                  key={chip}
                                  href={url}
                                  className="hp-chat-chip"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = url;
                                  }}
                                >
                                  {chip}
                                </a>
                              ) : (
                                <button
                                  key={chip}
                                  onClick={() => handleSubmit({ preventDefault: () => {} } as any, chip)}
                                  className="hp-chat-chip"
                                >
                                  {chip}
                                </button>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {(() => {
                      const content = msg.content || '';
                      if (content.includes('[CONTACT_FORM]') && i === messages.length - 1 && !isLoading) {
                        return (
                          <div style={{
                            marginTop: '16px',
                            padding: '16px',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}>
                            <div style={{ fontSize: '14px', marginBottom: '12px', fontWeight: 600 }}>{T.contactFormTitle || 'Leave your contact:'}</div>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const inputEl = e.currentTarget.elements.namedItem('contact') as HTMLInputElement;
                              const contactVal = inputEl.value.trim();
                              if (contactVal) {
                                // 1. Send data to backend (Telegram)
                                fetch('/api/lead', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ contact: contactVal, messages })
                                }).catch(console.error);

                                // 2. Add to chat flow so AI can acknowledge
                                handleSubmit(e, `${T.contactFormPrefix || 'My contact for the manager: '}${contactVal}`);
                              }
                            }} style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                name="contact"
                                type="text" 
                                placeholder={T.contactFormPlaceholder || 'Email or Telegram...'} 
                                style={{
                                  flex: 1,
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#fff',
                                  padding: '10px 14px',
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  outline: 'none'
                                }}
                              />
                              <button 
                                type="submit"
                                style={{
                                  background: 'var(--grad)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '0 16px',
                                  color: '#fff',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  fontSize: '14px'
                                }}
                              >
                                {T.contactFormSubmit || 'Send'}
                              </button>
                            </form>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '12px 20px',
              borderRadius: '16px 16px 16px 4px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              <div className="dot-pulse"></div>
              <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)', marginLeft: '15px' }}>
                {T.typing}
              </span>
            </div>
          )}
          {error && (
            <div style={{
              alignSelf: 'center',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#FCA5A5',
              padding: '14px 24px',
              borderRadius: '16px',
              fontSize: '14px',
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{T.error}</div>
              {error}
              {error.includes('OPENROUTER_API_KEY') && (
                <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                  Перевірте налаштування API у файлі .env.local
                </div>
              )}
              {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    setError(null);
                    try {
                      const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages, lang }),
                      });
                      const data = await response.json();
                      if (!response.ok) throw new Error(data.error || 'Failed to fetch response');
                      setMessages((prev) => [...prev, data]);
                    } catch (err: any) {
                      setError(err.message || 'An error occurred.');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  style={{
                    display: 'block',
                    margin: '12px auto 0',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#FCA5A5',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                >
                  {(T as any).tryAgain || 'Try again'}
                </button>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Chips */}
        {!isLoading && messages.length <= 1 && (T as any).chips && (
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap', 
            padding: '0 20px 12px',
            marginTop: 'auto'
          }}>
            {(T as any).chips.map((chip: string) => (
              <button
                key={chip}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, chip);
                }}
                className="hp-chat-chip"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={T.inputPlaceholder}
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              padding: '12px 18px',
              fontSize: '15px',
              outline: 'none',
              fontFamily: "'Syne', sans-serif",
            }}
          />
          <button
            id="chat-submit-btn"
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              background: 'var(--grad)',
              border: 'none',
              borderRadius: '14px',
              padding: '0 20px',
              color: '#fff',
              fontWeight: 700,
              cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !input.trim()) ? 0.6 : 1,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
          >
            <span>{T.send}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
