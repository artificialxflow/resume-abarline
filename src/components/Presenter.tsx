import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, LayoutGrid, FileDown } from 'lucide-react';
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
      if (w < 1 || h < 1) return;
      setScale(Math.min(w / BASE_W, h / BASE_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
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
      idleTimer.current = window.setTimeout(() => setIdle(true), 2200);
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
    <div className="relative h-full w-full overflow-hidden bg-[#070b12] text-slate-100">
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          if (x < rect.width * 0.28) go(1);
          else if (x > rect.width * 0.72) go(-1);
        }}
      >
        <div
          style={{
            width: BASE_W * scale,
            height: BASE_H * scale,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: BASE_W,
              height: BASE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <SlideView slide={slide} />
          </div>
        </div>
      </div>

      <header
        className={`absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 h-14 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-200 ${
          hideChrome ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <BrandMark size={32} />
          <div>
            <div className="text-sm font-bold drop-shadow">{COMPANY.legalName}</div>
            <div className="text-[11px] text-teal-100/80">
              اسلاید {index + 1} از {DECK.length} · {slide.kicker}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCatalog}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/55 text-xs border border-white/15"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            کاتالوگ محصولات
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 text-xs border border-amber-300/25"
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

      <button
        onClick={() => go(-1)}
        disabled={index === 0}
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/45 border border-white/15 text-white disabled:opacity-20 transition-opacity ${
          hideChrome ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={index === DECK.length - 1}
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/45 border border-white/15 text-white disabled:opacity-20 transition-opacity ${
          hideChrome ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        className={`absolute bottom-0 inset-x-0 z-30 transition-opacity duration-200 ${
          hideChrome ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="h-1 bg-black/30">
          <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto bg-gradient-to-t from-black/75 to-black/25">
          {DECK.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`relative shrink-0 w-[96px] aspect-[16/9] rounded-md overflow-hidden border-2 ${
                i === index ? 'border-teal-400' : 'border-white/15 opacity-70 hover:opacity-100'
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
      </div>
    </div>
  );
};
