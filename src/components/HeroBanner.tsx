import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Gift, Sparkles, ArrowRight, ShoppingBag, Flame, Clock } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface HeroBannerProps {
  onOrderNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOrderNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'promo-che',
      badge: 'CHƯƠNG TRÌNH KHUYẾN MẠI ĐẶC BIỆT',
      headlineMain: 'MUA MANG VỀ 3 MÓN ĂN',
      headlineHighlight: 'TẶNG 1 CHÈ HUẾ',
      badgeTitle: 'EXTRA ƯU ĐÃI',
      badgeItems: ['LẨU NHỎ: 1 CHÈ', 'LẨU LỚN: 2 CHÈ'],
      footerNote: '* ÁP DỤNG LŨY TIẾN - Chỉ áp dụng cho đơn hàng mang về',
      ctaText: 'ORDER NOW',
      dishTitle: 'Chè Hạt Sen Long Nhãn',
      dishTag: 'Món tráng miệng Cố Đô',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'promo-bunbo',
      badge: 'HƯƠNG VỊ CỐ ĐÔ NGUYÊN BẢN',
      headlineMain: 'BÚN BÒ HUẾ ĐẶC BIỆT',
      headlineHighlight: 'NƯỚC DÙNG NẤU TỰ NHIÊN',
      badgeTitle: 'COMBO TRƯA TIỆN LỢI',
      badgeItems: ['BÚN BÒ + CHÈ HUẾ', 'GIẢM NGAY 15.000đ'],
      footerNote: '* Nước dùng hầm xương bò 12 tiếng thơm lừng mắm ruốc',
      ctaText: 'ĐẶT MÓN NGAY',
      dishTitle: 'Bún Bò Huế Cung Đình',
      dishTag: 'Món ngon trứ danh',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'promo-tiec',
      badge: 'TIỆC SUM VẦY & GIA ĐÌNH',
      headlineMain: 'MÂM CỖ HUẾ ĐÓN XUÂN',
      headlineHighlight: 'TRỌN VẸN VỊ CỐ ĐÔ',
      badgeTitle: 'ĐẶT BÀN NHÓM ĐÔNG',
      badgeItems: ['TẶNG RƯỢU CUNG ĐÌNH', 'GIẢM 10% TỔNG HOÁ ĐƠN'],
      footerNote: '* Áp dụng bàn từ 6 người trở lên khi đặt trước qua hotline',
      ctaText: 'ĐẶT BÀN TIỆC',
      dishTitle: 'Mâm Cỗ Cung Đình',
      dishTag: 'Đại tiệc Hoàng Gia',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    }
  ];

  // Auto rotate banner gently
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const slide = slides[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#d96b0c] via-[#ea580c] to-[#c2410c] text-white shadow-md transition-colors duration-700"
    >
      {/* Dynamic Animated Background Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      
      {/* Floating subtle ambient lights */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-yellow-300/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-500/30 blur-3xl pointer-events-none"
      />

      {/* Floating Steam Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            style={{
              width: `${(i % 3) * 4 + 4}px`,
              height: `${(i % 3) * 4 + 4}px`,
              left: `${15 + i * 14}%`,
              bottom: '10%',
            }}
            animate={{
              y: [-10, -180],
              x: [(i % 2 === 0 ? 0 : 20), (i % 2 === 0 ? 30 : -20)],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.5],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Promo Copy with Animated Text Transitions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${currentSlide}`}
                initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Small Eyebrow Badge with Shine Effect */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs sm:text-sm font-semibold tracking-wider uppercase w-fit border border-white/30 shadow-inner">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {slide.badge}
                  </motion.span>
                </div>

                {/* Main Headline with entrance animation */}
                <div className="space-y-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] uppercase font-serif leading-tight"
                  >
                    {slide.headlineMain}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-amber-100 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                  >
                    {slide.headlineHighlight}
                  </motion.p>
                </div>

                {/* Extra Promo Red Badge with subtle pulse */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-red-600/95 text-white px-4 sm:px-5 py-2.5 rounded-2xl shadow-xl border-2 border-yellow-300 w-fit backdrop-blur-xs hover:shadow-red-900/40 transition"
                >
                  <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm tracking-wider uppercase text-yellow-200">
                    <Gift className="w-4 h-4 animate-bounce" />
                    <span>{slide.badgeTitle}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-white/40" />
                  <div className="text-xs sm:text-sm font-bold flex flex-wrap items-center gap-x-4 gap-y-1">
                    {slide.badgeItems.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Button & Note */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <motion.button
                    id="hero-order-now-btn"
                    onClick={onOrderNow}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3.5 rounded-full bg-[#4a150c] hover:bg-[#380e06] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-colors border-2 border-amber-400/50 flex items-center gap-2.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 text-amber-300" />
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </motion.button>

                  <div className="text-xs sm:text-sm font-medium text-amber-100/90 italic flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{slide.footerNote}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Controls & Progress Dots */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer border border-white/20"
                  aria-label="Slide trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer border border-white/20"
                  aria-label="Slide tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bars */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ width: currentSlide === index ? '28px' : '8px' }}
                    aria-label={`Đi tới banner ${index + 1}`}
                  >
                    <div className="absolute inset-0 bg-white/30" />
                    {currentSlide === index && (
                      <motion.div
                        layoutId="activeSlideProgress"
                        className="absolute inset-0 bg-yellow-300"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Dishes Presentation with 3D Float & Depth */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* White Plate Circular Backdrop with Pulsing Ring */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 60, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-white/30 pointer-events-none"
            />

            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/20 p-4 backdrop-blur-md border-4 border-white/50 shadow-2xl flex items-center justify-center"
            >
              
              {/* Dynamic Bowl Image with Animated Crossfade */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl bg-white border-4 border-amber-950/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.image}
                    initial={{ opacity: 0, scale: 1.15, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotate: 4 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <ImagePlaceholder
                      src={slide.image}
                      alt={slide.dishTitle}
                      className="w-full h-full object-cover"
                      category="trang-mieng"
                      showLabel={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Satellite Badge 1: Dish name */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dish-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-3 -left-3 sm:-left-6 bg-white/95 text-stone-800 rounded-2xl p-2.5 shadow-2xl border border-amber-200 max-w-[170px] hidden sm:block backdrop-blur-xs"
                >
                  <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500 fill-current" />
                    {slide.dishTag}
                  </span>
                  <span className="text-xs font-bold text-stone-900 line-clamp-1 mt-0.5">
                    {slide.dishTitle}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Floating Satellite Badge 2: Free Dessert */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="absolute -bottom-3 -right-2 sm:-right-4 bg-red-600 text-white rounded-2xl px-4 py-2.5 shadow-2xl border-2 border-yellow-300 text-center"
              >
                <span className="text-xs sm:text-sm font-black uppercase block leading-tight tracking-wider text-yellow-200">
                  TẶNG CHÈ HUẾ
                </span>
                <span className="text-[10px] text-white font-medium">
                  Mua mang về từ 3 món
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
