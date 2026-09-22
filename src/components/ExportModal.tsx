import React, { useState } from 'react';
import { Check, FileDown, FileSpreadsheet, Loader2, Printer, X } from 'lucide-react';
import { generatePptxResume } from '../utils/exportPptx';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onTriggerPrint }) => {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePptx = async () => {
    setBusy(true);
    setErr(null);
    try {
      await generatePptxResume();
      setOk('فایل پاورپوینت با تصاویر پروژه ساخته و دانلود شد.');
      setTimeout(() => setOk(null), 4000);
    } catch (e) {
      console.error(e);
      setErr('ساخت پاورپوینت ناموفق بود. اتصال تصاویر را بررسی کنید.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print">
      <div className="w-full max-w-lg bg-[#101826] border border-white/10 rounded-3xl overflow-hidden text-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="font-extrabold">خروجی ارائه</h3>
            <p className="text-xs text-slate-400 mt-0.5">همان اسلایدهای این سایت، با تصاویر واقعی پروژه</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {ok && (
            <div className="flex items-center gap-2 text-xs text-teal-200 bg-teal-500/10 border border-teal-400/20 rounded-xl px-3 py-2">
              <Check className="w-4 h-4" />
              {ok}
            </div>
          )}
          {err && <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-xl px-3 py-2">{err}</div>}

          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-black/30 border border-white/8">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-amber-300 mt-0.5" />
              <div>
                <div className="text-sm font-bold">پاورپوینت ۱۶:۹ با تصاویر</div>
                <div className="text-xs text-slate-400 mt-1">هر اسلاید متن + تصویر واقعی پوشه data</div>
              </div>
            </div>
            <button
              disabled={busy}
              onClick={handlePptx}
              className="shrink-0 px-3 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold disabled:opacity-50"
            >
              {busy ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ساخت
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  دانلود PPTX
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-black/30 border border-white/8">
            <div className="flex items-start gap-3">
              <Printer className="w-5 h-5 text-teal-300 mt-0.5" />
              <div>
                <div className="text-sm font-bold">PDF لنداسکیپ بدون تداخل</div>
                <div className="text-xs text-slate-400 mt-1">
                  در پنجره چاپ، Layout / Orientation را روی Landscape بگذارید و Margins را None کنید
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onTriggerPrint(), 250);
              }}
              className="shrink-0 px-3 py-2 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold"
            >
              چاپ / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
