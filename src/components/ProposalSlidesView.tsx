import React, { useState } from 'react';
import { PROPOSAL_SLIDES } from '../data/portfolioData';
import { FileText, Eye, Maximize2, X, Download } from 'lucide-react';

export const ProposalSlidesView: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide">
            <FileText className="w-4 h-4" />
            <span>پروپوزال شرکتی و ارائه استراتژیک ابرلاین</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            اسلایدهای پروپوزال جامع سازمانی (۱۴ اسلاید)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            مستندات و اسلایدهای آماده پروپوزال تجاری شرکت فناوری ابرلاین جهت ارائه به سازمان‌ها، شرکت‌های طرف قرارداد و سرمایه‌گذاران.
          </p>
        </div>

        <div>
          <a
            href="/data/پروپوزال-شرکتی-ایران-پاورپوینت-39ogk7.pdf"
            download="پروپوزال-شرکتی-ابرلاین.pdf"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-xl border border-slate-700 transition-colors shadow"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>دانلود PDF کامل پروپوزال</span>
          </a>
        </div>
      </div>

      {/* Grid of Slides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPOSAL_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-[16/9] bg-slate-950">
              <img
                src={slide.image}
                alt={`اسلاید پروپوزال ${slide.id}`}
                className="w-full h-full object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>مشاهده اسلاید {slide.id}</span>
                </span>
              </div>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                اسلاید پروپوزال {slide.id}
              </span>
              <span className="text-emerald-400 group-hover:underline">
                بزرگ‌نمایی &larr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for slide zoom */}
      {activeSlide !== null && (
        <div
          id="proposal-slide-modal"
          onClick={() => setActiveSlide(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full aspect-[16/9] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                اسلاید شماره {activeSlide + 1} از {PROPOSAL_SLIDES.length} - پروپوزال شرکتی ابرلاین
              </span>
              <button
                onClick={() => setActiveSlide(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <img
                src={PROPOSAL_SLIDES[activeSlide].image}
                alt="اسلاید"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white"
              >
                &rarr; اسلاید قبلی
              </button>

              <span>شرکت فناوری ابرلاین (abarline.ir)</span>

              <button
                disabled={activeSlide === PROPOSAL_SLIDES.length - 1}
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev !== null && prev < PROPOSAL_SLIDES.length - 1 ? prev + 1 : prev
                  )
                }
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white"
              >
                اسلاید بعدی &larr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
