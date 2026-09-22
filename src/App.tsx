import React, { useCallback, useEffect, useState } from 'react';
import { Presenter } from './components/Presenter';
import { Catalog } from './components/Catalog';
import { ExportModal } from './components/ExportModal';
import { PrintDeck } from './components/PrintDeck';
import { DECK } from './data/portfolioData';

export function App() {
  const [index, setIndex] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('slide-')) {
      const n = Number(hash.slice(6));
      if (!Number.isNaN(n) && n >= 0 && n < DECK.length) setIndex(n);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#slide-${index}`);
  }, [index]);

  const togglePresent = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {});
      setPresenting(true);
    } else {
      await document.exitFullscreen().catch(() => {});
      setPresenting(false);
    }
  }, []);

  useEffect(() => {
    const onFs = () => setPresenting(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const jumpToSlide = (slideId: string) => {
    const i = DECK.findIndex((s) => s.id === slideId);
    setIndex(i >= 0 ? i : 0);
    setCatalog(false);
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#070b12]">
      <div className="h-full no-print">
        <Presenter
          index={index}
          setIndex={setIndex}
          presenting={presenting}
          onTogglePresent={togglePresent}
          onOpenCatalog={() => setCatalog(true)}
          onOpenExport={() => setExportOpen(true)}
        />
      </div>

      {catalog && <Catalog onClose={() => setCatalog(false)} onPresentSlide={jumpToSlide} />}

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        onTriggerPrint={() => window.print()}
      />

      <PrintDeck />
    </div>
  );
}

export default App;
