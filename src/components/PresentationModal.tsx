import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  FileDown,
  Printer,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { RESUME_SLIDES } from '../data/portfolioData';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideIndex?: number;
  onOpenExportModal: () => void;
  onTriggerPrint: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  initialSlideIndex = 0,
  onOpenExportModal,
  onTriggerPrint,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'hybrid' | 'imageOnly'>('hybrid');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
  }, [initialSlideIndex]);

  const currentSlide = RESUME_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < RESUME_SLIDES.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : RESUME_SLIDES.length - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      id="presentation-modal-container"
      className="fixed inset-0 z-50 bg-slate-950/98 flex flex-col justify-between text-white overflow-hidden select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-200">
                پرزنتیشن تعاملی ابرلاین
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {currentSlide.category}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              اسلاید {currentIndex + 1} از {RESUME_SLIDES.length}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('hybrid')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'hybrid'
                  ? 'bg-emerald-600 text-white font-medium shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              نمای ترکیبی (متن + تصویر)
            </button>
            <button
              onClick={() => setViewMode('imageOnly')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'imageOnly'
                  ? 'bg-emerald-600 text-white font-medium shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              فقط اسلاید اصلی
            </button>
          </div>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
            title="خروجی پاورپوینت و PDF"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline">خروجی PPTX / PDF</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'خروج از تمام‌صفحه' : 'نمایش تمام‌صفحه (F11)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="بستن (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas (16:9 Landscape) */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-2xl backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
          title="اسلاید قبلی (کلید راست)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-2xl backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
          title="اسلاید بعدی (کلید چپ یا Space)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* 16:9 Slide Stage */}
        <div className="w-full max-w-6xl aspect-[16/9] max-h-[78vh] bg-slate-900 rounded-2xl border border-slate-800/90 shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-between relative">
          {viewMode === 'imageOnly' ? (
            /* Direct high-res slide view */
            <div className="w-full h-full flex items-center justify-center bg-slate-950 relative">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-3 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-md text-xs text-slate-400 border border-slate-800">
                اسلاید {currentIndex + 1}: {currentSlide.title}
              </div>
            </div>
          ) : (
            /* Hybrid rich view with live typography & responsive 16:9 layout */
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
              {/* Slide Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {currentSlide.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      پلتفرم شرکت فناوری ابرلاین
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Slide {String(currentIndex + 1).padStart(2, '0')} / 17
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Slide Content Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto items-center">
                {/* Text Bullets */}
                <div className="md:col-span-6 space-y-2.5 sm:space-y-3">
                  {currentSlide.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Visual Preview / Slide Graphic */}
                <div className="md:col-span-6 h-full flex items-center justify-center">
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative shadow-inner group">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <button
                      onClick={() => setViewMode('imageOnly')}
                      className="absolute bottom-2 left-2 px-2.5 py-1 text-xs bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-md shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>مشاهده تصویر کامل</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Footer */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-500">
                <span>شرکت فناوری ابرلاین | abarline.ir</span>
                <span>{currentSlide.note || `اسلاید ${currentIndex + 1}`}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-24 bg-slate-950 border-t border-slate-800/90 px-4 py-2 flex items-center gap-3 overflow-x-auto scrollbar-thin">
        {RESUME_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative flex-shrink-0 w-28 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              idx === currentIndex
                ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105 z-10'
                : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
            }`}
          >
            <img
              src={slide.image}
              alt={`اسلاید ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/70 px-1.5 py-0.5 text-[10px] text-center font-mono text-white truncate">
              {idx + 1}. {slide.category}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
