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
        <div className="p-4 sm:p-5 border-b-2 border-amber-400/40 flex items-center gap-3 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100">
          <Search className="w-5 h-5 text-amber-300 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm phở bò tái lăn, phở tái gầu, phở gà, phở cuốn, phở xào..."
            className="flex-1 bg-transparent text-sm sm:text-base text-amber-50 focus:outline-none placeholder-amber-200/60 font-literary"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-amber-200 hover:text-white text-xs px-2 py-1 font-serif"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/30 text-amber-200 flex items-center justify-center transition cursor-pointer"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3 flex-1 bg-[#fffdfa]">
          <div className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-2">
            <span className="seal-stamp text-[9px] py-0.5 px-1.5">THỰC ĐƠN</span>
            <span>{query.trim() ? `Kết quả tìm kiếm (${filteredDishes.length})` : 'Món phở gợi ý từ Cô Hân'}</span>
          </div>

          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-[#fbf7f0] border border-amber-200/80 transition group"
            >
              <div
                onClick={() => {
                  onClose();
                  onViewDish(dish);
                }}
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-amber-200">
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
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#991b1b] truncate">
                    {dish.name}
                  </h5>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 font-literary">
                    {dish.description}
                  </p>
                  <span className="text-xs font-serif font-black text-[#991b1b] mt-1 inline-block">
                    {formatPrice(dish.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onAddToCart(dish);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 hover:from-[#7f1d1d] hover:to-[#991b1b] text-xs font-serif font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer border border-amber-400/40"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden sm:inline">Đặt bát</span>
                </button>
              </div>
            </div>
          ))}

          {filteredDishes.length === 0 && (
            <div className="text-center py-10 text-stone-500 text-xs sm:text-sm font-literary">
              Không tìm thấy món phở phù hợp với từ khóa &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
