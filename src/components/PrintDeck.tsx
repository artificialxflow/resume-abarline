import React from 'react';
import { RESUME_SLIDES, COMPANY_INFO } from '../data/portfolioData';
import { CheckCircle2, Layers } from 'lucide-react';

export const PrintDeck: React.FC = () => {
  return (
    <div
      id="print-landscape-deck"
      className="hidden print:block print-page-deck text-slate-100 bg-slate-950"
    >
      {/* 1. Cover Page */}
      <div
        className="landscape-slide-page"
        style={{
          width: '100vw',
          height: '100vh',
          maxHeight: '100vh',
          pageBreakAfter: 'always',
          breakAfter: 'page',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 50px',
          background: '#090d16',
          color: '#ffffff',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              A
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
              شرکت فناوری ابرلاین (Abarline Technology)
            </span>
          </div>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>
            تاسیس: ۱۳۸۸ | سابقه: ۱۵+ سال
          </span>
        </div>

        {/* Center Hero */}
        <div style={{ margin: 'auto 0' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            کاتالوگ رسمی و رزومه جامع پلتفرم‌های نرم‌افزاری
          </span>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.3,
              marginBottom: '16px',
            }}
          >
            سبد ۱۰ پلتفرم تخصصی و یکپارچه سازمانی، حمل‌ونقل و تجارت دیجیتال
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#94a3b8',
              lineHeight: 1.6,
              maxWidth: '850px',
            }}
          >
            سامانه‌های تاکسی اینترنتی • ناوگان پیک موتوری • مدیریت پسماند شهری • سامانه رستوران و کیوسک • فروشگاه آنلاین • CRM و وفاداری • دفاتر وکالت • پلتفرم املاک • بازار طلا • ERP سازمانی
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#64748b',
          }}
        >
          <span>وب‌سایت رسمی: {COMPANY_INFO.website}</span>
          <span>پرزنتیشن استاندارد لنداسکیپ (Landscape 16:9)</span>
          <span>نشانی دفتر: {COMPANY_INFO.headquarters}</span>
        </div>
      </div>

      {/* 2. All 17 Resume Slides */}
      {RESUME_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className="landscape-slide-page"
          style={{
            width: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            pageBreakAfter: 'always',
            breakAfter: 'page',
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px 40px',
            background: '#090d16',
            color: '#ffffff',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #1e293b',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  padding: '3px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}
              >
                {slide.category}
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {slide.title}
              </h2>
            </div>
            <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>
              اسلاید {index + 1} از ۱۷
            </span>
          </div>

          {/* Subtitle */}
          <div style={{ marginTop: '8px', marginBottom: '8px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              {slide.subtitle}
            </p>
          </div>

          {/* Body Split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              alignItems: 'center',
              flex: 1,
              overflow: 'hidden',
              margin: '8px 0',
            }}
          >
            {/* Bullets */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              {slide.bullets.map((bullet, bIdx) => (
                <div
                  key={bIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#131e32',
                    borderRadius: '8px',
                    border: '1px solid #1e293b',
                  }}
                >
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px' }}>
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#e2e8f0',
                      lineHeight: 1.5,
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Slide Image */}
            <div
              style={{
                height: '100%',
                maxHeight: '62vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#040711',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>

          {/* Slide Footer */}
          <div
            style={{
              borderTop: '1px solid #1e293b',
              paddingTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#64748b',
            }}
          >
            <span>شرکت فناوری ابرلاین (abarline.ir)</span>
            <span>{slide.note || 'Investor Presentation'}</span>
            <span>تلفن: {COMPANY_INFO.phone}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
