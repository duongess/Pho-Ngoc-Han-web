import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { Dish } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Đóng chi tiết món"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
          <ImagePlaceholder
            src={dish.image}
            alt={dish.name}
            category={dish.category}
            aspectRatio="video"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-[#991b1b] text-amber-100 text-xs font-serif font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300/40 flex items-center gap-1.5">
            <span className="seal-stamp text-[9px] py-0 px-1">GIA TRUYỀN</span>
            <span>Phở Ngọc Hân</span>
          </div>
        </div>

        {/* Dish Info */}
        <div className="p-6 space-y-4 bg-gradient-to-b from-[#fffdfa] to-[#fbf7f0]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-[#261c16]">
                {dish.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {dish.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-serif font-bold bg-[#991b1b]/10 text-[#991b1b] border border-[#991b1b]/20 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-2xl font-serif font-black text-[#991b1b] shrink-0">
              {formatPrice(dish.price)}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-literary">
            {dish.description}
          </p>

          <div className="bg-[#fbf7f0] p-3 rounded-xl border border-amber-300/60 flex items-center gap-2 text-xs text-stone-800 font-literary">
            <Sparkles className="w-4 h-4 text-[#991b1b] shrink-0" />
            <span>Nước dùng ninh xương 18 tiếng nguyên chất không mì chính, chế biến nóng hổi ngay khi quý khách gọi món.</span>
          </div>

          {/* Quantity & Add to cart */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center border border-amber-200 rounded-full px-3 py-1.5 bg-[#fffdfa]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-600 hover:text-stone-900 p-1 cursor-pointer"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-serif font-bold text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-stone-600 hover:text-stone-900 p-1 cursor-pointer"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-full text-xs sm:text-sm font-serif font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer border border-amber-300/50 ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vào giỏ</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-amber-300" />
                  <span>Thêm bát phở • {formatPrice(dish.price * quantity)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
