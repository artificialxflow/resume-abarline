import React, { useState } from 'react';
import {
  X,
  FileDown,
  Printer,
  FileSpreadsheet,
  FileText,
  Check,
  Loader2,
  Sparkles,
  Info,
} from 'lucide-react';
import { generatePptxResume } from '../utils/exportPptx';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onTriggerPrint,
}) => {
  const [isGeneratingPptx, setIsGeneratingPptx] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGeneratePptx = async () => {
    try {
      setIsGeneratingPptx(true);
      await generatePptxResume();
      setDownloadSuccess('فایل پاورپوینت با موفقیت تولید و دانلود شد.');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Error generating PPTX:', err);
    } finally {
      setIsGeneratingPptx(false);
    }
  };

  return (
    <div
      id="export-options-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                دریافت خروجی رزومه و پرزنتیشن
              </h3>
              <p className="text-xs text-slate-400">
                خروجی اختصاصی پاورپوینت (.pptx) و PDF لنداسکیپ استاندارد
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {downloadSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* Option 1: Dynamic Generated PPTX */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>تولید فایل جدید پاورپوینت (.pptx)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    پیشنهادی
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  شامل تمام ۱۷ اسلاید، متون فارسی راست‌به‌چپ، بولت‌پوینت‌ها و دسته‌بندی‌ها
                </p>
              </div>
            </div>

            <button
              onClick={handleGeneratePptx}
              disabled={isGeneratingPptx}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isGeneratingPptx ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>در حال ساخت...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>تولید و دانلود</span>
                </>
              )}
            </button>
          </div>

          {/* Option 2: Original PPTX File */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  دانلود فایل خام موجود در مخزن (resume.pptx)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  فایل اصلی پاورپوینت ارائه‌شده در مخزن داده‌های شرکت
                </p>
              </div>
            </div>

            <a
              href="/data/resume.pptx"
              download="resume-abarline.pptx"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>دانلود فایل خام</span>
            </a>
          </div>

          {/* Option 3: Landscape PDF Print */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>خروجی PDF لنداسکیپ (افقی بدون تداخل صفحه)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    استاندارد
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  قالب‌بندی دقیق هر اسلاید روی یک صفحه مجزا در ابعاد لنداسکیپ A4
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setTimeout(() => onTriggerPrint(), 300);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>چاپ / ذخیره PDF</span>
            </button>
          </div>

          {/* Option 4: Original PDF File */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  دانلود فایل آماده PDF رزومه (resume.pdf)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  نسخه کامل پی‌دی‌اف اسلایدهای رزومه موجود در مخزن
                </p>
              </div>
            </div>

            <a
              href="/data/resume.pdf"
              download="resume-abarline.pdf"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>دانلود PDF</span>
            </a>
          </div>

          {/* Info note about landscape printing */}
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              راهنما: در پنجره چاپ مرورگر، جهت صفحه (Orientation) را روی <strong>Landscape (افقی)</strong> و پس‌زمینه (Background graphics) را فعال نگه دارید تا رنگ‌ها و اسلایدها با بالاترین کیفیت وکتور ذخیره شوند.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
