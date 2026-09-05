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
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-fadeIn">
        
        {/* Header with Warm Hue Amber */}
        <div className="bg-[#d96b0c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h3 className="font-serif font-black text-lg sm:text-xl tracking-wide">
              Đặt bàn tại Nét Huế
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-black/20 flex items-center justify-center transition cursor-pointer"
            aria-label="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <p className="text-stone-600 text-xs leading-relaxed">
                Quý khách vui lòng điền thông tin bên dưới để nhà hàng chuẩn bị chu đáo và giữ bàn tiệc tốt nhất.
              </p>

              {/* Branch select */}
              <div>
                <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d96b0c]" />
                  <span>Chọn chi nhánh nhà hàng</span>
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
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
                  <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d96b0c]" />
                    <span>Ngày đặt</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d96b0c]" />
                    <span>Giờ đến</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                  >
                    {['11:00', '11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(
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
                <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#d96b0c]" />
                  <span>Số lượng khách</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['2', '4', '6', '8', '10+'].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, guests: num })}
                      className={`py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        formData.guests === num
                          ? 'bg-[#d96b0c] text-white border-[#d96b0c]'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
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
                  <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d96b0c]" />
                    <span>Họ và tên *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d96b0c]" />
                    <span>Số điện thoại *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                  />
                </div>
              </div>

              {/* Special notes */}
              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  Yêu cầu đặc biệt (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Tiệc sinh nhật, bàn gần cửa sổ, ghế trẻ em..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d96b0c]"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#d96b0c] hover:bg-[#c65f0a] text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Xác nhận đặt bàn ngay
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-xl font-serif font-bold text-stone-900">
                Đặt bàn thành công!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                Kính gửi quý khách <strong>{formData.name}</strong>, bàn tiệc {formData.guests} người vào lúc <strong>{formData.time} ngày {formData.date}</strong> tại <strong>{selectedBranch.name}</strong> đã được ghi nhận.
              </p>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 text-left space-y-1">
                <div>Địa chỉ: {selectedBranch.address}</div>
                <div>Hotline hỗ trợ: <strong className="text-red-700">{selectedBranch.hotline}</strong></div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-2.5 rounded-full bg-[#d96b0c] hover:bg-[#c65f0a] text-white font-bold text-xs shadow transition cursor-pointer"
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
