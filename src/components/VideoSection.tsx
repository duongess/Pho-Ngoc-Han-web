import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { VIDEOS } from '../data/mockData';
import { ImagePlaceholder } from './ImagePlaceholder';

export const VideoSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  const currentVideo = VIDEOS[activeVideoIndex];

  const handlePrev = () => {
    setActiveVideoIndex((prev) => (prev === 0 ? VIDEOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveVideoIndex((prev) => (prev === VIDEOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Title matching Screenshot 3 */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-[#c65f0a]">
            Videos
          </h2>
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans italic">
          Khám phá không gian và cảm nhận từ thực khách cùng các nhà sáng tạo nội dung
        </p>
      </div>

      {/* 3D Curved Showcase matching Screenshot 3 */}
      <div className="relative max-w-5xl mx-auto flex items-center justify-center">
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg flex items-center justify-center transition border border-stone-200 cursor-pointer"
          aria-label="Video trước"
        >
          <ChevronLeft className="w-5 h-5 text-amber-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg flex items-center justify-center transition border border-stone-200 cursor-pointer"
          aria-label="Video tiếp theo"
        >
          <ChevronRight className="w-5 h-5 text-amber-800" />
        </button>

        {/* Carousel Container */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-4 overflow-hidden py-4">
          
          {/* Left Angled Preview (Screenshots show left thumbnail) */}
          <div 
            onClick={handlePrev}
            className="hidden md:block w-1/4 h-56 lg:h-64 rounded-2xl overflow-hidden opacity-60 hover:opacity-80 transition transform -rotate-3 scale-90 shadow-md border-2 border-stone-300 cursor-pointer shrink-0"
          >
            <ImagePlaceholder
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
              alt="Món ngon xứ Huế"
              className="w-full h-full object-cover"
              showLabel={false}
            />
          </div>

          {/* Center Main Highlight Video (Screenshot 3: Bà Năm Vlog lên thành phố - Chất quá bà ơi!) */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-950 bg-black relative group shrink-0">
            <div className="relative aspect-video w-full">
              <ImagePlaceholder
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                aspectRatio="video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Play button trigger */}
              <button
                id="play-video-btn"
                onClick={() => setIsPlayingModal(true)}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110 cursor-pointer border-2 border-white/80"
                aria-label="Xem video"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              {/* Bottom video duration & title badge */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] bg-red-600 px-2 py-0.5 rounded-sm font-semibold tracking-wider uppercase">
                  Nét Huế TV
                </span>
                <p className="text-sm sm:text-base font-bold mt-1 line-clamp-1">
                  {currentVideo.title}
                </p>
              </div>
            </div>
          </div>

          {/* Right Angled Preview */}
          <div 
            onClick={handleNext}
            className="hidden md:block w-1/4 h-56 lg:h-64 rounded-2xl overflow-hidden opacity-60 hover:opacity-80 transition transform rotate-3 scale-90 shadow-md border-2 border-stone-300 cursor-pointer shrink-0"
          >
            <ImagePlaceholder
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
              alt="Nồi bún bò Huế bốc khói"
              className="w-full h-full object-cover"
              showLabel={false}
            />
          </div>

        </div>
      </div>

      {/* Caption directly under video matching Screenshot 3 */}
      <div className="text-center mt-4">
        <h3 className="text-base sm:text-lg font-serif font-bold text-amber-900">
          {currentVideo.title}
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          {currentVideo.views} • Thời lượng: {currentVideo.duration}
        </p>
      </div>

      {/* Video Player Modal */}
      {isPlayingModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
            {/* Close button */}
            <button
              onClick={() => setIsPlayingModal(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-stone-800 text-white hover:bg-stone-700 flex items-center justify-center cursor-pointer transition"
              aria-label="Đóng video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm sm:text-base">{currentVideo.title}</h4>
                <p className="text-xs text-stone-400 mt-0.5">Nhà hàng Nét Huế - Tinh hoa ẩm thực Huế</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
