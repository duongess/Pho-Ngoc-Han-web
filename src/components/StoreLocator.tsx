import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, Clock, Search, CheckCircle2 } from 'lucide-react';
import { STORE_BRANCHES } from '../data/mockData';
import { StoreBranch } from '../types';

export const StoreLocator: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBranch, setActiveBranch] = useState<StoreBranch | null>(STORE_BRANCHES[0]);
  const [locationToast, setLocationToast] = useState<string | null>(null);

  const districts = ['all', 'Hai Bà Trưng', 'Đống Đa'];

  const filteredBranches = STORE_BRANCHES.filter((branch) => {
    const matchesDistrict = selectedDistrict === 'all' || branch.district === selectedDistrict;
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleFindNearest = () => {
    setActiveBranch(STORE_BRANCHES[0]);
    setLocationToast('Đã định vị thành công! Chi nhánh gần bạn nhất: Phở Ngọc Hân - Cổng ĐH Xây Dựng (55 Giải Phóng)');
    setTimeout(() => {
      setLocationToast(null);
    }, 4000);
  };

  return (
    <section id="he-thong-cua-hang" className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Banner with fresh herbs and Vietnamese cuisine aesthetic */}
      <div className="absolute inset-0 bg-[#1e231d] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching Screenshot 4 with Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-[#faf8f4] rounded-2xl shadow-2xl overflow-hidden border-2 border-[#d96b0c]/40"
        >
          {/* Header Bar: Lacquer Red & Gold Header */}
          <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border-b-2 border-amber-400/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="seal-stamp text-[9px] py-0.5 px-1.5">ĐIỂM HẸN</span>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wider uppercase text-amber-100">
                  Hệ thống quán Phở Ngọc Hân
                </h2>
              </div>
              <p className="text-xs text-amber-200/80 font-literary mt-0.5">
                Kính mời quý khách, thầy cô và các bạn sinh viên ghé thưởng thức
              </p>
            </div>

            <motion.button
              id="find-nearest-btn"
              onClick={handleFindNearest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer border border-amber-200"
            >
              <MapPin className="w-4 h-4 text-[#7f1d1d] animate-bounce" />
              <span>Tìm quán gần nhất</span>
            </motion.button>
          </div>

          {/* Toast Notification for Nearest Branch */}
          <AnimatePresence>
            {locationToast && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-800 text-amber-100 text-xs sm:text-sm px-6 py-2.5 flex items-center gap-2 font-literary border-b border-emerald-600"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{locationToast}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* District Filter Chips & Search */}
          <div className="bg-[#fbf7f0] px-6 py-3.5 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {districts.map((d) => {
                const isSelected = selectedDistrict === d;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDistrict(d)}
                    className={`relative px-3.5 py-1 rounded-full text-xs font-serif font-bold transition cursor-pointer ${
                      isSelected
                        ? 'text-amber-100'
                        : 'bg-[#fffdfa] text-stone-700 hover:bg-amber-100/60 border border-amber-300/80'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeDistrictPill"
                        className="absolute inset-0 bg-[#7f1d1d] rounded-full shadow-xs"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{d === 'all' ? 'Tất cả khu vực' : d}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Search */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm đường Giải Phóng, ĐH Xây Dựng..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#fffdfa] border border-amber-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#991b1b] font-literary"
              />
            </div>
          </div>

          {/* Store Branches List */}
          <div className="divide-y divide-amber-200/60 max-h-[460px] overflow-y-auto bg-[#fffdfa]">
            {filteredBranches.map((branch) => {
              const isActive = activeBranch?.id === branch.id;
              return (
                <motion.div
                  key={branch.id}
                  id={`branch-${branch.id}`}
                  onClick={() => setActiveBranch(branch)}
                  whileHover={{ backgroundColor: 'rgba(251, 247, 240, 0.8)' }}
                  className={`p-5 sm:p-6 transition cursor-pointer ${
                    isActive ? 'bg-[#fbf7f0] border-l-4 border-[#991b1b]' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <h3 className="font-serif font-black text-base sm:text-lg text-[#7f1d1d] flex items-center gap-2">
                      <span>{branch.name}</span>
                      {isActive && (
                        <span className="seal-stamp text-[9px] py-0.5 px-2">
                          ĐANG CHỌN
                        </span>
                      )}
                    </h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        branch.name + ' ' + branch.address
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#991b1b] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#991b1b]" />
                      <span>Chỉ đường bản đồ</span>
                    </a>
                  </div>

                  <div className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-stone-700 font-literary">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 pt-1.5">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-amber-800" />
                        <span>Hotline: <strong className="text-stone-900 font-serif">{branch.hotline}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-amber-800" />
                        <span>{branch.email}</span>
                      </div>

                      {branch.hours && (
                        <div className="flex items-center gap-2 text-emerald-800 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Giờ bán: {branch.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredBranches.length === 0 && (
              <div className="p-8 text-center text-stone-500 text-xs sm:text-sm font-literary">
                Không tìm thấy quán phù hợp với tìm kiếm của bạn.
              </div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
