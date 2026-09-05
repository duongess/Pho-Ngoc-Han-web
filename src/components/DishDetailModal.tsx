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
          <div className="absolute bottom-3 left-3 bg-[#d96b0c] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Nét Huế Cố Đô
          </div>
        </div>

        {/* Dish Info */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                {dish.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {dish.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-amber-100/70 text-amber-800 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xl font-black text-[#d96b0c] shrink-0">
              {formatPrice(dish.price)}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            {dish.description}
          </p>

          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Món ăn được chế biến tươi nóng ngay khi quý khách đặt đơn.</span>
          </div>

          {/* Quantity & Add to cart */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center border border-stone-300 rounded-full px-3 py-1.5 bg-stone-50">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-600 hover:text-stone-900 p-1"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-stone-600 hover:text-stone-900 p-1"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#d96b0c] hover:bg-[#c65f0a] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vào giỏ</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm vào giỏ • {formatPrice(dish.price * quantity)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
