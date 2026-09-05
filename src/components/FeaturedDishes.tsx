import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, Plus, Check, Heart, Sparkles } from 'lucide-react';
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
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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

  const toggleFavorite = (dishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [dishId]: !prev[dishId] }));
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  };

  return (
    <section id="thuc-don" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12"
      >
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-[#c65f0a]">
            {selectedCategory ? 'Thực đơn theo danh mục' : 'Món ăn nổi bật'}
          </h2>
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans italic flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d96b0c]" />
          <span>Tinh túy ẩm thực Cố Đô với hương vị nguyên bản gia truyền</span>
        </p>
      </motion.div>

      {/* Dishes Grid with Staggered Scroll Entrance & Hover Lift */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredDishes.map((dish, index) => {
            const isJustAdded = addedIds[dish.id];
            const isFav = favorites[dish.id];

            return (
              <motion.div
                layout
                key={dish.id}
                id={`dish-card-${dish.id}`}
                onClick={() => onViewDish(dish)}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.45, 
                  delay: Math.min(index * 0.05, 0.4),
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 30px -10px rgba(180, 83, 9, 0.15)",
                  transition: { duration: 0.25 }
                }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 flex flex-col cursor-pointer transition-colors hover:border-amber-300"
              >
                {/* Dish Photo with Placeholder fallback */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <ImagePlaceholder
                    src={dish.image}
                    alt={dish.name}
                    category={dish.category}
                    aspectRatio="square"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Subtle Nét Huế watermark branding badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/20">
                    Nét Huế
                  </div>

                  {/* Favorite Heart Button */}
                  <motion.button
                    whileTap={{ scale: 0.75 }}
                    onClick={(e) => toggleFavorite(dish.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 shadow-md flex items-center justify-center transition cursor-pointer"
                    aria-label="Yêu thích món ăn"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'text-red-500 fill-red-500' : 'text-stone-400 hover:text-red-400'
                      }`} 
                    />
                  </motion.button>

                  {/* Quick view icon overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-stone-800 p-2.5 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-200">
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

                  {/* Button: Đặt món matching Screenshot 2 with bounce effect */}
                  <div className="mt-auto w-full">
                    <motion.button
                      id={`btn-order-${dish.id}`}
                      onClick={(e) => handleOrder(dish, e)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.94 }}
                      className={`w-full py-2 px-4 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 border cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-white text-[#d96b0c] border-[#d96b0c] hover:bg-[#d96b0c] hover:text-white shadow-xs'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 animate-bounce" />
                          <span>Đã thêm vào giỏ</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Đặt món</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredDishes.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8"
        >
          <p className="text-stone-500 text-sm">Chưa có món ăn trong danh mục này.</p>
        </motion.div>
      )}
    </section>
  );
};
