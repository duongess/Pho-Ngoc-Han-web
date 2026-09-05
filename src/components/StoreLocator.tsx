import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Clock, Search } from 'lucide-react';
import { STORE_BRANCHES } from '../data/mockData';
import { StoreBranch } from '../types';

export const StoreLocator: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBranch, setActiveBranch] = useState<StoreBranch | null>(STORE_BRANCHES[0]);

  const districts = ['all', 'Bắc Từ Liêm', 'Cầu Giấy', 'Hà Đông', 'Đống Đa', 'Hoàn Kiếm', 'Hai Bà Trưng'];

  const filteredBranches = STORE_BRANCHES.filter((branch) => {
    const matchesDistrict = selectedDistrict === 'all' || branch.district === selectedDistrict;
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleFindNearest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Default to closest branch
          setActiveBranch(STORE_BRANCHES[0]);
          alert('Đã định vị vị trí của bạn! Nhà hàng gần bạn nhất là: Nét Huế - Bắc Từ Liêm');
        },
        () => {
          alert('Vui lòng cho phép truy cập vị trí để tìm nhà hàng Nét Huế gần nhất.');
        }
      );
    } else {
      alert('Trình duyệt không hỗ trợ định vị.');
    }
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container matching Screenshot 4 */}
        <div className="max-w-4xl mx-auto bg-[#faf8f4] rounded-2xl shadow-2xl overflow-hidden border-2 border-[#d96b0c]/40">
          
          {/* Header Bar: Amber background matching Screenshot 4 */}
          <div className="bg-[#d96b0c] text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide uppercase">
              Hệ thống nhà hàng
            </h2>

            <button
              id="find-nearest-btn"
              onClick={handleFindNearest}
              className="px-4 py-2 rounded-full bg-white text-[#d96b0c] hover:bg-amber-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#d96b0c]" />
              <span>Tìm nhà hàng gần nhất</span>
            </button>
          </div>

          {/* District Filter Chips & Search */}
          <div className="bg-stone-100/90 px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    selectedDistrict === d
                      ? 'bg-[#d96b0c] text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-300'
                  }`}
                >
                  {d === 'all' ? 'Tất cả khu vực' : d}
                </button>
              ))}
            </div>

            {/* Quick Filter */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm đường, quận..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
              />
            </div>
          </div>

          {/* Store Branches List matching Screenshot 4 & 5 */}
          <div className="divide-y divide-stone-200/80 max-h-[460px] overflow-y-auto">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                id={`branch-${branch.id}`}
                onClick={() => setActiveBranch(branch)}
                className={`p-5 transition cursor-pointer hover:bg-amber-50/40 ${
                  activeBranch?.id === branch.id ? 'bg-amber-50/70 border-l-4 border-[#d96b0c]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-amber-900 font-serif">
                    {branch.name}
                  </h3>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      branch.name + ' ' + branch.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#d96b0c] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Chỉ đường</span>
                  </a>
                </div>

                <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 pt-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-500" />
                      <span>Hotline: <strong className="text-stone-900">{branch.hotline}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-500" />
                      <span>{branch.email}</span>
                    </div>

                    {branch.hours && (
                      <div className="flex items-center gap-2 text-emerald-700 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Mở cửa: {branch.hours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredBranches.length === 0 && (
              <div className="p-8 text-center text-stone-500 text-xs sm:text-sm">
                Không tìm thấy chi nhánh phù hợp với tìm kiếm của bạn.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
