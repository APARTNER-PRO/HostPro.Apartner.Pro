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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
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
        if (href && (href.includes('plan=') && href.includes('billing='))) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#60A5FA', '#A78BFA', '#FB923C', '#F472B6'],
            zIndex: 9999
          });
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
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
          messages: [...messages, userMessage]
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
              ref={i === messages.length - 1 && msg.role === 'assistant' ? assistantMessageRef : null}
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
                        const chipsRegex = /\[CHIPS:\s*(.*?)\]/i;
                        return msg.content.replace(chipsRegex, '').trim();
                      })()}
                    </ReactMarkdown>
                    {(() => {
                      const match = msg.content.match(/\[CHIPS:\s*(.*?)\]/i);
                      if (match) {
                        const chips = match[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                        return (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                            {chips.map(chip => (
                              <button 
                                key={chip}
                                onClick={() => handleSubmit({ preventDefault: () => {} } as any, chip)}
                                className="hp-chat-chip"
                              >
                                {chip}
                              </button>
                            ))}
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
                onClick={() => {
                  setInput(chip);
                  setTimeout(() => {
                    const btn = document.getElementById('chat-submit-btn');
                    btn?.click();
                  }, 50);
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
