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
      id: 'promo-tailan',
      badge: 'ĐẶC SẢN NỨC TIẾNG HÀ THÀNH',
      headlineMain: 'PHỞ BÒ TÁI LĂN',
      headlineHighlight: 'Hương Vị Phở Xưa Hà Nội',
      badgeTitle: 'MỸ VỊ GIA TRUYỀN',
      badgeItems: ['NƯỚC DÙNG NINH XƯƠNG 18 TIẾNG', 'GIẢM 10% CHO THẦY TRÒ ĐH XÂY DỰNG'],
      footerNote: '* Nước dùng trong veo ngọt tủy, thơm nồng gừng nướng và hồi quế',
      ctaText: 'THƯỞNG THỨC NGAY',
      dishTitle: 'Phở Bò Tái Lăn Hà Nội',
      dishTag: 'Tuyệt phẩm #1 Cô Hân',
      image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z2343703734202511313b61907e2f570369ba5f32ead04-6355.jpg',
    },
    {
      id: 'promo-phoga',
      badge: 'TINH TÚY GÀ TA THẢ ĐỒI',
      headlineMain: 'PHỞ GÀ TA ĐÙI CHẶT',
      headlineHighlight: 'Da Vàng Óng Giòn Sần Sật',
      badgeTitle: 'THANH NHÃ NGUYÊN BẢN',
      badgeItems: ['LÁ CHANH NON THÁI CHỈ', 'NƯỚC PHỞ THANH TRONG NGỌT TỰ NHIÊN'],
      footerNote: '* Gà ta thả đồi tuyển chọn luộc mới mỗi sớm tinh mơ',
      ctaText: 'XEM THỰC ĐƠN',
      dishTitle: 'Phở Gà Ta Đùi Chặt',
      dishTag: 'Thanh tao ngọt dịu',
      image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z45056226691455b2d1e3ea75fce3d68c4f54745ab1363-1075.jpg',
    },
    {
      id: 'promo-cuon-xao',
      badge: 'PHỞ BÒ ĐẶC BIỆT THẬP CẨM',
      headlineMain: 'BÁT ĐẶC BIỆT ĐẦY ĐẶN',
      headlineHighlight: 'Đượm Tình Cô Giáo Xây Dựng',
      badgeTitle: 'ĐẦY ĐỦ VỊ NGON',
      badgeItems: ['TÁI, NẠM, GẦU, GÂN & TRỨNG TRẦN', 'TẶNG KÈM ĐĨA QUẨY GIÒN RỤM'],
      footerNote: '* Bát phở chất chứa tấm lòng của cô giáo về hưu gửi tới học trò',
      ctaText: 'ĐẶT BÁT ĐẶC BIỆT',
      dishTitle: 'Phở Bò Thập Cẩm Trứng Trần',
      dishTag: 'Đầy đặn no ấm',
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
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:28px_28px]" />
      
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Artistic Copy */}
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
                {/* Traditional Calligraphy Eyebrow with Seal */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-semibold tracking-wider uppercase w-fit border border-amber-400/40 shadow-inner">
                  <span className="seal-stamp text-[9px] py-0.5 px-1.5">GIA TRUYỀN</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="font-serif tracking-widest text-amber-100"
                  >
                    {slide.badge}
                  </motion.span>
                </div>

                {/* Main Headline with poetic literary typography */}
                <div className="space-y-1.5">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-[#fffdfa] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] uppercase font-serif leading-tight"
                  >
                    {slide.headlineMain}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-calligraphy text-amber-200 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-snug"
                  >
                    {slide.headlineHighlight}
                  </motion.p>
                </div>

                {/* Artistic Lacquer Badge with Golden Border */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-[#1c0809]/85 text-amber-100 px-4 sm:px-5 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-400/60 w-fit backdrop-blur-md hover:border-amber-300 transition"
                >
                  <div className="flex items-center gap-1.5 font-bold font-serif text-xs sm:text-sm tracking-wider uppercase text-amber-300">
                    <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>{slide.badgeTitle}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-amber-400/40" />
                  <div className="text-xs sm:text-sm font-literary flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-200">
                    {slide.badgeItems.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
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
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1c1917] via-[#291e17] to-[#1c1917] hover:from-[#2a1610] hover:to-[#221008] text-amber-200 font-serif font-bold text-sm sm:text-base tracking-widest uppercase shadow-2xl transition-all border-2 border-amber-400/80 flex items-center gap-2.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </motion.button>

                  <div className="text-xs sm:text-sm font-literary text-amber-200/90 italic flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
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
                  TẶNG QUẨY GIÒN
                </span>
                <span className="text-[10px] text-amber-100 font-literary font-medium">
                  Tươi nóng giòn tan mỗi ngày
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
