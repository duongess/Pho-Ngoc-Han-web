import React, { useState } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-am-thuc" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title matching Screenshot 4 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-[#c65f0a]">
            Blog ẩm thực
          </h2>
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans">
          Hãy cùng khám phá thực đơn tại nhà hàng Nét Huế để được thưởng thức trọn hương vị ẩm thực Huế
        </p>
        <p className="text-xs text-amber-700/80 font-serif italic">
          Huế Tinh hoa ẩm thực Huế
        </p>
      </div>

      {/* 3 Articles Grid matching Screenshot 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            id={`blog-card-${post.id}`}
            onClick={() => setSelectedPost(post)}
            className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col cursor-pointer transform hover:-translate-y-1"
          >
            {/* Post Image with resilient placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <ImagePlaceholder
                src={post.image}
                alt={post.title}
                aspectRatio="banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#d96b0c] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#c65f0a] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 my-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                <span>Ngày {post.date}</span>
              </div>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#d96b0c] group-hover:translate-x-1 transition-transform">
                <span>Đọc tiếp</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col">
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
                  className="px-5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
