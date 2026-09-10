import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ChevronLeft, ChevronRight, Eye, Film, Sparkles, Clock, Youtube, ExternalLink } from 'lucide-react';
import { VIDEOS } from '../data/mockData';
import { ImagePlaceholder } from './ImagePlaceholder';

// Extract YouTube ID from various formats (shorts, watch?v=, youtu.be, embed)
export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];

  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) return youtuBeMatch[1];

  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
}

// Extract TikTok ID
export function getTikTokId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  return match ? match[1] : null;
}

// Resolve best thumbnail: if YouTube URL is provided, automatically resolve to YouTube's image if needed
export function resolveVideoThumbnail(video: { thumbnail: string; videoUrl?: string }): string {
  const ytId = getYouTubeId(video.videoUrl);
  if (ytId) {
    if (!video.thumbnail || video.thumbnail.includes('unsplash.com')) {
      return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    }
  }
  return video.thumbnail;
}

export const VideoSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);

  // Measure container for accurate center alignment of sliding cards
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const totalVideos = VIDEOS.length;
  const currentVideo = VIDEOS[activeVideoIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveVideoIndex((prev) => (prev + 1) % totalVideos);
  };

  const handleSelect = (idx: number) => {
    if (idx === activeVideoIndex) return;
    setDirection(idx > activeVideoIndex ? 1 : -1);
    setActiveVideoIndex(idx);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoIndex]);

  // Responsive card dimension calculations
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  
  const cardWidth = isMobile
    ? Math.min(containerWidth * 0.85, 380)
    : isTablet
    ? Math.min(containerWidth * 0.72, 540)
    : Math.min(containerWidth * 0.62, 680);

  const gap = isMobile ? 14 : 24;

  // Exact X offset to place active card dead-center in the slider container
  const trackOffset = (containerWidth - cardWidth) / 2 - activeVideoIndex * (cardWidth + gap);

  // Parse embed information for current video
  const currentYtId = getYouTubeId(currentVideo.videoUrl);
  const isCurrentShort = Boolean(currentVideo.videoUrl?.includes('/shorts/'));
  const currentTtId = getTikTokId(currentVideo.videoUrl);

  let embedSrc = '';
  if (currentYtId) {
    embedSrc = `https://www.youtube-nocookie.com/embed/${currentYtId}?autoplay=1&rel=0&playsinline=1`;
  } else if (currentTtId) {
    embedSrc = `https://www.tiktok.com/embed/v2/${currentTtId}`;
  } else if (currentVideo.videoUrl) {
    embedSrc = currentVideo.videoUrl;
  } else {
    embedSrc = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      {/* Decorative Title with Entrance Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fbf7f0] border border-amber-300/80 shadow-xs mb-3">
          <span className="seal-stamp text-[10px] py-0.5 px-1.5">THƯỚC PHIM</span>
          <span className="font-serif font-semibold text-xs tracking-widest text-[#7f1d1d] uppercase">
            Hương Vị Qua Từng Khung Hình
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-[#7f1d1d]">
          Góc Phim Phở Ngọc Hân
        </h2>

        <p className="font-calligraphy text-2xl sm:text-3xl text-[#b45309] mt-2 font-normal">
          Thực khách và học trò ghi lại những khoảnh khắc ấm lòng
        </p>

        {/* Traditional Brass / Gold Motif Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#b45309]/80" />
          <span className="text-[#b45309] text-xs tracking-widest">❖ ✦ ❖</span>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#b45309]/80" />
        </div>
      </motion.div>

      {/* Smooth Sliding Carousel Container */}
      <div className="relative max-w-6xl mx-auto" ref={containerRef}>
        
        {/* Navigation arrow buttons */}
        <motion.button
          whileHover={{ scale: 1.12, x: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl flex items-center justify-center transition-all border border-stone-200 cursor-pointer backdrop-blur-md"
          aria-label="Video trước"
        >
          <ChevronLeft className="w-6 h-6 text-amber-900" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.12, x: 3 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl flex items-center justify-center transition-all border border-stone-200 cursor-pointer backdrop-blur-md"
          aria-label="Video tiếp theo"
        >
          <ChevronRight className="w-6 h-6 text-amber-900" />
        </motion.button>

        {/* Sliding Ribbon Track */}
        <div className="overflow-hidden py-4 px-1">
          <motion.div
            className="flex items-center cursor-grab active:cursor-grabbing"
            animate={{ x: trackOffset }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1], // Silky smooth Apple-style glide deceleration
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold || velocity.x < -300) {
                handleNext();
              } else if (offset.x > swipeThreshold || velocity.x > 300) {
                handlePrev();
              }
            }}
          >
            {VIDEOS.map((video, idx) => {
              const isActive = idx === activeVideoIndex;
              const isAdjacent = Math.abs(idx - activeVideoIndex) === 1;
              const displayThumb = resolveVideoThumbnail(video);

              return (
                <motion.div
                  key={video.id}
                  style={{ width: cardWidth, marginRight: gap }}
                  className="shrink-0 transition-transform duration-500"
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : isAdjacent ? 0.65 : 0.35,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    if (!isActive) handleSelect(idx);
                  }}
                >
                  <div
                    className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black transition-all duration-500 ${
                      isActive
                        ? 'shadow-2xl ring-4 ring-[#b45309] cursor-default'
                        : 'shadow-lg hover:shadow-xl hover:opacity-90 cursor-pointer ring-1 ring-black/10'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <ImagePlaceholder
                      src={displayThumb}
                      alt={video.title}
                      aspectRatio="video"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                    {/* Center Play Button (Active only or hover) */}
                    <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      {isActive ? (
                        <>
                          <span className="absolute w-full h-full rounded-full bg-red-600/40 animate-ping duration-1000" />
                          <motion.button
                            id={`play-video-${video.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlayingModal(true);
                            }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-white flex items-center justify-center shadow-2xl transition cursor-pointer border-2 border-amber-300"
                            aria-label="Xem video"
                          >
                            <Play className="w-8 h-8 fill-current ml-1 text-amber-200" />
                          </motion.button>
                        </>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs border border-white/40">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata Bar inside Card */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between gap-3 pointer-events-none">
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-[#991b1b] text-amber-100 border border-amber-400/40 px-2 py-0.5 rounded font-serif font-bold uppercase tracking-wider shadow-sm">
                          <Film className="w-3 h-3" />
                          {video.videoUrl?.includes('/shorts/') ? 'YouTube Shorts' : 'Phở Ngọc Hân'}
                        </span>
                        <p className="text-xs sm:text-sm md:text-base font-serif font-bold mt-1 line-clamp-1 drop-shadow-md text-white">
                          {video.title}
                        </p>
                      </div>

                      <span className="text-[11px] sm:text-xs bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-amber-200 font-mono font-bold shrink-0 border border-white/20 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-300" />
                        {video.duration}
                      </span>
                    </div>

                    {/* Inactive Click Overlay Hint */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Caption Directly Under Video with Smooth Directional Horizontal Glide */}
      <div className="text-center mt-6 max-w-3xl mx-auto px-4">
        <div className="relative min-h-[70px] overflow-hidden flex flex-col items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`caption-${activeVideoIndex}`}
              custom={direction}
              initial={(dir) => ({
                opacity: 0,
                x: dir > 0 ? 40 : -40,
              })}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={(dir) => ({
                opacity: 0,
                x: dir > 0 ? -40 : 40,
              })}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-1.5 w-full"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-black text-[#7f1d1d] leading-snug">
                {currentVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 flex flex-wrap items-center justify-center gap-3">
                <span className="flex items-center gap-1 font-serif">
                  <Eye className="w-3.5 h-3.5 text-[#991b1b]" />
                  <strong className="font-bold text-stone-800">{currentVideo.views}</strong>
                </span>
                <span className="text-stone-300">•</span>
                <span className="font-serif font-medium text-amber-900 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  {currentVideo.channel}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500 font-serif">Thời lượng: {currentVideo.duration}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sleek Navigation Dots / Slider Progress Bar */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {VIDEOS.map((video, idx) => {
            const isActive = activeVideoIndex === idx;
            return (
              <button
                key={video.id}
                onClick={() => handleSelect(idx)}
                className="relative py-2 px-1 focus:outline-none cursor-pointer group"
                aria-label={`Chuyển đến video ${idx + 1}`}
                title={video.title}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-400 ${
                    isActive
                      ? 'w-9 bg-[#991b1b] shadow-sm shadow-[#991b1b]/50'
                      : 'w-2.5 bg-stone-300 group-hover:bg-stone-400 group-hover:w-4'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal with Smooth Scale Animation */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsPlayingModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`relative w-full ${
                isCurrentShort ? 'max-w-md' : 'max-w-3xl'
              } bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsPlayingModal(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-stone-800/90 text-white hover:bg-red-600 flex items-center justify-center cursor-pointer transition shadow-md"
                aria-label="Đóng video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`${isCurrentShort ? 'aspect-[9/16] max-h-[75vh]' : 'aspect-video'} w-full bg-black flex items-center justify-center relative`}>
                <iframe
                  className="w-full h-full"
                  src={embedSrc}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base font-serif text-amber-200 truncate">{currentVideo.title}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Phở Ngọc Hân - Cô giáo Đại học Xây Dựng về hưu</p>
                </div>
                {currentVideo.videoUrl && (
                  <a
                    href={currentVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 text-xs font-serif font-bold transition shrink-0 shadow border border-amber-400/40"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở xem</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
