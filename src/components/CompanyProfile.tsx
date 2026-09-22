import React from 'react';
import {
  Building2,
  ShieldCheck,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Phone,
  Server,
  Layers,
  Award,
  Zap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

export const CompanyProfile: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>پیشگام در توسعه نرم‌افزارهای سازمانی و سامانه‌های هوشمند از ۱۳۸۸</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            شرکت فناوری ابرلاین
          </h1>
          <p className="text-emerald-400 text-base sm:text-lg font-medium mt-1">
            Abarline System Technology Co.
          </p>

          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            شرکت فناوری ابرلاین با بیش از یک دهه و نیم فعالیت مستمر و دانش‌بنیان، ارائه‌دهنده بسته‌های نرم‌افزاری مقیاس‌پذیر در حوزه حمل‌ونقل هوشمند، مدیریت ناوگان، سامانه‌های جامع سازمانی (ERP)، فروشگاه‌های آنلاین، مدیریت ارتباط با مشتری (CRM) و پلتفرم‌های تخصصی طلا و املاک است.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            {COMPANY_INFO.stats.map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">
                  {st.value}
                </span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">
                  {st.label}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  {st.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Technology */}
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">
            مزیت‌های رقابتی و زیرساخت معماری نرم‌افزاری ابرلاین
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            استانداردهای مهندسی نرم‌افزار که پایه‌های محصولات ابرلاین بر آن استوار است
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPANY_INFO.strengths.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">{st.title}</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrated Ecosystem Architecture Diagram */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2">
          اکوسیستم یکپارچه سامانه‌های ابرلاین
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          کلیه سامانه‌ها توانایی تبادل دوطرفه داده با هسته مرکزی حسابداری، CRM و مدیریت کاربران را دارا هستند:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            حمل‌ونقل و تاکسی
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            پیک و تحویل کالا
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            مدیریت پسماند شهری
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            رستوران و کیوسک
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            فروشگاه آنلاین
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            سامانه CRM و وفاداری
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            دفاتر وکالت و دادرسی
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            پلتفرم هوشمند املاک
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            معاملات آنلاین طلا
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            اتوماسیون باشگاه ورزشی
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-center">
          <span className="text-xs sm:text-sm font-semibold text-emerald-300">
            هسته یکپارچه‌ساز ابرلاین: پایگاه داده ابری امن + لاگ حسابرسی + وب‌سرویس‌های RESTful API
          </span>
        </div>
      </div>

      {/* Contact & Legal Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span>اطلاعات تماس و دفتر مرکزی</span>
          </h4>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>{COMPANY_INFO.headquarters}</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={COMPANY_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{COMPANY_INFO.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span dir="ltr">{COMPANY_INFO.phone}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>مجوزها و استانداردهای توسعه</span>
          </h4>

          <div className="space-y-3 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>دارای نماد اعتماد الکترونیکی (اینماد Enamad)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تطبیق با قوانین حفاظت از داده‌ها و حریم خصوصی</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>پشتیبانی فنی دائمی و آموزش اختصاصی کاربران سازمانی</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>انعطاف در شخصی‌سازی، توسعه فیچرهای درخواستی و وایت‌لیبل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
