import React, { useState } from 'react';
import { X, Presentation, Check } from 'lucide-react';
import { COMPANY, DECK, PRODUCT_DETAILS, PRODUCTS } from '../data/portfolioData';
import { SafeImg } from './SafeImg';
import { BrandMark } from './BrandMark';

interface CatalogProps {
  onClose: () => void;
  onPresentSlide: (slideId: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onClose, onPresentSlide }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PRODUCTS.find((p) => p.id === openId);
  const detail = openId ? PRODUCT_DETAILS[openId] : null;

  return (
    <div className="fixed inset-0 z-40 bg-[#070b12] text-slate-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BrandMark size={40} />
            <div>
              <h1 className="text-xl font-extrabold">کاتالوگ محصولات {COMPANY.name}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{COMPANY.slogan} — همه تصاویر از فایل‌های همین پروژه است</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          >
            <X className="w-4 h-4" />
            بازگشت به ارائه
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => {
            const info = PRODUCT_DETAILS[p.id];
            return (
              <article
                key={p.id}
                className="rounded-2xl overflow-hidden bg-[#101826] border border-white/8 hover:border-teal-400/40 transition-colors"
              >
                <button className="block w-full text-right" onClick={() => setOpenId(p.id)}>
                  <div className="aspect-[16/10] bg-[#0b1220]">
                    <SafeImg
                      src={p.image}
                      alt={p.title}
                      fallbacks={p.extras}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-teal-300 font-bold">{p.tag}</div>
                    <h2 className="text-base font-extrabold mt-1">{p.title}</h2>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{info?.tagline}</p>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => onPresentSlide(info?.slideId || DECK[0].id)}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-lg bg-teal-500/15 text-teal-200 border border-teal-400/20 hover:bg-teal-500/25"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    نمایش در ارائه
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {open && detail && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpenId(null)}>
          <div
            className="w-full max-w-4xl bg-[#101826] border border-white/10 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="bg-[#0b1220] min-h-[280px]">
                <SafeImg
                  src={open.image}
                  alt={open.title}
                  fallbacks={open.extras}
                  className="w-full h-full object-contain max-h-[420px]"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-xs text-teal-300 font-bold">{open.tag}</div>
                    <h3 className="text-xl font-extrabold mt-1">{open.title}</h3>
                  </div>
                  <button onClick={() => setOpenId(null)} className="p-2 rounded-lg hover:bg-white/10">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 mt-3 leading-7">{detail.description}</p>
                <div className="mt-4 space-y-2">
                  {detail.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                {open.extras && open.extras.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    {open.extras.map((src) => (
                      <div key={src} className="rounded-xl overflow-hidden bg-[#0b1220] aspect-[16/10]">
                        <SafeImg src={src} alt="" fallbacks={[open.image]} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => onPresentSlide(detail.slideId)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm"
                >
                  <Presentation className="w-4 h-4" />
                  پرزنت این محصول
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
