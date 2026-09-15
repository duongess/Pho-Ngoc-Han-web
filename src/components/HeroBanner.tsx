import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Gift, ShoppingBag, Flame, Clock, ArrowRight } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../context/LanguageContext';

interface HeroBannerProps {
  onOrderNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOrderNow }) => {
  const { lang, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'promo-tailan',
      badge: t('hero.slide1.badge'),
      headlineMain: t('hero.slide1.headline'),
      headlineHighlight: t('hero.slide1.highlight'),
      badgeTitle: t('hero.slide1.badgetitle'),
      badgeItems: [t('hero.slide1.item1'), t('hero.slide1.item2')],
      footerNote: t('hero.slide1.footernote'),
      ctaText: t('hero.slide1.cta'),
      dishTitle: t('hero.slide1.dish'),
      dishTag: t('hero.slide1.tag'),
      image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z2343703734202511313b61907e2f570369ba5f32ead04-6355.jpg',
    },
    {
      id: 'promo-phoga',
      badge: t('hero.slide2.badge'),
      headlineMain: t('hero.slide2.headline'),
      headlineHighlight: t('hero.slide2.highlight'),
      badgeTitle: t('hero.slide2.badgetitle'),
      badgeItems: [t('hero.slide2.item1'), t('hero.slide2.item2')],
      footerNote: t('hero.slide2.footernote'),
      ctaText: t('hero.slide2.cta'),
      dishTitle: t('hero.slide2.dish'),
      dishTag: t('hero.slide2.tag'),
      image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z45056226691455b2d1e3ea75fce3d68c4f54745ab1363-1075.jpg',
    },
    {
      id: 'promo-cuon-xao',
      badge: t('hero.slide3.badge'),
      headlineMain: t('hero.slide3.headline'),
      badgeTitle: t('hero.slide3.badgetitle'),
      headlineHighlight: lang === 'en' ? 'Rich Flavors & Warm Broth' : 'Đậm Đà Hương Vị Phở Xưa',
      badgeItems: [t('hero.slide3.item1'), t('hero.slide3.item2')],
      footerNote: t('hero.slide3.footernote'),
      ctaText: t('hero.slide3.cta'),
      dishTitle: t('hero.slide3.dish'),
      dishTag: t('hero.slide3.tag'),
      image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/anh-chup-man-hinh-2023-07-11-luc-124746-8268.png',
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#3b080b] via-[#6e1319] to-[#580e15] text-white shadow-xl transition-colors duration-700 border-b border-amber-500/30"
    >
      {/* Dynamic Traditional Paper & Golden Shimmer Texture */}
      
      <img
      src="/bia.jpeg"
      loading="lazy"
      referrerPolicy="no-referrer"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:28px_28px]"
    />

      
      {/* Floating subtle warm lacquer glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 25, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-500/25 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.35, 0.2],
          x: [0, -25, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-600/30 blur-3xl pointer-events-none"
      />

      {/* Floating Steam Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-100/40 blur-[1.5px]"
            style={{
              width: `${(i % 3) * 4 + 5}px`,
              height: `${(i % 3) * 4 + 5}px`,
              left: `${12 + i * 13}%`,
              bottom: '10%',
            }}
            animate={{
              y: [-10, -200],
              x: [(i % 2 === 0 ? 0 : 25), (i % 2 === 0 ? 35 : -25)],
              opacity: [0, 0.75, 0],
              scale: [0.8, 1.7],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px] sm:min-h-[530px] lg:min-h-[550px]">
          
          {/* Left Column: Artistic Copy - fixed height layout */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left min-h-[430px] sm:min-h-[460px] lg:min-h-[475px]">
            
            {/* Slide Content Container with rock-solid fixed min-height */}
            <div className="relative min-h-[365px] sm:min-h-[385px] lg:min-h-[395px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slide-${currentSlide}`}
                  initial={{ opacity: 0, y: 15, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(3px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Traditional Calligraphy Eyebrow with Seal */}
                  <div className="h-7 sm:h-8 flex items-center">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-semibold tracking-wider uppercase w-fit border border-amber-400/40 shadow-inner">
                      <span className="seal-stamp text-[9px] py-0.5 px-1.5">{t('footer.seal')}</span>
                      <span className="font-serif tracking-widest text-amber-100">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Main Headline with fixed height container to avoid any vertical jitter */}
                  <div className="min-h-[105px] sm:min-h-[120px] md:min-h-[135px] lg:min-h-[145px] flex flex-col justify-center space-y-1.5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-[#fffdfa] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] uppercase font-serif leading-tight">
                      {slide.headlineMain}
                    </h1>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-calligraphy text-amber-200 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-snug">
                      {slide.headlineHighlight}
                    </p>
                  </div>

                  {/* Artistic Lacquer Badge with Golden Border - fixed height */}
                  <div className="min-h-[50px] sm:min-h-[54px] flex items-center">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 bg-[#1c0809]/85 text-amber-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl shadow-2xl border-2 border-amber-400/60 w-fit backdrop-blur-md hover:border-amber-300 transition">
                      <div className="flex items-center gap-1.5 font-bold font-serif text-xs sm:text-sm tracking-wider uppercase text-amber-300 shrink-0">
                        <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                        <span>{slide.badgeTitle}</span>
                      </div>
                      <div className="hidden sm:block w-px h-5 bg-amber-400/40" />
                      <div className="text-xs sm:text-sm font-literary flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-200">
                        {slide.badgeItems.map((item, idx) => (
                          <span key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button & Note - fixed height */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 min-h-[52px]">
                    <motion.button
                      id="hero-order-now-btn"
                      onClick={onOrderNow}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1c1917] via-[#291e17] to-[#1c1917] hover:from-[#2a1610] hover:to-[#221008] text-amber-200 font-serif font-bold text-sm sm:text-base tracking-widest uppercase shadow-2xl transition-all border-2 border-amber-400/80 flex items-center gap-2.5 cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-5 h-5 text-amber-400" />
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </motion.button>

                    <div className="text-xs sm:text-sm font-literary text-amber-200/90 italic flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{slide.footerNote}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Controls & Progress Dots - fixed position */}
            <div className="flex items-center gap-3 pt-3 sm:pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-amber-200 flex items-center justify-center transition cursor-pointer border border-amber-400/30"
                  aria-label="Slide trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-amber-200 flex items-center justify-center transition cursor-pointer border border-amber-400/30"
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
                    style={{ width: currentSlide === index ? '30px' : '8px' }}
                    aria-label={`Đi tới banner ${index + 1}`}
                  >
                    <div className="absolute inset-0 bg-white/25" />
                    {currentSlide === index && (
                      <motion.div
                        layoutId="activeSlideProgress"
                        className="absolute inset-0 bg-gradient-to-r from-amber-300 to-yellow-400"
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
              className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-amber-400/40 pointer-events-none"
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
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-black/40 via-amber-950/30 to-black/20 p-4 backdrop-blur-md border-4 border-amber-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center"
            >
              
              {/* Dynamic Bowl Image with Animated Crossfade */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl bg-[#1c1917] border-4 border-amber-900/40">
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
                      category="pho-bo"
                      showLabel={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Satellite Badge 1: Dish name with calligraphy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dish-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-3 -left-3 sm:-left-6 bg-[#fbf7f0] text-stone-900 rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-amber-400/80 max-w-[190px] hidden sm:block backdrop-blur-xs"
                >
                  <span className="text-[10px] uppercase font-bold text-[#991b1b] tracking-wider flex items-center gap-1 font-serif">
                    <Flame className="w-3 h-3 text-red-600 fill-current" />
                    {slide.dishTag}
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-black text-stone-900 line-clamp-1 mt-0.5">
                    {slide.dishTitle}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Floating Satellite Badge 2: Free Crisp You Tiao */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="absolute -bottom-3 -right-2 sm:-right-4 bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-white rounded-2xl px-4 py-2.5 shadow-2xl border-2 border-amber-300 text-center"
              >
                <span className="text-xs sm:text-sm font-serif font-black uppercase block leading-tight tracking-wider text-amber-200">
                  {lang === 'en' ? 'FREE CRULLERS' : 'TẶNG QUẨY GIÒN'}
                </span>
                <span className="text-[10px] text-amber-100 font-literary font-medium">
                  {lang === 'en' ? 'Freshly fried & crispy daily' : 'Tươi nóng giòn tan mỗi ngày'}
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
