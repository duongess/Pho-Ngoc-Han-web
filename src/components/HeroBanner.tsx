import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Gift, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface HeroBannerProps {
  onOrderNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOrderNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'promo-che',
      subtitle: 'CHƯƠNG TRÌNH KHUYẾN MẠI ĐẶC BIỆT',
      headlineMain: 'MUA MANG VỀ 3 MÓN ĂN',
      headlineSub: 'Tặng 1 chè Huế',
      badgeTitle: 'EXTRA ƯU ĐÃI',
      badgeItems: ['LẨU NHỎ: 1 CHÈ', 'LẨU LỚN: 2 CHÈ'],
      footerNote: '* ÁP DỤNG LŨY TIẾN - Chỉ áp dụng đơn mang về',
      ctaText: 'ORDER NOW',
      bgGradient: 'from-[#e77a1e] via-[#f28e2b] to-[#dc6812]',
    },
    {
      id: 'tet-2026',
      subtitle: 'CHÀO XUÂN BÍNH NGỌ 2026',
      headlineMain: 'MÂM CỖ HUẾ ĐÓN TẾT',
      headlineSub: 'Đậm đà hương vị sum vầy',
      badgeTitle: 'ƯU ĐÃI ĐẶT TRƯỚC',
      badgeItems: ['GIẢM 10% CHO ĐƠN ĐẶT TIỆC', 'TẶNG RƯỢU CUNG ĐÌNH'],
      footerNote: '* Áp dụng đặt bàn trước qua hotline 19009077',
      ctaText: 'XEM THỰC ĐƠN TẾT',
      bgGradient: 'from-[#c2410c] via-[#ea580c] to-[#b45309]',
    }
  ];

  // Auto rotate banner gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#e77a1e] via-[#f38f2b] to-[#dc6812] text-white shadow-md">
      {/* Decorative texture overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Promo Copy matching Screenshot 1 */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-6">
            
            {/* Small eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-100 text-xs sm:text-sm font-semibold tracking-wider uppercase w-fit border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>{slide.subtitle}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] uppercase font-serif">
                {slide.headlineMain}
              </h1>
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-amber-100 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                {slide.headlineSub}
              </p>
            </div>

            {/* Extra Promo Red Badge */}
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-red-600/90 text-white px-4 sm:px-5 py-2.5 rounded-2xl shadow-lg border-2 border-yellow-300 w-fit">
              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm tracking-wider uppercase text-yellow-200">
                <Gift className="w-4 h-4" />
                <span>{slide.badgeTitle}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/40" />
              <div className="text-xs sm:text-sm font-bold flex flex-wrap items-center gap-x-4 gap-y-1">
                {slide.badgeItems.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-order-now-btn"
                onClick={onOrderNow}
                className="px-8 py-3.5 rounded-full bg-[#5c1d11] hover:bg-[#431407] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border border-amber-400/40 flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <div className="text-xs sm:text-sm font-medium text-amber-100/90 italic">
                {slide.footerNote}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dishes Presentation (Screenshot 1: Chè Huế bowls) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* White plate circular backdrop */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/20 p-4 backdrop-blur-xs border-4 border-white/40 shadow-2xl flex items-center justify-center">
              
              {/* Floating dessert visual representations */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner bg-white">
                <ImagePlaceholder
                  src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80"
                  alt="Chè Cung Đình Huế thơm ngon thanh mát"
                  className="w-full h-full object-cover"
                  category="trang-mieng"
                  showLabel={false}
                />
              </div>

              {/* Floating satellite badge 1: Chè bắp */}
              <div className="absolute -top-3 -left-3 sm:-left-6 bg-white/95 text-stone-800 rounded-2xl p-2.5 shadow-xl border border-amber-200 max-w-[150px] animate-bounce duration-1000 hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">Món tráng miệng</span>
                <span className="text-xs font-bold text-stone-900 line-clamp-1">Chè hạt sen Tịnh Tâm</span>
              </div>

              {/* Floating satellite badge 2: Lũy tiến */}
              <div className="absolute -bottom-2 -right-2 sm:-right-4 bg-red-600 text-white rounded-2xl px-3 py-2 shadow-xl border-2 border-yellow-300 text-center">
                <span className="text-xs sm:text-sm font-extrabold uppercase block leading-tight">TẶNG CHÈ HUẾ</span>
                <span className="text-[10px] text-yellow-200 font-medium">Khi đặt 3 món mang về</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
