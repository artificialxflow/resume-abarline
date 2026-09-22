import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X, LayoutGrid, FileDown } from 'lucide-react';
import { COMPANY, DECK } from '../data/portfolioData';
import { SlideView } from './SlideView';
import { SafeImg } from './SafeImg';
import { BrandMark } from './BrandMark';

const BASE_W = 1920;
const BASE_H = 1080;

function useFitScale(ref: React.RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setScale(Math.min(w / BASE_W, h / BASE_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

interface PresenterProps {
  index: number;
  setIndex: (n: number | ((prev: number) => number)) => void;
  presenting: boolean;
  onTogglePresent: () => void;
  onOpenCatalog: () => void;
  onOpenExport: () => void;
}

export const Presenter: React.FC<PresenterProps> = ({
  index,
  setIndex,
  presenting,
  onTogglePresent,
  onOpenCatalog,
  onOpenExport,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(stageRef);
  const slide = DECK[index];
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      setIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next >= DECK.length) return DECK.length - 1;
        return next;
      });
    },
    [setIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        setIndex(0);
      } else if (e.key === 'End') {
        setIndex(DECK.length - 1);
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'F11') {
        e.preventDefault();
        onTogglePresent();
      } else if (e.key === 'Escape' && presenting) {
        onTogglePresent();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onTogglePresent, presenting, setIndex]);

  useEffect(() => {
    const bump = () => {
      setIdle(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIdle(true), 2800);
    };
    bump();
    window.addEventListener('mousemove', bump);
    return () => {
      window.removeEventListener('mousemove', bump);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [index]);

  const progress = useMemo(() => ((index + 1) / DECK.length) * 100, [index]);
  const hideChrome = presenting && idle;

  return (
    <div className="h-full w-full flex flex-col bg-[#070b12] text-slate-100">
      <header
        className={`shrink-0 flex items-center justify-between px-5 h-16 border-b border-white/5 transition-opacity duration-300 ${
          hideChrome ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <BrandMark size={36} />
          <div>
            <div className="text-sm font-bold">{COMPANY.legalName}</div>
            <div className="text-[11px] text-teal-200/70">
              اسلاید {index + 1} از {DECK.length} · {slide.kicker}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCatalog}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs border border-white/10"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            کاتالوگ محصولات
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 text-xs border border-amber-400/20"
          >
            <FileDown className="w-3.5 h-3.5" />
            خروجی PPTX / PDF
          </button>
          <button
            onClick={onTogglePresent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400"
          >
            {presenting ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {presenting ? 'خروج از ارائه' : 'شروع ارائه تمام‌صفحه'}
          </button>
        </div>
      </header>

      <div className="relative flex-1 min-h-0">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 border border-white/10 text-white disabled:opacity-20 ${
            hideChrome ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={index === DECK.length - 1}
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 border border-white/10 text-white disabled:opacity-20 ${
            hideChrome ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={stageRef}
          className="w-full h-full flex items-center justify-center overflow-hidden px-3 py-3"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x < rect.width * 0.28) go(1);
            else if (x > rect.width * 0.72) go(-1);
          }}
        >
          <div
            style={{
              width: BASE_W,
              height: BASE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <SlideView slide={slide} />
          </div>
        </div>
      </div>

      <div
        className={`shrink-0 border-t border-white/5 transition-all duration-300 ${
          hideChrome ? 'h-1.5 overflow-hidden' : ''
        }`}
      >
        <div className="h-1 bg-white/10">
          <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        {!hideChrome && (
          <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
            {DECK.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={`relative shrink-0 w-[108px] aspect-[16/9] rounded-md overflow-hidden border-2 ${
                  i === index ? 'border-teal-400' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <SafeImg
                  src={s.images[0]}
                  alt={s.title}
                  fallbacks={s.images}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/65 text-[9px] py-0.5 truncate px-1">
                  {i + 1}. {s.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const PresentExit: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="p-2 rounded-lg hover:bg-white/10">
    <X className="w-4 h-4" />
  </button>
);
