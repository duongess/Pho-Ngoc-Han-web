import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Menu, X, Phone, CalendarCheck, Sparkles, BellRing } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenReservation: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentLang: 'vi' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenReservation,
  activeSection,
  onNavigate,
  currentLang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const announcements = [
    { text: '🥣 Gọi bát phở đặc biệt tặng ngay đĩa quẩy giòn 3 chiếc', highlight: 'HOT PROMO' },
    { text: '🎓 Giảm 10% cho sinh viên & giảng viên Đại học Xây Dựng, Bách Khoa', highlight: 'TRI ÂN ĐHXD' },
    { text: '🛵 Giao phở nóng tận nơi trong 30 phút - Hotline: 0988 567 899', highlight: 'GIAO NHANH' },
    { text: '✨ Phở Cô Hân - Nước dùng ninh xương bò 18 tiếng ngọt thanh nguyên bản', highlight: 'PHỞ NGỌC HÂN' },
  ];

  // Rotate announcement ticker every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Scroll listener for progress and sticky state
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'trang-chu', label: currentLang === 'vi' ? 'TRANG CHỦ' : 'HOME' },
    { id: 'gioi-thieu', label: currentLang === 'vi' ? 'GIỚI THIỆU' : 'ABOUT US' },
    { id: 'thuc-don', label: currentLang === 'vi' ? 'THỰC ĐƠN' : 'MENU' },
    { id: 'uu-dai', label: currentLang === 'vi' ? 'ƯU ĐÃI' : 'DEALS' },
    { id: 'blog-am-thuc', label: currentLang === 'vi' ? 'BLOG ẨM THỰC' : 'BLOG' },
    { id: 'he-thong-cua-hang', label: currentLang === 'vi' ? 'HỆ THỐNG CỬA HÀNG' : 'LOCATIONS' },
    { id: 'tuyen-dung', label: currentLang === 'vi' ? 'TUYỂN DỤNG' : 'CAREERS' },
    { id: 'lien-he', label: currentLang === 'vi' ? 'LIÊN HỆ' : 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentAnnouncement = announcements[tickerIndex];

  return (
    <header className="sticky top-0 z-40 w-full select-none shadow-md transition-shadow duration-300">
      {/* Top Fixed Scroll Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-black/10 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-300 via-amber-400 to-red-500 shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Announcement Bar with Rotating Text Transition Effect */}
      <div 
        className={`bg-[#181311] text-amber-100/90 text-xs px-4 overflow-hidden border-b border-amber-900/40 transition-all duration-300 ${
          isScrolled ? 'py-1 sm:py-1.5' : 'py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden flex-1">
            <span className="seal-stamp text-[10px] py-0.5 px-1.5 tracking-normal shrink-0">
              CÔ HÂN
            </span>
            <div className="relative h-5 overflow-hidden flex-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center text-xs font-literary text-amber-100/95 truncate"
                >
                  {currentAnnouncement.text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-amber-200/90 font-medium shrink-0 font-serif">
            <span>Giờ phục vụ: 06:00 - 22:30</span>
            <span className="text-amber-500">❖</span>
            <a href="tel:19009077" className="hover:text-amber-300 transition font-bold text-amber-300 flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" /> 1900 9077 - 0988 567 899
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row & Brand Identity */}
      <div className={`w-full bg-gradient-to-r from-[#6b1414] via-[#881337] to-[#7f1d1d] text-white transition-all duration-300 border-b border-amber-500/20 shadow-md ${
        isScrolled ? 'shadow-xl backdrop-blur-md bg-opacity-95' : ''
      }`}>
        {/* Top Banner Row */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-amber-200/10 transition-all duration-300 ${
          isScrolled ? 'py-2 sm:py-2.5' : 'py-3'
        }`}>
          {/* Left: Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 hover:bg-black/35 text-xs font-medium transition cursor-pointer border border-amber-300/30 text-amber-100"
              title="Đổi ngôn ngữ / Switch language"
            >
              <span className="text-sm">🇻🇳</span>
              <span className="font-serif">{currentLang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            </button>
          </div>

          {/* Center: Phở Ngọc Hân Brand Logo with Seal */}
          <div 
            onClick={() => handleNavClick('trang-chu')} 
            className="cursor-pointer flex flex-col items-center group text-center py-0.5"
          >
            <div className="flex items-center gap-2.5">
              {/* Traditional Bowl Stylized Emblem with Gold Ring */}
              <div className={`rounded-full bg-amber-950/70 border-2 border-amber-400/80 p-0.5 flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-10 h-10'
              }`}>
                <img
                  src="/pho_ngoc_han_logo.svg"
                  alt="Logo Phở Ngọc Hân"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className={`font-serif font-black tracking-wide text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none group-hover:text-yellow-200 transition-all duration-300 ${
                  isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
                }`}>
                  Phở Ngọc Hân
                </span>
                <span className="text-xs sm:text-sm font-calligraphy text-amber-300/90 tracking-wide font-normal pt-0.5">
                  Tinh hoa phở truyền thống đất Hà Thành
                </span>
              </div>
            </div>
          </div>

          {/* Right: Cart & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/20 text-xs sm:text-sm font-medium transition cursor-pointer text-amber-100"
              title="Tìm kiếm món ăn"
            >
              <Search className="w-4 h-4 text-amber-200" />
              <span className="hidden sm:inline font-literary">Tìm kiếm</span>
            </button>

            <motion.button
              id="header-cart-btn"
              onClick={onOpenCart}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/60 hover:bg-amber-950/80 border border-amber-400/50 text-xs sm:text-sm font-medium transition cursor-pointer shadow-sm text-amber-100"
              title="Xem giỏ hàng"
            >
              <ShoppingCart className="w-4 h-4 text-amber-300" />
              <span className="font-literary">
                <strong className="text-amber-300 font-serif">{cartCount}</strong>{' '}
                <span className="hidden sm:inline">Bát</span>
              </span>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-red-600 text-amber-100 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-amber-300"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-black/20 transition text-amber-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Main Navigation Bar (Parchment look with refined typography) */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden lg:block transition-all duration-300 ${
          isScrolled ? 'py-1.5' : 'py-2.5'
        }`}>
          <div className={`bg-[#fbf7f0] text-[#33251e] rounded-full px-6 flex items-center justify-between shadow-md border border-[#dfd2c0] transition-all duration-300 ${
            isScrolled ? 'py-1 shadow-sm' : 'py-1.5'
          }`}>
            <nav className="flex items-center space-x-4 xl:space-x-7 text-xs xl:text-sm font-semibold tracking-wide font-literary">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-1 transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-[#991b1b] font-bold font-serif'
                        : 'hover:text-[#991b1b] text-stone-700'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#991b1b] to-[#b45309] rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Reservation Button */}
            <motion.button
              id="nav-reservation-btn"
              onClick={onOpenReservation}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 px-5 py-1.5 rounded-full font-serif font-bold text-xs xl:text-sm shadow-md transition cursor-pointer flex items-center gap-1.5 border border-amber-400/40"
            >
              <CalendarCheck className="w-4 h-4 text-amber-300" />
              <span>Đặt bàn trước</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#f4efe6] text-stone-800 border-b border-amber-300 shadow-2xl px-4 py-4 space-y-2 animate-fadeIn max-h-[calc(100vh-100px)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-bold transition-colors ${
                  activeSection === item.id ? 'bg-amber-600 text-white' : 'hover:bg-stone-200/70 text-stone-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-stone-300 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full bg-[#e77a1e] hover:bg-[#d46a10] text-white py-2.5 rounded-full font-bold text-sm shadow flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                Đặt bàn ngay
              </button>
              <a
                href="tel:19009077"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" /> Hotline: 1900 9077
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
