import React, { useState } from 'react';
import {
  Presentation,
  Maximize2,
  ExternalLink,
  Filter,
  CheckCircle2,
  FileDown,
  Layers,
} from 'lucide-react';
import { RESUME_SLIDES } from '../data/portfolioData';

interface SlideDeckViewProps {
  onOpenPresentation: (index: number) => void;
  onOpenExportModal: () => void;
}

export const SlideDeckView: React.FC<SlideDeckViewProps> = ({
  onOpenPresentation,
  onOpenExportModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'همه اسلایدها (۱۷ اسلاید)' },
    { key: 'transport', label: 'حمل‌ونقل و لجستیک' },
    { key: 'enterprise', label: 'سازمانی و ERP' },
    { key: 'commerce', label: 'تجارت و بازار آنلاین' },
    { key: 'specialized', label: 'پلتفرم‌های تخصصی' },
    { key: 'invest', label: 'فرصت‌های رشد و استراتژی' },
  ];

  const filteredSlides = RESUME_SLIDES.filter((slide) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'transport')
      return (
        slide.category.includes('حمل') ||
        slide.category.includes('لجستیک') ||
        slide.productKey === 'taxi' ||
        slide.productKey === 'courier'
      );
    if (selectedCategory === 'enterprise')
      return (
        slide.category.includes('سازمان') ||
        slide.category.includes('ERP') ||
        slide.productKey === 'erp'
      );
    if (selectedCategory === 'commerce')
      return (
        slide.category.includes('تجارت') ||
        slide.category.includes('طلا') ||
        slide.productKey === 'gold' ||
        slide.productKey === 'shop' ||
        slide.productKey === 'restaurant'
      );
    if (selectedCategory === 'specialized')
      return (
        slide.category.includes('تخصصی') ||
        slide.productKey === 'law' ||
        slide.productKey === 'realestate' ||
        slide.productKey === 'gym' ||
        slide.productKey === 'waste'
      );
    if (selectedCategory === 'invest')
      return (
        slide.category.includes('سرمایه‌گذاری') ||
        slide.category.includes('استراتژی') ||
        slide.category.includes('افق')
      );
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner with Stats & Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide">
            <Presentation className="w-4 h-4" />
            <span>پرزنتیشن رسمی و کاتالوگ اسلاید به اسلاید</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            اسلایدهای رزومه شرکتی ابرلاین (۱۷ اسلاید لنداسکیپ)
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            مجموعه اسلایدهای استاندارد ۱۶:۹ شامل معرفی کامل ۱۰ پلتفرم تخصصی، راهکارهای حمل‌ونقل هوشمند، معماری یکپارچه سازمانی و افق‌های سرمایه‌گذاری.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenPresentation(0)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <Presentation className="w-4 h-4" />
            <span>اجرای پرزنتیشن تمام‌صفحه</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-amber-400" />
            <span>دانلود PPTX / PDF</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 ml-1">
          <Filter className="w-3.5 h-3.5" />
          <span>فیلتر موضوعی:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSlides.map((slide) => {
          const originalIndex = RESUME_SLIDES.findIndex((s) => s.id === slide.id);
          return (
            <div
              key={slide.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 shadow-lg overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {slide.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      اسلاید {slide.id} از ۱۷
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenPresentation(originalIndex)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    title="مشاهده در نمای پرزنتیشن"
                  >
                    <span>نمایش کامل</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {slide.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {slide.subtitle}
                </p>
              </div>

              {/* 16:9 Slide Preview Container */}
              <div
                onClick={() => onOpenPresentation(originalIndex)}
                className="relative aspect-[16/9] w-full bg-slate-950 border-y border-slate-800/80 cursor-pointer overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-emerald-950/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-xl">
                    <Presentation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>کلیک برای اجرای پرزنتیشن</span>
                  </div>
                </div>
              </div>

              {/* Bullets Summary */}
              <div className="p-5 pt-4 bg-slate-900/40">
                <div className="space-y-1.5">
                  {slide.bullets.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>شرکت فناوری ابرلاین</span>
                  <button
                    onClick={() => onOpenPresentation(originalIndex)}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    اجرای این اسلاید &larr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
