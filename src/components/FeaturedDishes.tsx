import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, Plus, Check, Heart, Sparkles, Utensils } from 'lucide-react';
import { Dish } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface FeaturedDishesProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
  onViewDish: (dish: Dish) => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  dishes,
  onAddToCart,
  onViewDish,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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
    <section id="thuc-don" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fbf7f0] border border-amber-300/80 shadow-xs mb-3">
          <span className="seal-stamp text-[10px] py-0.5 px-1.5">TOÀN TẬP</span>
          <span className="font-serif font-semibold text-xs tracking-widest text-[#7f1d1d] uppercase">
            Hương Vị Phở Hà Nội Thuần Khiết
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-[#7f1d1d]">
          Thực Đơn Phở Ngọc Hân
        </h2>

        <p className="font-calligraphy text-2xl sm:text-3xl text-[#b45309] mt-2 font-normal">
          Ninh xương ống 18 tiếng • Không mì chính
        </p>

        {/* Traditional Brass / Gold Motif Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#b45309]/80" />
          <span className="text-[#b45309] text-xs tracking-widest">❖ ✦ ❖</span>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#b45309]/80" />
        </div>

        <p className="text-xs sm:text-sm text-stone-600 font-literary italic max-w-2xl mx-auto leading-relaxed">
          Chuyên các món phở bò truyền thống (tái, chín, gầu, gân, sốt vang), phở gà ta thả đồi thơm lá chanh, phở cuốn tươi mát và phở xào nóng hổi
        </p>
      </motion.div>

      {/* Dishes Grid - All Dishes Displayed Directly Without Filters */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {dishes.map((dish, index) => {
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
                  delay: Math.min(index * 0.04, 0.35),
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 30px -10px rgba(180, 83, 9, 0.15)",
                  transition: { duration: 0.25 }
                }}
                className="group bg-[#fffdfa] rounded-2xl overflow-hidden shadow-md border border-[#e8ded2] flex flex-col cursor-pointer transition-colors hover:border-[#b45309]"
              >
                {/* Image Container with Zoom and Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <ImagePlaceholder
                    src={dish.image}
                    alt={dish.name}
                    aspectRatio="auto"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Top tags */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {dish.tags?.[0] && (
                      <span className="bg-[#991b1b]/90 text-amber-100 font-serif text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs border border-amber-400/30">
                        {dish.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(dish.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-stone-600 hover:text-red-500 flex items-center justify-center shadow-sm transition-all z-10 border border-amber-200/50"
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Hover Overlay with Quick View hint */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#fffdfa] text-stone-900 font-serif text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform border border-amber-400/50">
                      <Eye className="w-3.5 h-3.5 text-[#991b1b]" />
                      <span>Xem chi tiết</span>
                    </span>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#fffdfa] to-[#fbf7f0]">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-black text-[#261c16] group-hover:text-[#991b1b] transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 font-literary line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="text-base sm:text-lg font-serif font-black text-[#991b1b]">
                        {formatPrice(dish.price)}
                      </span>
                      {dish.originalPrice && (
                        <span className="text-xs text-stone-400 line-through block font-serif">
                          {formatPrice(dish.originalPrice)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={(e) => handleOrder(dish, e)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer border border-amber-400/40 ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100'
                      }`}
                      title="Đặt bát phở này"
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
