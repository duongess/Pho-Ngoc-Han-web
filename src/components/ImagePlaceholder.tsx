import React, { useState } from 'react';
import { Utensils, Soup, ImageOff } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  className?: string;
  category?: string;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  showLabel?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt = 'Hình ảnh món ăn Phở Ngọc Hân',
  className = '',
  category,
  aspectRatio = 'square',
  showLabel = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isMissing = !src || hasError;

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    banner: 'aspect-[21/9]',
    auto: '',
  }[aspectRatio];

  if (isMissing) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50/80 via-stone-100 to-amber-100/60 border border-amber-200/50 text-amber-800/80 ${aspectClasses} ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="relative z-10 flex flex-col items-center p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-amber-200/60 flex items-center justify-center mb-1.5 shadow-xs border border-amber-300/60">
            {category?.includes('pho') || category?.includes('bun') ? (
              <Soup className="w-5 h-5 text-amber-700" />
            ) : (
              <Utensils className="w-5 h-5 text-amber-700" />
            )}
          </div>
          {showLabel && (
            <>
              <span className="text-xs font-medium text-amber-900 line-clamp-1 max-w-[90%] font-serif">
                {alt}
              </span>
              <span className="text-[10px] text-amber-700/70 tracking-wider uppercase mt-0.5">
                Phở Ngọc Hân
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectClasses} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/80 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-stone-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
