import React, { useState } from 'react';
import {
  Car,
  Bike,
  Recycle,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Scale,
  Building,
  Coins,
  Dumbbell,
  Cpu,
  TrendingUp,
  Truck,
  Compass,
  Check,
  Eye,
  X,
  Presentation,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { PRODUCTS, ProductItem, RESUME_SLIDES } from '../data/portfolioData';

interface ProductShowcaseProps {
  onOpenSlideByProduct: (productId: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onOpenSlideByProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'taxi':
        return <Car className="w-5 h-5 text-emerald-400" />;
      case 'courier':
        return <Bike className="w-5 h-5 text-emerald-400" />;
      case 'waste':
        return <Recycle className="w-5 h-5 text-emerald-400" />;
      case 'restaurant':
        return <UtensilsCrossed className="w-5 h-5 text-emerald-400" />;
      case 'shop':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'crm':
        return <Users className="w-5 h-5 text-emerald-400" />;
      case 'law':
        return <Scale className="w-5 h-5 text-emerald-400" />;
      case 'realestate':
        return <Building className="w-5 h-5 text-emerald-400" />;
      case 'gold':
        return <Coins className="w-5 h-5 text-emerald-400" />;
      case 'gym':
        return <Dumbbell className="w-5 h-5 text-emerald-400" />;
      case 'erp':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'scale':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'mobility_invest':
        return <Truck className="w-5 h-5 text-emerald-400" />;
      case 'digital_markets':
        return <Compass className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const categories = [
    { key: 'all', label: 'همه سامانه‌ها (۱۴ پلتفرم)' },
    { key: 'transport', label: 'حمل‌ونقل و لجستیک' },
    { key: 'commerce', label: 'تجارت، فروشگاه و طلا' },
    { key: 'crm', label: 'مدیریت ارتباط با مشتری (CRM)' },
    { key: 'specialized', label: 'پلتفرم‌های تخصصی و خدمات' },
    { key: 'enterprise', label: 'سازمانی، ERP و توسعه مقیاس' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all shrink-0 cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 shadow-xl overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Bar */}
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {getProductIcon(prod.id)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      پلتفرم {prod.number}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {prod.categoryLabel}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>جزئیات</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {prod.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {prod.tagline}
              </p>
            </div>

            {/* Visual Thumbnail */}
            <div
              onClick={() => setSelectedProduct(prod)}
              className="relative aspect-[16/9] bg-slate-950 border-y border-slate-800/80 cursor-pointer overflow-hidden"
            >
              <img
                src={prod.images.slide}
                alt={prod.title}
                className="w-full h-full object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1 bg-emerald-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                  مشاهده مشخصات و اسکرین‌شات‌ها
                </span>
              </div>
            </div>

            {/* Features preview */}
            <div className="p-5 pt-3 bg-slate-900/30 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5 mb-4">
                {prod.features.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenSlideByProduct(prod.id)}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>اسلاید پرزنتیشن</span>
                </button>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  <span>اطلاعات کامل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          id="product-detail-modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  {getProductIcon(selectedProduct.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      پلتفرم {selectedProduct.number}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedProduct.categoryLabel}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {selectedProduct.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Highlight Banner */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{selectedProduct.highlight}</span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">معرفی پلتفرم</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">
                  قابلیت‌ها و ماژول‌های عملیاتی
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">
                  مشخصات فنی و زیرساختی
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProduct.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800"
                    >
                      <span className="text-[11px] text-slate-500 block mb-1">
                        {spec.label}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images & Screenshots */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">
                  تصاویر و اسکرین‌شات‌های سامانه
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProduct.images.screen1 && (
                    <div
                      onClick={() => setActiveImageZoom(selectedProduct.images.screen1!)}
                      className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative cursor-pointer group"
                    >
                      <img
                        src={selectedProduct.images.screen1}
                        alt="اپلیکیشن ۱"
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-xs text-white bg-slate-900/90 px-2 py-1 rounded">
                          بزرگ‌نمایی
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedProduct.images.screen2 && (
                    <div
                      onClick={() => setActiveImageZoom(selectedProduct.images.screen2!)}
                      className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative cursor-pointer group"
                    >
                      <img
                        src={selectedProduct.images.screen2}
                        alt="اپلیکیشن ۲"
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-xs text-white bg-slate-900/90 px-2 py-1 rounded">
                          بزرگ‌نمایی
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    onClick={() => setActiveImageZoom(selectedProduct.images.slide)}
                    className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative cursor-pointer group"
                  >
                    <img
                      src={selectedProduct.images.slide}
                      alt="اسلاید کاتالوگ"
                      className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs text-white bg-slate-900/90 px-2 py-1 rounded">
                        اسلاید کامل
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => {
                  const id = selectedProduct.id;
                  setSelectedProduct(null);
                  onOpenSlideByProduct(id);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Presentation className="w-4 h-4" />
                <span>مشاهده در پرزنتیشن رسمی</span>
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {activeImageZoom && (
        <div
          onClick={() => setActiveImageZoom(null)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={activeImageZoom}
              alt="تصویر بزرگ شده"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-slate-800"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-800 border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
