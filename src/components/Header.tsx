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
    { text: '🥣 Mua mang về 3 món tặng ngay 1 cốc Chè Huế thanh mát', highlight: 'HOT PROMO' },
    { text: '🧧 Đặt bàn tiệc gia đình giảm 10% - Tặng rượu Cung Đình', highlight: 'SUM VẦY' },
    { text: '🛵 Giao hàng nóng hổi trong 30 phút - Hotline: 1900 9077', highlight: 'GIAO NHANH' },
    { text: '✨ Tinh hoa ẩm thực Huế - Hương vị nguyên bản gia truyền', highlight: 'NÉT HUẾ' },
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
        className={`bg-[#b45309] text-amber-100 text-xs px-4 overflow-hidden border-b border-amber-500/30 transition-all duration-300 ${
          isScrolled ? 'py-1 sm:py-1.5' : 'py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full uppercase shrink-0">
              {currentAnnouncement.highlight}
            </span>
            <div className="relative h-5 overflow-hidden flex-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center text-xs font-medium text-white truncate"
                >
                  {currentAnnouncement.text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-amber-200/90 font-medium shrink-0">
            <span>Giờ phục vụ: 07:00 - 22:30</span>
            <span>•</span>
            <a href="tel:19009077" className="hover:text-white transition font-bold text-yellow-300 flex items-center gap-1">
              <Phone className="w-3 h-3" /> 1900 9077
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row & Brand Identity */}
      <div className={`w-full bg-gradient-to-r from-[#d96b0c] via-[#e57a1b] to-[#d96b0c] text-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg backdrop-blur-md bg-opacity-98' : ''
      }`}>
        {/* Top Banner Row */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-white/15 transition-all duration-300 ${
          isScrolled ? 'py-2 sm:py-2.5' : 'py-3'
        }`}>
          {/* Left: Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/15 hover:bg-black/25 text-xs font-medium transition cursor-pointer border border-white/20"
              title="Đổi ngôn ngữ / Switch language"
            >
              <span className="text-sm">🇻🇳</span>
              <span className="font-semibold">{currentLang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            </button>
            <span className="hidden sm:inline-block text-xs text-amber-100/80 font-light border-l border-white/20 pl-2">
              Hotline: <strong className="text-white font-semibold">19009077</strong>
            </span>
          </div>

          {/* Center: Nét Huế Brand Logo with gentle hover pulse */}
          <div 
            onClick={() => handleNavClick('trang-chu')} 
            className="cursor-pointer flex flex-col items-center group text-center py-0.5"
          >
            <div className="flex items-center gap-2">
              {/* Traditional Bowl Stylized Emblem */}
              <div className={`rounded-full bg-amber-950/30 border border-amber-300/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-9 h-9'
              }`}>
                <img
                  src="/pho_ngoc_han_logo.svg"
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-serif font-black tracking-wide text-amber-100 drop-shadow-sm leading-none group-hover:text-yellow-200 transition-all duration-300 ${
                  isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
                }`}>
                  Phở Ngọc Hân
                </span>
                <span className="text-[10px] sm:text-[11px] font-serif italic text-amber-200/90 tracking-widest font-normal">
                  Tinh hoa ẩm thực
                </span>
              </div>
            </div>
          </div>

          {/* Right: Cart & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/15 text-xs sm:text-sm font-medium transition cursor-pointer"
              title="Tìm kiếm món ăn"
            >
              <Search className="w-4 h-4 text-amber-100" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <motion.button
              id="header-cart-btn"
              onClick={onOpenCart}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/40 hover:bg-amber-900/60 border border-amber-300/40 text-xs sm:text-sm font-medium transition cursor-pointer"
              title="Xem giỏ hàng"
            >
              <ShoppingCart className="w-4 h-4 text-amber-200" />
              <span>
                <strong className="text-amber-200">{cartCount}</strong>{' '}
                <span className="hidden sm:inline">Giỏ hàng</span>
              </span>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-black/20 transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Main Navigation Bar (Stone texture pill look like original site) */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden lg:block transition-all duration-300 ${
          isScrolled ? 'py-1.5' : 'py-2.5'
        }`}>
          <div className={`bg-[#ece7de] text-[#44382e] rounded-full px-6 flex items-center justify-between shadow-inner border border-[#dcd3c4] transition-all duration-300 ${
            isScrolled ? 'py-1 shadow-sm' : 'py-1.5'
          }`}>
            <nav className="flex items-center space-x-4 xl:space-x-7 text-xs xl:text-sm font-bold tracking-tight">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-1 transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-[#c65f0a] font-extrabold'
                        : 'hover:text-[#c65f0a] text-stone-700'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c65f0a] rounded-full"
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
              className="bg-[#e77a1e] hover:bg-[#d46a10] text-white px-5 py-1.5 rounded-full font-bold text-xs xl:text-sm shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Đặt bàn</span>
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
