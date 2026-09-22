import React from 'react';
import { COMPANY, type DeckSlide } from '../data/portfolioData';
import { BrandMark } from './BrandMark';
import { SafeImg } from './SafeImg';

const SLIDE: React.CSSProperties = {
  width: 1920,
  height: 1080,
  overflow: 'hidden',
  position: 'relative',
  boxSizing: 'border-box',
  fontFamily: 'Vazirmatn, Tahoma, sans-serif',
};

function Frame({
  slide,
  children,
  pad = 72,
}: {
  slide: DeckSlide;
  children: React.ReactNode;
  pad?: number;
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
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function Kicker({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <span
        style={{
          width: 28,
          height: 3,
          borderRadius: 99,
          background: dark ? '#2dd4bf' : '#0f766e',
        }}
      />
      <span
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.08em',
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
        marginTop: 'auto',
        paddingTop: 18,
        borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(20,32,43,0.08)',
        fontSize: 16,
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
  height,
  radius = 28,
}: {
  src: string;
  alt: string;
  fallbacks?: string[];
  height?: number | string;
  radius?: number;
}) {
  return (
    <div
      style={{
        height,
        borderRadius: radius,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 22px 60px rgba(15, 23, 42, 0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: height ? undefined : 1,
        minHeight: 0,
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
    <Frame slide={slide} pad={68}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <BrandMark size={64} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#99f6e4' }}>{COMPANY.legalName}</div>
            <div style={{ fontSize: 16, color: '#8aa0b5', marginTop: 4 }}>{slide.kicker}</div>
          </div>
        </div>
        <div
          style={{
            padding: '10px 18px',
            borderRadius: 999,
            border: '1px solid rgba(45,212,191,0.35)',
            color: '#99f6e4',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          ارائه زنده از وب
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 48, flex: 1, minHeight: 0, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 118, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em' }}>{slide.title}</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#5eead4', marginTop: 22, lineHeight: 1.45 }}>
            {slide.subtitle}
          </div>
          <div style={{ fontSize: 22, color: '#b7c5d3', marginTop: 18, lineHeight: 1.7, maxWidth: 720 }}>
            {COMPANY.lead}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16, height: 560 }}>
          {shots.slice(0, 6).map((src, i) => (
            <div
              key={src + i}
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                background: '#101826',
                border: '1px solid rgba(255,255,255,0.06)',
                transform: i % 2 ? 'translateY(18px)' : 'translateY(0)',
              }}
            >
              <SafeImg src={src} alt="" fallbacks={shots} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 10 }}>
        {(slide.stats || []).map((s) => (
          <div
            key={s.label}
            style={{
              padding: '18px 22px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800, color: '#5eead4' }}>{s.value}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 14, color: '#8aa0b5', marginTop: 2 }}>{s.desc}</div>
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
      <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2, maxWidth: 1100 }}>{slide.title}</div>
      <div style={{ fontSize: 24, color: '#9fb1c3', marginTop: 14, maxWidth: 980, lineHeight: 1.7 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 40, flex: 1, minHeight: 0, marginTop: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(slide.bullets || []).map((b) => (
            <div
              key={b}
              style={{
                padding: '20px 22px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: 22,
                lineHeight: 1.7,
                color: '#d7e2ec',
              }}
            >
              {b}
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            {(slide.stats || []).map((s) => (
              <div key={s.label} style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(45,212,191,0.08)' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#5eead4' }}>{s.value}</div>
                <div style={{ fontSize: 15, color: '#c5d4e0' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1.25fr 0.75fr', gap: 16, minHeight: 0 }}>
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
      <div style={{ fontSize: 54, fontWeight: 800, marginBottom: 28 }}>{slide.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, minHeight: 0 }}>
        {(slide.pillars || []).map((p) => (
          <div
            key={p.title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(20,32,43,0.08)',
              border: '1px solid rgba(20,32,43,0.06)',
              minHeight: 0,
            }}
          >
            <div style={{ height: 280, background: '#eef3f1' }}>
              <SafeImg
                src={p.image}
                alt={p.title}
                fallbacks={slide.images}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{ fontSize: 26, fontWeight: 800 }}>{p.title}</div>
              {p.items.map((item) => (
                <div key={item} style={{ fontSize: 20, color: '#3d5163', display: 'flex', gap: 10 }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2 }}>{slide.title}</div>
        <div style={{ fontSize: 20, color: '#5b6d7d', maxWidth: 620, lineHeight: 1.6 }}>{slide.subtitle}</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 16,
          flex: 1,
          minHeight: 0,
          marginTop: 28,
        }}
      >
        {(slide.tiles || []).map((t) => (
          <div
            key={t.id}
            style={{
              background: '#fff',
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(20,32,43,0.06)',
              boxShadow: '0 10px 28px rgba(20,32,43,0.06)',
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
            <div style={{ padding: '12px 14px 14px' }}>
              <div style={{ fontSize: 13, color: '#0f766e', fontWeight: 700 }}>{t.tag}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{t.title}</div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', gap: 48, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Kicker text={slide.kicker} dark={dark} />
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.25 }}>{slide.title}</div>
          <div style={{ fontSize: 22, marginTop: 14, lineHeight: 1.7, color: dark ? '#9fb1c3' : '#4b5d6e' }}>
            {slide.subtitle}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
            {(slide.bullets || []).map((b) => (
              <div
                key={b}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)',
                  border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(20,32,43,0.06)',
                  fontSize: 21,
                  lineHeight: 1.55,
                }}
              >
                <span style={{ color: dark ? '#5eead4' : '#0f766e', fontWeight: 800 }}>●</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          {slide.images.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20, height: 168 }}>
              {slide.images.slice(1, 3).map((src) => (
                <Photo key={src} src={src} alt="" fallbacks={slide.images} height={168} radius={18} />
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
      <div style={{ fontSize: 50, fontWeight: 800, marginBottom: 24 }}>{slide.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1, minHeight: 0 }}>
        {(slide.pair || []).map((p) => (
          <div
            key={p.title}
            style={{
              background: '#fff',
              borderRadius: 28,
              overflow: 'hidden',
              border: '1px solid rgba(20,32,43,0.06)',
              boxShadow: '0 16px 40px rgba(20,32,43,0.07)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div style={{ height: 360, background: '#eef2ef' }}>
              <SafeImg
                src={p.image}
                alt={p.title}
                fallbacks={slide.images}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: 26 }}>
              <div style={{ fontSize: 15, color: '#0f766e', fontWeight: 700 }}>{p.tag}</div>
              <div style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 14px' }}>{p.title}</div>
              {p.bullets.map((b) => (
                <div key={b} style={{ fontSize: 20, color: '#3d5163', marginBottom: 8, display: 'flex', gap: 10 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 36, flex: 1, minHeight: 0 }}>
        <div>
          <Kicker text={slide.kicker} />
          <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.25 }}>{slide.title}</div>
          <div style={{ fontSize: 22, color: '#4b5d6e', marginTop: 14, lineHeight: 1.65 }}>{slide.subtitle}</div>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(slide.bullets || []).map((b) => (
              <div
                key={b}
                style={{
                  padding: '16px 18px',
                  borderRadius: 16,
                  background: '#fff',
                  border: '1px solid rgba(20,32,43,0.06)',
                  fontSize: 21,
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          <div style={{ gridRow: '1 / 3' }}>
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
      <div style={{ fontSize: 48, fontWeight: 800 }}>{slide.title}</div>
      <div style={{ fontSize: 22, color: '#4b5d6e', marginTop: 10, marginBottom: 24 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 28, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          {(slide.modules || []).map((m) => (
            <div
              key={m.title}
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                background: '#fff',
                border: '1px solid rgba(20,32,43,0.06)',
                flex: 1,
                minHeight: 0,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f766e' }}>{m.title}</div>
              <div style={{ fontSize: 18, color: '#3d5163', marginTop: 4, lineHeight: 1.55 }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1.2fr 0.8fr', gap: 14, minHeight: 0 }}>
          <Photo src={slide.images[0]} alt="" fallbacks={slide.images} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, minHeight: 0 }}>
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
      <div style={{ fontSize: 52, fontWeight: 800 }}>{slide.title}</div>
      <div style={{ fontSize: 22, color: '#9fb1c3', marginTop: 12, maxWidth: 1000 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 36, flex: 1, minHeight: 0, marginTop: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(slide.steps || []).map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                gap: 18,
                padding: 22,
                borderRadius: 22,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                flex: 1,
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 800, color: '#5eead4', minWidth: 64 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{s.title}</div>
                <div style={{ fontSize: 20, color: '#c5d4e0', marginTop: 8, lineHeight: 1.65 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16, minHeight: 0 }}>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <BrandMark size={58} />
        <Kicker text={slide.kicker} dark />
      </div>
      <div style={{ fontSize: 56, fontWeight: 800, maxWidth: 1300, lineHeight: 1.25, marginTop: 8 }}>{slide.title}</div>
      <div style={{ fontSize: 24, color: '#9fb1c3', marginTop: 12 }}>{slide.subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
        {(slide.contacts || []).map((c) => (
          <div
            key={c.label}
            style={{
              padding: '20px 22px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div style={{ fontSize: 15, color: '#5eead4', fontWeight: 700 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, lineHeight: 1.55 }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, height: 220, marginTop: 24 }}>
        {slide.images.slice(0, 4).map((src) => (
          <div key={src} style={{ borderRadius: 20, overflow: 'hidden', background: '#101826' }}>
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
