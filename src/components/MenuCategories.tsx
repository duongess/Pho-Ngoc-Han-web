import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ImagePlaceholder } from './ImagePlaceholder';

interface MenuCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#fdfbf7] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e6decf]">
        
        {/* Decorative Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-[2px] bg-amber-600/70" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wider text-[#d96b0c] uppercase">
              MENU
            </h2>
            <span className="w-8 sm:w-16 h-[2px] bg-amber-600/70" />
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 max-w-2xl mx-auto">
            Hãy cùng khám phá thực đơn tại nhà hàng Nét Huế để được thưởng thức trọn hương vị ẩm thực Huế
          </p>
        </div>

        {/* Circular Categories Grid matching Screenshot 1 */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-200">
          
          {/* "Tất cả" option */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex flex-col items-center group cursor-pointer transition-all duration-200 flex-shrink-0 ${
              selectedCategory === null ? 'scale-105' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all p-1 shadow-md ${
                selectedCategory === null
                  ? 'border-[#d96b0c] bg-amber-50 shadow-amber-200'
                  : 'border-stone-300 bg-stone-100 group-hover:border-amber-400'
              }`}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#d96b0c] to-amber-400 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-inner">
                Tất cả
              </div>
            </div>
            <span
              className={`text-xs sm:text-sm font-medium mt-2 transition-colors ${
                selectedCategory === null ? 'text-[#d96b0c] font-bold' : 'text-stone-700'
              }`}
            >
              Xem tất cả
            </span>
          </button>

          {/* Categories from mock data matching screenshot */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  isSelected ? 'scale-105' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 transition-all p-1 shadow-md bg-white ${
                    isSelected
                      ? 'border-[#d96b0c] ring-2 ring-[#d96b0c]/30 shadow-amber-300'
                      : 'border-stone-300 group-hover:border-amber-400'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <ImagePlaceholder
                      src={cat.image}
                      alt={cat.name}
                      category={cat.id}
                      aspectRatio="square"
                      showLabel={false}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium mt-2 transition-colors whitespace-nowrap ${
                    isSelected ? 'text-[#d96b0c] font-bold' : 'text-stone-800'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
