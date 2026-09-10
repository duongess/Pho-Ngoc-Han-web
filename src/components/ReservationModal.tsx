import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, Phone, User } from 'lucide-react';
import { STORE_BRANCHES } from '../data/mockData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branchId: STORE_BRANCHES[0].id,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '4',
    note: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng điền họ tên và số điện thoại.');
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const selectedBranch = STORE_BRANCHES.find((b) => b.id === formData.branchId) || STORE_BRANCHES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#fffdfa] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-900/40 animate-fadeIn">
        
        {/* Header with Lacquer Red & Gold */}
        <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100 px-6 py-5 flex items-center justify-between border-b-2 border-amber-400/50">
          <div className="flex items-center gap-2.5">
            <span className="seal-stamp text-[10px] py-0.5 px-2">ĐẶT BÀN</span>
            <h3 className="font-serif font-black text-lg sm:text-xl tracking-wide text-amber-100">
              Đặt bàn tại Phở Ngọc Hân
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-black/30 flex items-center justify-center transition cursor-pointer text-amber-200"
            aria-label="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <p className="text-stone-600 text-xs leading-relaxed font-literary">
                Kính mời quý khách điền thông tin để Cô Hân và quán chuẩn bị bàn ghế tươm tất cùng nước dùng nóng hổi đón tiếp quý khách.
              </p>

              {/* Branch select */}
              <div>
                <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#991b1b]" />
                  <span>Chọn địa điểm</span>
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b] font-literary text-xs sm:text-sm"
                >
                  {STORE_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} - {b.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>Ngày đến</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>Giờ hẹn</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  >
                    {['07:00', '07:30', '08:00', '08:30', '11:00', '11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Number of guests */}
              <div>
                <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#991b1b]" />
                  <span>Số lượng khách</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['2', '4', '6', '8', '10+'].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, guests: num })}
                      className={`py-2 rounded-xl text-xs font-serif font-bold border transition cursor-pointer ${
                        formData.guests === num
                          ? 'bg-[#7f1d1d] text-amber-100 border-amber-400 shadow-xs'
                          : 'bg-[#fbf7f0] text-stone-700 border-amber-200 hover:bg-amber-100/70'
                      }`}
                    >
                      {num} người
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>Họ và tên *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Quý khách / Thầy cô..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>Số điện thoại *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0988 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  />
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block font-serif font-bold text-stone-800 mb-1">
                  Ghi chú thêm (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Bàn ngoài trời thoáng mát, chuẩn bị nhiều quẩy..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-amber-100 font-serif font-bold text-sm shadow-md transition cursor-pointer border border-amber-400/40"
                >
                  Xác nhận giữ bàn chu đáo
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-2xl font-serif font-black text-[#7f1d1d]">
                Đặt bàn thành công!
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto font-literary">
                Kính gửi quý khách <strong>{formData.name}</strong>, bàn tiệc {formData.guests} người vào lúc <strong>{formData.time} ngày {formData.date}</strong> tại <strong>{selectedBranch.name}</strong> đã được ghi nhận.
              </p>
              <div className="bg-[#fbf7f0] p-4 rounded-2xl border border-amber-300 text-xs text-stone-800 text-left space-y-1 font-literary">
                <div>Địa chỉ: {selectedBranch.address}</div>
                <div>Hotline hỗ trợ: <strong className="text-[#991b1b] font-serif">{selectedBranch.hotline}</strong></div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif font-bold text-xs shadow-md transition cursor-pointer border border-amber-400/40"
              >
                Đóng & Quay lại trang chủ
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
