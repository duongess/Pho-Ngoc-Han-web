import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Check, Award, Star } from 'lucide-react';
import { Dish } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../context/LanguageContext';

interface BestsellerSectionProps {
  bestsellers: Dish[];
  onAddToCart: (dish: Dish) => void;
  onViewDish: (dish: Dish) => void;
}

export const BestsellerSection: React.FC<BestsellerSectionProps> = ({
  bestsellers,
  onAddToCart,
  onViewDish,
}) => {
  const { lang, t, getDishName, getDishDesc } = useLanguage();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

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

  const medals = [
    { label: lang === 'en' ? '✦ CULINARY TREASURE #1' : '✦ BẢO VẬT ẨM THỰC #1', bg: 'bg-gradient-to-r from-[#991b1b] to-[#b91c1c]', border: 'border-amber-400' },
    { label: lang === 'en' ? '✦ FAMOUS SPECIALTY #2' : '✦ ĐẶC SẢN NỨC TIẾNG #2', bg: 'bg-gradient-to-r from-[#b45309] to-[#d97706]', border: 'border-amber-300' },
    { label: lang === 'en' ? '✦ HANOI ESSENCE #3' : '✦ TINH TÚY HÀ THÀNH #3', bg: 'bg-gradient-to-r from-[#854d0e] to-[#a16207]', border: 'border-amber-200' },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        {/* Seal Stamp & Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fbf7f0] border border-amber-300/80 shadow-xs mb-3">
          <span className="seal-stamp text-[10px] py-0.5 px-1.5">{lang === 'en' ? 'PREMIUM' : 'HẢO HẠNG'}</span>
          <span className="font-serif font-semibold text-xs tracking-widest text-[#7f1d1d] uppercase">
            {t('bestseller.eyebrow')}
          </span>
        </div>

        {/* Artistic Calligraphic Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-[#7f1d1d]">
          {t('bestseller.title')}
        </h2>

        {/* Traditional Brass / Gold Motif Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#b45309]/80" />
          <span className="text-[#b45309] text-xs tracking-widest">❖ ✦ ❖</span>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#b45309]/80" />
        </div>

        <p className="text-xs sm:text-sm text-stone-600 font-literary italic max-w-2xl mx-auto leading-relaxed">
          {t('bestseller.desc')}
        </p>
      </motion.div>

      {/* 3 Prominent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {bestsellers.slice(0, 3).map((dish, idx) => {
          const medal = medals[idx] || medals[0];
          const isJustAdded = addedIds[dish.id];

          return (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              onClick={() => onViewDish(dish)}
              className="relative bg-[#fffdfa] rounded-3xl overflow-hidden shadow-lg border-2 border-[#e8ded2] hover:border-[#b45309] flex flex-col cursor-pointer transition-all group"
            >
              {/* Top Medal Ribbon */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <span className={`${medal.bg} text-amber-100 text-[11px] font-serif font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 border ${medal.border}`}>
                  <Award className="w-3.5 h-3.5 text-yellow-300" />
                  {medal.label}
                </span>
              </div>

              {/* Dish Image with Antique Frame effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <ImagePlaceholder
                  src={dish.image}
                  alt={getDishName(dish)}
                  aspectRatio="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-xs text-amber-300 text-xs px-2.5 py-1 rounded-full font-serif font-bold flex items-center gap-1 border border-amber-400/40">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>5.0 {lang === 'en' ? '(999+ reviews)' : '(999+ thực khách khen)'}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#fffdfa] to-[#fbf7f0]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#261c16] group-hover:text-[#991b1b] transition-colors leading-snug">
                    {getDishName(dish)}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 font-literary line-clamp-3 leading-relaxed">
                    {getDishDesc(dish)}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#991b1b] font-serif">
                      {formatPrice(dish.price)}
                    </div>
                    {dish.originalPrice && (
                      <div className="text-xs text-stone-400 line-through font-serif">
                        {formatPrice(dish.originalPrice)}
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={(e) => handleOrder(dish, e)}
                    className={`px-5 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border border-amber-400/50 ${
                      isJustAdded
                        ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                        : 'bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Added' : 'Đã thêm'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-amber-300" />
                        <span>{lang === 'en' ? 'Add Bowl' : 'Thêm bát'}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
