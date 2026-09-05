import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

export const BrandStory: React.FC = () => {
  return (
    <section id="gioi-thieu" className="relative w-full bg-[#24211e] text-amber-50 overflow-hidden py-14 sm:py-20 my-8 shadow-inner border-y border-amber-900/40">
      {/* Subtle traditional texture / pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Floating subtle ambient glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Golden Framed Story Card matching Screenshot 3 with Scroll Reveal */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#1c1a17]/95 p-6 sm:p-10 rounded-2xl border-2 border-[#b45309]/60 shadow-2xl relative backdrop-blur-xs group hover:border-amber-400/80 transition-colors"
          >
            {/* Corner ornaments with glowing hover */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-400 group-hover:scale-110 transition-transform" />

            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#f59e0b] tracking-wide">
                Nét Huế
              </h2>
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed text-justify font-sans">
              <p>
                Ai qua Huế một lần thôi, Mang đi từ Huế ngọt lời nhớ thương. Xứ Huế nồng nàn với sông Hương, núi Ngự, dịu dàng đằm thắm với con người nơi đây. Không thể quên, xứ Huế níu kéo nỗi nhớ người đi bằng hương vị món ăn thuần khiết đậm đà.
              </p>
              <p>
                Không biết có phải ông trời cho Huế một thiên nhiên có phần khắc nghiệt: mưa thì mưa mê mải, nắng thì nắng chói chang hay không mà ẩm thực nơi đây luống mang đầy đủ phong vị chua, cay, mặn, ngọt, đắng, thơm, bùi, dẻo... Người lữ khách một lần đến Cố Đô, sao quên được vị Huế hài hòa mà đậm chất, đồ ăn Huế cầu kỳ mà thanh khiết, đẹp mắt mà giản dị thường ngày.
              </p>
            </div>

            {/* Poetic quote in bold amber with quote icon */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="mt-6 pt-4 border-t border-amber-900/60 text-amber-300 font-serif italic text-base sm:text-lg font-semibold flex items-center gap-3 transition-transform"
            >
              <Quote className="w-6 h-6 text-amber-500 shrink-0" />
              <span>“Mang đi từ Huế ngọt lời nhớ thương”</span>
            </motion.div>
          </motion.div>

          {/* Right: Traditional Food Presentation Visual with Parallax Float */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-full aspect-square p-2 bg-gradient-to-tr from-amber-700/50 via-amber-400/30 to-transparent shadow-2xl border border-amber-500/40 overflow-hidden"
              >
                <ImagePlaceholder
                  src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80"
                  alt="Bún Bò Huế Nét Huế đậm đà tròn vị"
                  category="bun-hue"
                  aspectRatio="square"
                  className="w-full h-full rounded-full object-cover"
                  showLabel={false}
                />
              </motion.div>

              {/* Floating herbs badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-3 -left-3 bg-[#2d2822] text-amber-200 border border-amber-600/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2"
              >
                <span>🌿</span>
                <span>Rau sống & Nước dùng chuẩn Cố Đô</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
