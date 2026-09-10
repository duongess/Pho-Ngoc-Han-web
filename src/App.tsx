import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { BestsellerSection } from './components/BestsellerSection';
import { FeaturedDishes } from './components/FeaturedDishes';
import { BrandStory } from './components/BrandStory';
import { VideoSection } from './components/VideoSection';
import { BlogSection } from './components/BlogSection';
import { StoreLocator } from './components/StoreLocator';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { SearchModal } from './components/SearchModal';
import { DishDetailModal } from './components/DishDetailModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { DISHES } from './data/mockData';
import { Dish, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeSection, setActiveSection] = useState('trang-chu');
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi');

  // Cart operations
  const handleAddToCart = (dish: Dish, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Section navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'trang-chu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'gioi-thieu') {
      document.getElementById('gioi-thieu')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'thuc-don') {
      document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'uu-dai') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'blog-am-thuc') {
      document.getElementById('blog-am-thuc')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'he-thong-cua-hang') {
      document.getElementById('he-thong-cua-hang')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'tuyen-dung') {
      alert('Phở Ngọc Hân tuyển dụng nhân viên phụ bếp, chạy bàn, ưu tiên các bạn sinh viên ĐH Xây Dựng, Bách Khoa làm ca linh hoạt. Vui lòng liên hệ hotline 0988 567 899!');
    } else if (sectionId === 'lien-he') {
      document.getElementById('lien-he')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] text-[#2c241e]">
      {/* 1. Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentLang={currentLang}
        onToggleLang={() => setCurrentLang((prev) => (prev === 'vi' ? 'en' : 'vi'))}
      />

      {/* 2. Hero Promotion Banner */}
      <main className="flex-1">
        <HeroBanner
          onOrderNow={() => {
            document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Top 3 Bestseller Dishes of Phở Ngọc Hân */}
        <BestsellerSection
          bestsellers={DISHES.filter((d) => d.isFeatured).slice(0, 3)}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onViewDish={(dish) => setSelectedDish(dish)}
        />

        {/* 4. Full Menu with All Dishes (no filters) */}
        <FeaturedDishes
          dishes={DISHES}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onViewDish={(dish) => setSelectedDish(dish)}
        />

        {/* 5. Brand Heritage & Story of Retired Civil Engineering Teacher */}
        <BrandStory />

        {/* 6. Videos Carousel */}
        <VideoSection />

        {/* 7. Blog Ẩm Thực & Chuyện Phở */}
        <BlogSection />

        {/* 8. Hệ Thống Quán Phở Ngọc Hân */}
        <StoreLocator />
      </main>

      {/* 9. Detailed Footer */}
      <Footer />

      {/* Floating Action Badges & Support Chat */}
      <FloatingWidgets
        onOpenReservation={() => setIsReservationOpen(true)}
        onScrollToStores={() => {
          document.getElementById('he-thong-cua-hang')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsReservationOpen(true);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        dishes={DISHES}
        onAddToCart={(dish) => handleAddToCart(dish, 1)}
        onViewDish={(dish) => setSelectedDish(dish)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish, qty) => handleAddToCart(dish, qty)}
      />
    </div>
  );
}
