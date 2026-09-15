import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, Phone, User } from 'lucide-react';
import { STORE_BRANCHES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { lang, t, getStoreName, getStoreAddress } = useLanguage();
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
      alert(lang === 'en' ? 'Please provide your name and phone number.' : 'Vui lòng điền họ tên và số điện thoại.');
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const selectedBranch = STORE_BRANCHES.find((b) => b.id === formData.branchId) || STORE_BRANCHES[0];
  const selectedBranchName = getStoreName(selectedBranch);
  const selectedBranchAddress = getStoreAddress(selectedBranch);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#fffdfa] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-900/40 animate-fadeIn">
        
        {/* Header with Lacquer Red & Gold */}
        <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100 px-6 py-5 flex items-center justify-between border-b-2 border-amber-400/50">
          <div className="flex items-center gap-2.5">
            <span className="seal-stamp text-[10px] py-0.5 px-2">{t('reservation.seal')}</span>
            <h3 className="font-serif font-black text-lg sm:text-xl tracking-wide text-amber-100">
              {t('reservation.title')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-black/30 flex items-center justify-center transition cursor-pointer text-amber-200"
            aria-label={lang === 'en' ? 'Close modal' : 'Đóng modal'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <p className="text-stone-600 text-xs leading-relaxed font-literary">
                {t('reservation.subtitle')}
              </p>

              {/* Branch select */}
              <div>
                <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#991b1b]" />
                  <span>{t('reservation.branch_label')}</span>
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b] font-literary text-xs sm:text-sm"
                >
                  {STORE_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {getStoreName(b)} - {getStoreAddress(b)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>{t('reservation.date_label')}</span>
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
                    <span>{t('reservation.time_label')}</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  >
                    {['07:00', '07:30', '08:00', '08:30', '11:00', '11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(
                      (tVal) => (
                        <option key={tVal} value={tVal}>
                          {tVal}
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
                  <span>{t('reservation.guests_label')}</span>
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
                      {num} {t('reservation.guests_suffix')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>{t('reservation.name_label')}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('reservation.name_placeholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-[#fbf7f0] focus:bg-[#fffdfa] focus:outline-none focus:ring-2 focus:ring-[#991b1b]"
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#991b1b]" />
                    <span>{t('reservation.phone_label')}</span>
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
                  {t('reservation.note_label')}
                </label>
                <input
                  type="text"
                  placeholder={t('reservation.note_placeholder')}
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
                  {t('reservation.submit_btn')}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-2xl font-serif font-black text-[#7f1d1d]">
                {t('reservation.success_title')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto font-literary">
                {t('reservation.success_desc')
                  .replace('{name}', formData.name)
                  .replace('{guests}', formData.guests)
                  .replace('{time}', formData.time)
                  .replace('{date}', formData.date)
                  .replace('{branch}', selectedBranchName)}
              </p>
              <div className="bg-[#fbf7f0] p-4 rounded-2xl border border-amber-300 text-xs text-stone-800 text-left space-y-1 font-literary">
                <div>{t('reservation.address_label')} {selectedBranchAddress}</div>
                <div>{t('reservation.hotline_label')} <strong className="text-[#991b1b] font-serif">{selectedBranch.hotline}</strong></div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] to-[#b91c1c] text-amber-100 font-serif font-bold text-xs shadow-md transition cursor-pointer border border-amber-400/40"
              >
                {t('reservation.close_btn')}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
