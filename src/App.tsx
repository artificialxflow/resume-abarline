import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductShowcase } from './components/ProductShowcase';
import { SlideDeckView } from './components/SlideDeckView';
import { ProposalSlidesView } from './components/ProposalSlidesView';
import { CompanyProfile } from './components/CompanyProfile';
import { PresentationModal } from './components/PresentationModal';
import { ExportModal } from './components/ExportModal';
import { PrintDeck } from './components/PrintDeck';
import { RESUME_SLIDES, COMPANY_INFO } from './data/portfolioData';
import {
  Presentation,
  FileDown,
  Printer,
  ChevronUp,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'products' | 'slides' | 'proposal' | 'company'>('products');
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleOpenPresentation = (index = 0) => {
    setInitialSlideIndex(index);
    setPresentationOpen(true);
  };

  const handleOpenSlideByProduct = (productId: string) => {
    const slideIdx = RESUME_SLIDES.findIndex((s) => s.productKey === productId);
    if (slideIdx !== -1) {
      handleOpenPresentation(slideIdx);
    } else {
      handleOpenPresentation(0);
    }
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenPresentation={handleOpenPresentation}
        onOpenExportModal={() => setExportModalOpen(true)}
        onTriggerPrint={handleTriggerPrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        {currentTab === 'products' && (
          <ProductShowcase onOpenSlideByProduct={handleOpenSlideByProduct} />
        )}

        {currentTab === 'slides' && (
          <SlideDeckView
            onOpenPresentation={handleOpenPresentation}
            onOpenExportModal={() => setExportModalOpen(true)}
          />
        )}

        {currentTab === 'proposal' && <ProposalSlidesView />}

        {currentTab === 'company' && <CompanyProfile />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-200">
                {COMPANY_INFO.name} ({COMPANY_INFO.enName})
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                توسعه سامانه‌های نرم‌افزاری و پلتفرم‌های سازمانی هوشمند
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => setCurrentTab('products')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              سامانه‌ها (۱۴ پلتفرم)
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('slides')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              اسلایدهای رزومه (۱۷ اسلاید)
            </button>
            <span>•</span>
            <button
              onClick={() => setExportModalOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer text-amber-400/90"
            >
              خروجی پاورپوینت و PDF
            </button>
            <span>•</span>
            <a
              href={COMPANY_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              <span>سایت رسمی abarline.ir</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-slate-500">
            © ۱۳۸۸ - ۱۴۰۵ شرکت فناوری ابرلاین. تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>

      {/* Presentation Viewer Modal */}
      <PresentationModal
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
        initialSlideIndex={initialSlideIndex}
        onOpenExportModal={() => {
          setPresentationOpen(false);
          setExportModalOpen(true);
        }}
        onTriggerPrint={handleTriggerPrint}
      />

      {/* Export Options Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onTriggerPrint={handleTriggerPrint}
      />

      {/* Dedicated Print Landscape Deck (Triggered by window.print()) */}
      <PrintDeck />
    </div>
  );
}

export default App;
