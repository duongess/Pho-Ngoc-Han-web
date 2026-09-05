import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ChevronLeft, ChevronRight, Eye, Film, Sparkles } from 'lucide-react';
import { VIDEOS } from '../data/mockData';
import { ImagePlaceholder } from './ImagePlaceholder';

export const VideoSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  const prevIndex = (activeVideoIndex - 1 + VIDEOS.length) % VIDEOS.length;
  const nextIndex = (activeVideoIndex + 1) % VIDEOS.length;

  const currentVideo = VIDEOS[activeVideoIndex];
  const prevVideo = VIDEOS[prevIndex];
  const nextVideo = VIDEOS[nextIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveVideoIndex(prevIndex);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveVideoIndex(nextIndex);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > activeVideoIndex ? 1 : -1);
    setActiveVideoIndex(idx);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      rotateY: dir > 0 ? 25 : -25,
      scale: 0.88,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      rotateY: dir > 0 ? -25 : 25,
      scale: 0.88,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { duration: 0.4 },
        scale: { duration: 0.4 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Title with Entrance Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-[#c65f0a]">
            Videos
          </h2>
          <span className="w-10 sm:w-16 h-[2px] bg-[#d96b0c]/60" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans italic flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d96b0c]" />
          <span>Khám phá không gian và cảm nhận từ thực khách cùng các nhà sáng tạo nội dung</span>
        </p>
      </motion.div>

      {/* 3D Perspective Carousel Container matching Screenshot 3 */}
      <div className="relative max-w-5xl mx-auto flex items-center justify-center [perspective:1400px]">
        
        {/* Navigation buttons with hover bounce */}
        <motion.button
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl flex items-center justify-center transition border border-stone-200 cursor-pointer backdrop-blur-xs"
          aria-label="Video trước"
        >
          <ChevronLeft className="w-6 h-6 text-amber-900" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="absolute right-1 sm:right-4 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl flex items-center justify-center transition border border-stone-200 cursor-pointer backdrop-blur-xs"
          aria-label="Video tiếp theo"
        >
          <ChevronRight className="w-6 h-6 text-amber-900" />
        </motion.button>

        {/* Carousel Showcase */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-6 py-4 [transform-style:preserve-3d]">
          
          {/* Left Angled Preview Card */}
          <motion.div 
            onClick={handlePrev}
            whileHover={{ scale: 0.95, opacity: 0.85 }}
            className="hidden md:block w-1/4 h-56 lg:h-64 rounded-2xl overflow-hidden opacity-55 transition-all duration-300 shadow-xl border-2 border-stone-300/80 cursor-pointer shrink-0 [transform:rotateY(25deg)] hover:shadow-2xl"
            title={`Xem: ${prevVideo.title}`}
          >
            <div className="relative w-full h-full">
              <ImagePlaceholder
                src={prevVideo.thumbnail}
                alt={prevVideo.title}
                className="w-full h-full object-cover"
                showLabel={false}
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Main Highlight Video with 3D Motion Transition */}
          <div className="w-full max-w-2xl relative shrink-0 z-20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`video-${activeVideoIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-950 bg-black relative group"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ImagePlaceholder
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      aspectRatio="video"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Dark vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                  {/* Play button trigger with pulsing ripple ring */}
                  <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <span className="absolute w-full h-full rounded-full bg-red-600/40 animate-ping duration-1000" />
                    <motion.button
                      id="play-video-btn"
                      onClick={() => setIsPlayingModal(true)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition cursor-pointer border-2 border-white/80"
                      aria-label="Xem video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </motion.button>
                  </div>

                  {/* Bottom video duration & title badge */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 text-[11px] bg-red-600 px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase shadow">
                        <Film className="w-3 h-3" />
                        Nét Huế TV
                      </span>
                      <p className="text-sm sm:text-base font-bold mt-1.5 line-clamp-1 drop-shadow-md">
                        {currentVideo.title}
                      </p>
                    </div>

                    <span className="text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-amber-200 font-mono font-bold shrink-0 border border-white/20">
                      {currentVideo.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Angled Preview Card */}
          <motion.div 
            onClick={handleNext}
            whileHover={{ scale: 0.95, opacity: 0.85 }}
            className="hidden md:block w-1/4 h-56 lg:h-64 rounded-2xl overflow-hidden opacity-55 transition-all duration-300 shadow-xl border-2 border-stone-300/80 cursor-pointer shrink-0 [transform:rotateY(-25deg)] hover:shadow-2xl"
            title={`Xem: ${nextVideo.title}`}
          >
            <div className="relative w-full h-full">
              <ImagePlaceholder
                src={nextVideo.thumbnail}
                alt={nextVideo.title}
                className="w-full h-full object-cover"
                showLabel={false}
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Caption Directly Under Video with Animated Text Slide-up matching Screenshot 3 */}
      <div className="text-center mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${activeVideoIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-1"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-amber-950">
              {currentVideo.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                {currentVideo.views}
              </span>
              <span>•</span>
              <span className="font-medium text-amber-800">Kênh {currentVideo.channel}</span>
              <span>•</span>
              <span>Thời lượng: {currentVideo.duration}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Video switcher dots / tabs */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {VIDEOS.map((video, idx) => (
            <button
              key={video.id}
              onClick={() => handleSelect(idx)}
              className="group flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border"
              style={{
                backgroundColor: activeVideoIndex === idx ? '#d96b0c' : '#f5f3ef',
                color: activeVideoIndex === idx ? '#ffffff' : '#57534e',
                borderColor: activeVideoIndex === idx ? '#d96b0c' : '#e7e5e4',
              }}
            >
              <span className={`w-2 h-2 rounded-full ${activeVideoIndex === idx ? 'bg-white' : 'bg-stone-400 group-hover:bg-stone-600'}`} />
              <span className="hidden sm:inline">Video {idx + 1}</span>
            </button>
          ))}
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
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
            >
              {/* Close button */}
              <button
                onClick={() => setIsPlayingModal(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-stone-800/90 text-white hover:bg-red-600 flex items-center justify-center cursor-pointer transition"
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
                  <h4 className="font-bold text-sm sm:text-base font-serif text-amber-200">{currentVideo.title}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Nhà hàng Nét Huế - Tinh hoa ẩm thực Huế trứ danh</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
