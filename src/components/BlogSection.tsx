import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-am-thuc" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title matching artistic theme */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fbf7f0] border border-amber-300/80 shadow-xs mb-3">
          <span className="seal-stamp text-[10px] py-0.5 px-1.5">BÚT KÝ</span>
          <span className="font-serif font-semibold text-xs tracking-widest text-[#7f1d1d] uppercase">
            Chuyện Nghề & Ký Ức Hà Thành
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-[#7f1d1d]">
          Blog Ẩm Thực Phở
        </h2>

        <p className="font-calligraphy text-2xl sm:text-3xl text-[#b45309] mt-2 font-normal">
          Ghi chép của cô giáo già về nồi nước dùng và tình nghĩa học trò
        </p>

        {/* Traditional Gold Motif Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#b45309]/80" />
          <span className="text-[#b45309] text-xs tracking-widest">❖ ✦ ❖</span>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#b45309]/80" />
        </div>
      </motion.div>

      {/* 3 Articles Grid with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.article
            key={post.id}
            id={`blog-card-${post.id}`}
            onClick={() => setSelectedPost(post)}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 30px -8px rgba(127, 29, 29, 0.15)",
              transition: { duration: 0.25 }
            }}
            className="group bg-[#fffdfa] rounded-2xl overflow-hidden shadow-xs border border-amber-200/90 flex flex-col cursor-pointer transition-colors hover:border-[#991b1b]"
          >
            {/* Post Image with resilient placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-amber-200/60">
              <ImagePlaceholder
                src={post.image}
                alt={post.title}
                aspectRatio="banner"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-[#7f1d1d] text-amber-100 border border-amber-400/50 text-[10px] font-serif font-bold px-3 py-1 rounded-full shadow-md">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-[#991b1b] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-literary my-2.5">
                <Calendar className="w-3.5 h-3.5 text-[#991b1b]" />
                <span>Ngày {post.date}</span>
              </div>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed font-literary">
                {post.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center text-xs font-serif font-bold text-[#991b1b] group-hover:translate-x-1.5 transition-transform">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                <span>Đọc tâm sự</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Blog Article Reader Modal with Animated Scale & Fade */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative aspect-video w-full">
                <ImagePlaceholder
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  aspectRatio="video"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition"
                  aria-label="Đóng bài viết"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs text-[#d96b0c] font-bold mb-2">
                  <span>{selectedPost.category}</span>
                  <span>•</span>
                  <span>Ngày {selectedPost.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-4">
                  {selectedPost.title}
                </h3>

                <div className="prose prose-sm text-stone-700 space-y-3 leading-relaxed whitespace-pre-line">
                  <p className="font-medium text-stone-900">{selectedPost.excerpt}</p>
                  {selectedPost.content && <p>{selectedPost.content}</p>}
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
