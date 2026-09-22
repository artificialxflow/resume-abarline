import React from 'react';
import { COMPANY, type DeckSlide } from '../data/portfolioData';
import { BrandMark } from './BrandMark';
import { SafeImg } from './SafeImg';

const SLIDE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  boxSizing: 'border-box',
  fontFamily: 'Vazirmatn, Tahoma, sans-serif',
};

function Frame({
  slide,
  children,
  pad = '2.2vmin',
}: {
  slide: DeckSlide;
  children: React.ReactNode;
  pad?: number | string;
}) {
  const dark = slide.theme === 'dark';
  return (
    <div
      data-slide={slide.id}
      style={{
        ...SLIDE,
        padding: pad,
        color: dark ? '#eef4f8' : '#14202b',
        background: dark
          ? 'radial-gradient(1200px 700px at 12% -10%, #163046 0%, #0a1018 55%, #070b12 100%)'
          : 'linear-gradient(180deg, #f7f3ec 0%, #fffdf8 48%, #f3eee6 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: dark
            ? 'radial-gradient(800px 400px at 88% 110%, rgba(20, 184, 166, 0.16), transparent 55%)'
            : 'radial-gradient(700px 360px at 100% 0%, rgba(196, 161, 90, 0.12), transparent 50%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Kicker({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexShrink: 0 }}>
      <span
        style={{
          width: 24,
          height: 3,
          borderRadius: 99,
          background: dark ? '#2dd4bf' : '#0f766e',
        }}
      />
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: dark ? '#5eead4' : '#0f766e',
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Footer({ dark }: { dark?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        marginTop: 12,
        paddingTop: 10,
        borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(20,32,43,0.08)',
        fontSize: 15,
        color: dark ? '#8aa0b5' : '#6b7c8d',
      }}
    >
      <span>{COMPANY.legalName}</span>
      <span>{COMPANY.website.replace('https://', '')}</span>
    </div>
  );
}

function Photo({
  src,
  alt,
  fallbacks,
  radius = 22,
}: {
  src: string;
  alt: string;
  fallbacks?: string[];
  radius?: number;
}) {
  return (
    <div
      style={{
        borderRadius: radius,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.5)',
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <SafeImg
        src={src}
        alt={alt}
        fallbacks={fallbacks}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  );
}

function CoverSlide({ slide }: { slide: DeckSlide }) {
  const shots = slide.images;
  return (
    <Frame slide={slide}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BrandMark size={52} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#99f6e4' }}>{COMPANY.legalName}</div>
            <div style={{ fontSize: 15, color: '#8aa0b5', marginTop: 2 }}>{slide.kicker}</div>
          </div>
        </div>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid rgba(45,212,191,0.35)',
            color: '#99f6e4',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          ارائه زنده از وب
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: 32,
          flex: 1,
          minHeight: 0,
          alignItems: 'stretch',
          margin: '20px 0 16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
          <div style={{ fontSize: 'clamp(40px, 7.2vmin, 84px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>{slide.title}</div>
          <div style={{ fontSize: 'clamp(18px, 2.6vmin, 28px)', fontWeight: 700, color: '#5eead4', marginTop: 16, lineHeight: 1.4 }}>
            {slide.subtitle}
          </div>
          <div style={{ fontSize: 'clamp(14px, 1.7vmin, 20px)', color: '#b7c5d3', marginTop: 14, lineHeight: 1.65, maxWidth: 700 }}>
            {COMPANY.lead}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 12,
            minHeight: 0,
          }}
        >
          {shots.slice(0, 6).map((src, i) => (
            <div
              key={src + i}
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: '#101826',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: 0,
              }}
            >
              <SafeImg src={src} alt="" fallbacks={shots} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, flexShrink: 0 }}>
        {(slide.stats || []).map((s) => (
          <div
            key={s.label}
            style={{
              padding: '12px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 800, color: '#5eead4' }}>{s.value}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: '#8aa0b5' }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function AboutSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} dark />
      <div style={{ fontSize: 'clamp(26px, 3.8vmin, 44px)', fontWeight: 800, lineHeight: 1.2, flexShrink: 0 }}>{slide.title}</div>
      <div style={{ fontSize: 20, color: '#9fb1c3', marginTop: 8, marginBottom: 16, lineHeight: 1.55, flexShrink: 0 }}>
        {slide.subtitle}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 24, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          {(slide.bullets || []).map((b) => (
            <div
              key={b}
              style={{
                padding: '12px 16px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: 18,
                lineHeight: 1.55,
                color: '#d7e2ec',
                flex: 1,
                minHeight: 0,
              }}
            >
              {b}
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flexShrink: 0 }}>
            {(slide.stats || []).map((s) => (
              <div key={s.label} style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(45,212,191,0.08)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#5eead4' }}>{s.value}</div>
                <div style={{ fontSize: 14, color: '#c5d4e0' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1.2fr 0.8fr', gap: 12, minHeight: 0 }}>
          <Photo src={slide.images[0]} alt="محصولات ابرلاین" fallbacks={slide.images} />
          <Photo src={slide.images[1] || slide.images[0]} alt="جزئیات محصول" fallbacks={slide.images} />
        </div>
      </div>
      <Footer dark />
    </Frame>
  );
}

function PillarsSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} />
      <div style={{ fontSize: 'clamp(26px, 3.6vmin, 42px)', fontWeight: 800, marginBottom: 16, flexShrink: 0 }}>{slide.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
        {(slide.pillars || []).map((p) => (
          <div
            key={p.title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 12px 28px rgba(20,32,43,0.08)',
              border: '1px solid rgba(20,32,43,0.06)',
              minHeight: 0,
            }}
          >
            <div style={{ flex: '1 1 0', minHeight: 0, background: '#eef3f1' }}>
              <SafeImg
                src={p.image}
                alt={p.title}
                fallbacks={slide.images}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '16px 18px 18px', flexShrink: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{p.title}</div>
              {p.items.map((item) => (
                <div key={item} style={{ fontSize: 17, color: '#3d5163', display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#0f766e', fontWeight: 800 }}>▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Frame>
  );
}

function EcosystemSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 20,
          flexShrink: 0,
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 'clamp(24px, 3.4vmin, 40px)', fontWeight: 800, lineHeight: 1.2 }}>{slide.title}</div>
        <div style={{ fontSize: 16, color: '#5b6d7d', maxWidth: 560, lineHeight: 1.5 }}>{slide.subtitle}</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
          flex: 1,
          minHeight: 0,
        }}
      >
        {(slide.tiles || []).map((t) => (
          <div
            key={t.id}
            style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(20,32,43,0.06)',
              boxShadow: '0 8px 20px rgba(20,32,43,0.05)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div style={{ flex: 1, minHeight: 0, background: '#f3f1eb' }}>
              <SafeImg
                src={t.image}
                alt={t.title}
                fallbacks={t.extras}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '8px 10px 10px', flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: '#0f766e', fontWeight: 700 }}>{t.tag}</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{t.title}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Frame>
  );
}

function HeroSlide({ slide }: { slide: DeckSlide }) {
  const dark = slide.theme === 'dark';
  return (
    <Frame slide={slide}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', gap: 28, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <Kicker text={slide.kicker} dark={dark} />
          <div style={{ fontSize: 'clamp(24px, 3.4vmin, 40px)', fontWeight: 800, lineHeight: 1.2, flexShrink: 0 }}>{slide.title}</div>
          <div style={{ fontSize: 18, marginTop: 8, lineHeight: 1.5, color: dark ? '#9fb1c3' : '#4b5d6e', flexShrink: 0 }}>
            {slide.subtitle}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14, flexShrink: 0 }}>
            {(slide.bullets || []).map((b) => (
              <div
                key={b}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)',
                  border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(20,32,43,0.06)',
                  fontSize: 18,
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: dark ? '#5eead4' : '#0f766e', fontWeight: 800 }}>●</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          {slide.images.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, minHeight: 0, marginTop: 12 }}>
              {slide.images.slice(1, 3).map((src) => (
                <Photo key={src} src={src} alt="" fallbacks={slide.images} radius={16} />
              ))}
            </div>
          )}
        </div>
        <Photo src={slide.images[0]} alt={slide.title} fallbacks={slide.images} />
      </div>
      <Footer dark={dark} />
    </Frame>
  );
}

function PairSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} />
      <div style={{ fontSize: 'clamp(24px, 3.4vmin, 40px)', fontWeight: 800, marginBottom: 14, flexShrink: 0 }}>{slide.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
        {(slide.pair || []).map((p) => (
          <div
            key={p.title}
            style={{
              background: '#fff',
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(20,32,43,0.06)',
              boxShadow: '0 12px 28px rgba(20,32,43,0.07)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div style={{ flex: '1 1 0', minHeight: 0, background: '#eef2ef' }}>
              <SafeImg
                src={p.image}
                alt={p.title}
                fallbacks={slide.images}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: '14px 18px 16px', flexShrink: 0 }}>
              <div style={{ fontSize: 14, color: '#0f766e', fontWeight: 700 }}>{p.tag}</div>
              <div style={{ fontSize: 22, fontWeight: 800, margin: '4px 0 8px' }}>{p.title}</div>
              {p.bullets.map((b) => (
                <div key={b} style={{ fontSize: 16, color: '#3d5163', marginBottom: 4, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#0f766e' }}>●</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </Frame>
  );
}

function GallerySlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 24, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <Kicker text={slide.kicker} />
          <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, flexShrink: 0 }}>{slide.title}</div>
          <div style={{ fontSize: 18, color: '#4b5d6e', marginTop: 8, lineHeight: 1.5, flexShrink: 0 }}>{slide.subtitle}</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 0 }}>
            {(slide.bullets || []).map((b) => (
              <div
                key={b}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: '#fff',
                  border: '1px solid rgba(20,32,43,0.06)',
                  fontSize: 18,
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0 }}>
          <div style={{ gridRow: '1 / 3', minHeight: 0, display: 'flex' }}>
            <Photo src={slide.images[0]} alt="" fallbacks={slide.images} />
          </div>
          <Photo src={slide.images[1] || slide.images[0]} alt="" fallbacks={slide.images} />
          <Photo src={slide.images[2] || slide.images[0]} alt="" fallbacks={slide.images} />
        </div>
      </div>
      <Footer />
    </Frame>
  );
}

function EnterpriseSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} />
      <div style={{ fontSize: 38, fontWeight: 800, flexShrink: 0 }}>{slide.title}</div>
      <div style={{ fontSize: 18, color: '#4b5d6e', marginTop: 6, marginBottom: 14, flexShrink: 0 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 18, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          {(slide.modules || []).map((m) => (
            <div
              key={m.title}
              style={{
                padding: '10px 14px',
                borderRadius: 14,
                background: '#fff',
                border: '1px solid rgba(20,32,43,0.06)',
                flex: 1,
                minHeight: 0,
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0f766e' }}>{m.title}</div>
              <div style={{ fontSize: 15, color: '#3d5163', marginTop: 2, lineHeight: 1.45 }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1.2fr 0.8fr', gap: 10, minHeight: 0 }}>
          <Photo src={slide.images[0]} alt="" fallbacks={slide.images} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, minHeight: 0 }}>
            <Photo src={slide.images[1] || slide.images[0]} alt="" fallbacks={slide.images} />
            <Photo src={slide.images[2] || slide.images[0]} alt="" fallbacks={slide.images} />
          </div>
        </div>
      </div>
      <Footer />
    </Frame>
  );
}

function MethodSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <Kicker text={slide.kicker} dark />
      <div style={{ fontSize: 40, fontWeight: 800, flexShrink: 0 }}>{slide.title}</div>
      <div style={{ fontSize: 18, color: '#9fb1c3', marginTop: 8, maxWidth: 1000, flexShrink: 0 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 22, flex: 1, minHeight: 0, marginTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          {(slide.steps || []).map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                gap: 14,
                padding: 16,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                flex: 1,
                minHeight: 0,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: '#5eead4', minWidth: 52 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{s.title}</div>
                <div style={{ fontSize: 17, color: '#c5d4e0', marginTop: 6, lineHeight: 1.5 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0 }}>
          <Photo src={slide.images[0]} alt="" fallbacks={slide.images} />
          <Photo src={slide.images[1] || slide.images[0]} alt="" fallbacks={slide.images} />
        </div>
      </div>
      <Footer dark />
    </Frame>
  );
}

function CloseSlide({ slide }: { slide: DeckSlide }) {
  return (
    <Frame slide={slide}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <BrandMark size={48} />
        <Kicker text={slide.kicker} dark />
      </div>
      <div style={{ fontSize: 42, fontWeight: 800, maxWidth: 1300, lineHeight: 1.25, marginTop: 6, flexShrink: 0 }}>
        {slide.title}
      </div>
      <div style={{ fontSize: 20, color: '#9fb1c3', marginTop: 8, flexShrink: 0 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, flexShrink: 0 }}>
        {(slide.contacts || []).map((c) => (
          <div
            key={c.label}
            style={{
              padding: '12px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ fontSize: 14, color: '#5eead4', fontWeight: 700 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, lineHeight: 1.45 }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          flex: 1,
          minHeight: 0,
          marginTop: 16,
        }}
      >
        {slide.images.slice(0, 4).map((src) => (
          <div key={src} style={{ borderRadius: 16, overflow: 'hidden', background: '#101826', minHeight: 0 }}>
            <SafeImg src={src} alt="" fallbacks={slide.images} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <Footer dark />
    </Frame>
  );
}

export const SlideView: React.FC<{ slide: DeckSlide }> = ({ slide }) => {
  switch (slide.layout) {
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'about':
      return <AboutSlide slide={slide} />;
    case 'pillars':
      return <PillarsSlide slide={slide} />;
    case 'ecosystem':
      return <EcosystemSlide slide={slide} />;
    case 'hero':
      return <HeroSlide slide={slide} />;
    case 'pair':
      return <PairSlide slide={slide} />;
    case 'gallery':
      return <GallerySlide slide={slide} />;
    case 'enterprise':
      return <EnterpriseSlide slide={slide} />;
    case 'method':
      return <MethodSlide slide={slide} />;
    case 'close':
      return <CloseSlide slide={slide} />;
    default:
      return <HeroSlide slide={slide} />;
  }
};
