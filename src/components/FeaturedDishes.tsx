import React, { useState } from 'react';
import { ShoppingCart, Eye, Plus, Check } from 'lucide-react';
import { Dish } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface FeaturedDishesProps {
  dishes: Dish[];
  selectedCategory: string | null;
  onAddToCart: (dish: Dish) => void;
  onViewDish: (dish: Dish) => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  dishes,
  selectedCategory,
  onAddToCart,
  onViewDish,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Filter dishes based on selected category if any
  const filteredDishes = selectedCategory
    ? dishes.filter((d) => d.category === selectedCategory)
    : dishes;

  const handleOrder = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish);
    setAddedIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <section id="thuc-don" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title matching Screenshot 2 */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-[#c65f0a]">
            {selectedCategory ? 'Thực đơn lựa chọn' : 'Món ăn nổi bật'}
          </h2>
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans italic">
          Tinh túy ẩm thực Cố Đô với hương vị nguyên bản gia truyền
        </p>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredDishes.map((dish) => {
          const isJustAdded = addedIds[dish.id];

          return (
            <div
              key={dish.id}
              id={`dish-card-${dish.id}`}
              onClick={() => onViewDish(dish)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Dish Photo with Placeholder fallback */}
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <ImagePlaceholder
                  src={dish.image}
                  alt={dish.name}
                  category={dish.category}
                  aspectRatio="square"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Nét Huế watermark branding badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/20">
                  Nét Huế
                </div>

                {/* Quick view icon overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-stone-800 p-2.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-4 h-4 text-[#c65f0a]" />
                  </span>
                </div>
              </div>

              {/* Dish Information */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow items-center text-center">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#c65f0a] transition-colors line-clamp-1">
                  {dish.name}
                </h3>

                {/* Price in VND matching Screenshot 2 */}
                <div className="mt-1 mb-4 text-[#d96b0c] font-black text-base sm:text-lg">
                  {formatPrice(dish.price)}
                </div>

                {/* Button: Đặt món matching Screenshot 2 */}
                <div className="mt-auto w-full">
                  <button
                    id={`btn-order-${dish.id}`}
                    onClick={(e) => handleOrder(dish, e)}
                    className={`w-full py-2 px-4 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 border cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white text-[#d96b0c] border-[#d96b0c] hover:bg-[#d96b0c] hover:text-white shadow-xs'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Đã thêm</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Đặt món</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDishes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-500 text-sm">Chưa có món ăn trong danh mục này.</p>
        </div>
      )}
    </section>
  );
};
