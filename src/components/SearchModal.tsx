import React, { useState, useMemo } from 'react';
import { X, Search, ShoppingCart, Eye } from 'lucide-react';
import { Dish } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
  onViewDish: (dish: Dish) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  dishes,
  onAddToCart,
  onViewDish,
}) => {
  const [query, setQuery] = useState('');

  const filteredDishes = useMemo(() => {
    if (!query.trim()) return dishes.slice(0, 6);
    const q = query.toLowerCase();
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, dishes]);

  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-fadeIn flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-[#d96b0c] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm bún bò, chả lươn, hến xúc bánh tráng, chè..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 focus:outline-none placeholder-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 text-xs px-2 py-1"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3 flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            {query.trim() ? `Kết quả tìm kiếm (${filteredDishes.length})` : 'Món ăn gợi ý'}
          </div>

          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-amber-50/50 border border-stone-100 transition group"
            >
              <div
                onClick={() => {
                  onClose();
                  onViewDish(dish);
                }}
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <ImagePlaceholder
                    src={dish.image}
                    alt={dish.name}
                    category={dish.category}
                    aspectRatio="square"
                    showLabel={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#d96b0c] truncate">
                    {dish.name}
                  </h5>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {dish.description}
                  </p>
                  <span className="text-xs font-bold text-[#d96b0c] mt-1 inline-block">
                    {formatPrice(dish.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onAddToCart(dish);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#d96b0c] text-white hover:bg-[#c65f0a] text-xs font-bold flex items-center gap-1 transition shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đặt món</span>
                </button>
              </div>
            </div>
          ))}

          {filteredDishes.length === 0 && (
            <div className="text-center py-10 text-stone-500 text-xs sm:text-sm">
              Không tìm thấy món ăn phù hợp với từ khóa &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
