import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Phone, Globe, CalendarCheck, UtensilsCrossed } from 'lucide-react';

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

  return (
    <header className="relative z-30 w-full bg-gradient-to-r from-[#d96b0c] via-[#e57a1b] to-[#d96b0c] shadow-md text-white select-none">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-white/15">
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

        {/* Center: Nét Huế Brand Logo */}
        <div 
          onClick={() => handleNavClick('trang-chu')} 
          className="cursor-pointer flex flex-col items-center group text-center py-1"
        >
          <div className="flex items-center gap-2">
            {/* Traditional Bowl Stylized Emblem */}
            <div className="w-9 h-9 rounded-full bg-amber-950/30 border border-amber-300/60 flex items-center justify-center p-1.5 shadow-inner">
              <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 text-amber-200" stroke="currentColor">
                <path d="M6 22C6 34 16 40 24 40C32 40 42 34 42 22H6Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#b45309" />
                <path d="M14 40L10 44H38L34 40" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 14C18 10 20 8 20 6" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M24 14C24 9 26 7 26 5" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 14C30 10 32 8 32 6" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-amber-100 drop-shadow-sm leading-none">
                Nét Huế
              </span>
              <span className="text-[11px] sm:text-xs font-serif italic text-amber-200/90 tracking-widest font-normal">
                Tinh hoa ẩm thực Huế
              </span>
            </div>
          </div>
        </div>

        {/* Right: Cart & Search */}
        <div className="flex items-center gap-3">
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/15 text-xs sm:text-sm font-medium transition cursor-pointer"
            title="Tìm kiếm món ăn"
          >
            <Search className="w-4 h-4 text-amber-100" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/40 hover:bg-amber-900/60 border border-amber-300/40 text-xs sm:text-sm font-medium transition cursor-pointer"
            title="Xem giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4 text-amber-200" />
            <span>
              <strong className="text-amber-200">{cartCount}</strong>{' '}
              <span className="hidden sm:inline">Giỏ hàng</span>
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                {cartCount}
              </span>
            )}
          </button>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 hidden lg:block">
        <div className="bg-[#ece7de] text-[#44382e] rounded-full px-6 py-1.5 flex items-center justify-between shadow-inner border border-[#dcd3c4]">
          <nav className="flex items-center space-x-5 xl:space-x-7 text-xs xl:text-sm font-bold tracking-tight">
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
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c65f0a] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Reservation Button */}
          <button
            id="nav-reservation-btn"
            onClick={onOpenReservation}
            className="bg-[#e77a1e] hover:bg-[#d46a10] text-white px-5 py-1.5 rounded-full font-bold text-xs xl:text-sm shadow transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Đặt bàn</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f4efe6] text-stone-800 border-b border-amber-300 shadow-xl px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-bold ${
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
    </header>
  );
};
