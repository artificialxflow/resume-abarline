import React from 'react';
import {
  Presentation,
  FileDown,
  Printer,
  Globe,
  Layers,
  LayoutGrid,
  FileText,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

interface HeaderProps {
  currentTab: 'products' | 'slides' | 'proposal' | 'company';
  setCurrentTab: (tab: 'products' | 'slides' | 'proposal' | 'company') => void;
  onOpenPresentation: (initialIndex?: number) => void;
  onOpenExportModal: () => void;
  onTriggerPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenPresentation,
  onOpenExportModal,
  onTriggerPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  شرکت فناوری ابرلاین
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  تاسیس ۱۳۸۸
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                کاتالوگ و رزومه پلتفرم‌های نرم‌افزاری، حمل‌ونقل و سامانه‌های سازمانی
              </p>
            </div>
          </div>

          {/* Quick Actions / Exports */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-start-presentation-btn"
              onClick={() => onOpenPresentation(0)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition-colors shadow-sm cursor-pointer"
              title="اجرای پرزنتیشن تعاملی با کنترل اسلایدها"
            >
              <Presentation className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">اجرای پرزنتیشن</span>
              <span className="md:hidden">پرزنتیشن</span>
            </button>

            <button
              id="header-export-pptx-btn"
              onClick={onOpenExportModal}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 rounded-lg transition-colors shadow-sm cursor-pointer"
              title="دریافت فایل خروجی پاورپوینت PPTX و PDF"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>خروجی پاورپوینت / PDF</span>
            </button>

            <button
              id="header-print-pdf-btn"
              onClick={onTriggerPrint}
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              title="خروجی مستقیم PDF لنداسکیپ"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>چاپ لنداسکیپ</span>
            </button>

            <a
              id="header-website-link"
              href={COMPANY_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>سایت رسمی</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-800/80 -mb-px overflow-x-auto scrollbar-none py-1">
          <nav className="flex space-x-1 space-x-reverse min-w-max">
            <button
              id="nav-tab-products"
              onClick={() => setCurrentTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                currentTab === 'products'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>سامانه‌ها و محصولات (۱۴ پلتفرم)</span>
            </button>

            <button
              id="nav-tab-slides"
              onClick={() => setCurrentTab('slides')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                currentTab === 'slides'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>اسلایدهای رزومه (۱۷ اسلاید لنداسکیپ)</span>
            </button>

            <button
              id="nav-tab-proposal"
              onClick={() => setCurrentTab('proposal')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                currentTab === 'proposal'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>پروپوزال سازمانی (۱۴ اسلاید)</span>
            </button>

            <button
              id="nav-tab-company"
              onClick={() => setCurrentTab('company')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                currentTab === 'company'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>درباره ابرلاین و زیرساخت فنی</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
