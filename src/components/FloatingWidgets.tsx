import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, MessageCircle, X, Send, CalendarCheck, Bike, ArrowUp } from 'lucide-react';

interface FloatingWidgetsProps {
  onOpenReservation: () => void;
  onScrollToStores: () => void;
  onOpenCart: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  onOpenReservation,
  onScrollToStores,
  onOpenCart,
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatDismissed, setChatDismissed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Chào mừng quý khách đến với Phở Ngọc Hân! Bạn muốn đặt phở mang đi, đặt bàn hay cần tư vấn bát phở hợp khẩu vị ạ?',
      time: 'Vừa xong',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Scroll listener for back-to-top button and progress ring
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowScrollTop(scrollY > 300);
      if (totalHeight > 0) {
        setScrollProgress(Math.min((scrollY / totalHeight) * 100, 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: 'Bây giờ' }]);
    setInputMessage('');

    // Friendly auto-response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Dạ Cô Hân và quán đã nhận tin nhắn ạ! Quý khách cũng có thể gọi ngay Hotline 0988 567 899 để được phục vụ những bát phở nóng hổi nhanh nhất!',
          time: 'Vừa xong',
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* 1. Bottom-Left Delivery Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <motion.a
          id="floating-delivery-badge"
          href="tel:0988567899"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 bg-[#fffdfa] text-stone-900 pl-2 pr-4 py-1.5 rounded-full shadow-2xl border-2 border-[#991b1b] transition-all cursor-pointer"
          title="Gọi giao phở nóng tận nơi"
        >
          {/* Red Circle with Delivery Scooter */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7f1d1d] to-[#b91c1c] text-amber-200 flex items-center justify-center shadow-md animate-pulse border border-amber-300/40">
            <Bike className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-amber-900 font-serif font-medium leading-none">
              Giao phở nóng tận nơi
            </span>
            <span className="text-sm font-black text-[#991b1b] font-serif leading-tight">
              0988 567 899
            </span>
          </div>
        </motion.a>
      </motion.div>

      {/* 2. Floating Right Utility Buttons */}
      <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        {/* Call button */}
        <motion.a
          id="floating-call-btn"
          href="tel:0988567899"
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#fffdfa] text-[#7f1d1d] hover:bg-[#7f1d1d] hover:text-amber-100 shadow-xl flex items-center justify-center border border-amber-300 transition-colors"
          title="Hotline 0988 567 899"
        >
          <Phone className="w-5 h-5" />
        </motion.a>

        {/* Map / Store Locator pin */}
        <motion.button
          id="floating-stores-btn"
          onClick={onScrollToStores}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#fffdfa] text-[#7f1d1d] hover:bg-[#7f1d1d] hover:text-amber-100 shadow-xl flex items-center justify-center border border-amber-300 transition-colors cursor-pointer"
          title="Xem quán Phở Ngọc Hân"
        >
          <MapPin className="w-5 h-5" />
        </motion.button>

        {/* Table Reservation quick button */}
        <motion.button
          id="floating-reserve-btn"
          onClick={onOpenReservation}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#fffdfa] text-[#7f1d1d] hover:bg-[#7f1d1d] hover:text-amber-100 shadow-xl flex items-center justify-center border border-amber-300 transition-colors cursor-pointer"
          title="Đặt bàn ngay"
        >
          <CalendarCheck className="w-5 h-5" />
        </motion.button>

        {/* Scroll To Top Button with Circular Progress Ring */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.15, x: -3 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#450a0a] text-amber-300 hover:text-white shadow-2xl flex items-center justify-center border border-amber-400/40 cursor-pointer overflow-hidden"
              title="Cuộn lên đầu trang"
              aria-label="Lên đầu trang"
            >
              {/* Progress ring SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-[#7f1d1d]/40 fill-none"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-amber-400 fill-none transition-all duration-150"
                  strokeWidth="2.5"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * scrollProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="w-4 h-4 text-amber-300 relative z-10" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Bottom-Right Support Chat Widget */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {/* Welcome bubble */}
        <AnimatePresence>
          {!chatOpen && !chatDismissed && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#fffdfa] text-stone-800 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-amber-300 max-w-[220px] relative"
            >
              <button
                onClick={() => setChatDismissed(true)}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-stone-300 hover:bg-stone-400 text-stone-700 flex items-center justify-center text-[10px] cursor-pointer"
                aria-label="Đóng thông báo"
              >
                ×
              </button>
              <div className="flex items-center gap-1.5 text-[#7f1d1d] font-serif font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Phở Ngọc Hân</span>
              </div>
              <p className="text-stone-600 leading-snug font-literary">
                Chào mừng quý khách đến với quán phở của Cô giáo Hân!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support trigger button */}
        <motion.button
          id="support-chat-trigger-btn"
          onClick={() => setChatOpen(!chatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] hover:from-[#6b1414] hover:to-[#7f1d1d] text-amber-100 border border-amber-400/40 px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 font-serif font-bold text-xs sm:text-sm cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-amber-300 fill-current" />
          <span>Trò chuyện</span>
        </motion.button>

        {/* Live Chat Popover Window */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-80 sm:w-96 bg-[#fffdfa] rounded-3xl shadow-2xl border-2 border-amber-900/40 overflow-hidden flex flex-col max-h-[460px]"
            >
              {/* Chat header */}
              <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#6b1414] text-amber-100 px-4 py-3.5 flex items-center justify-between border-b border-amber-400/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 font-serif font-black text-xs flex items-center justify-center shadow-xs">
                    NH
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-none text-amber-100">Phở Ngọc Hân</h4>
                    <span className="text-[10px] text-amber-200/80 font-literary">Cô Hân & nhà bếp trực tuyến</span>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-amber-200 hover:text-white p-1 cursor-pointer"
                  aria-label="Đóng chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="p-3 overflow-y-auto space-y-2.5 h-64 bg-[#fbf7f0] text-xs font-literary">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 ${
                        m.sender === 'user'
                          ? 'bg-[#991b1b] text-amber-50 rounded-tr-none shadow-xs'
                          : 'bg-[#fffdfa] text-stone-800 shadow-xs border border-amber-200/80 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-stone-400 mt-0.5 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-[#fffdfa] border-t border-amber-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhắn tin với quán Cô Hân..."
                  className="flex-1 bg-[#fbf7f0] border border-amber-200 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-[#991b1b] text-amber-100 flex items-center justify-center hover:bg-[#7f1d1d] transition shrink-0 cursor-pointer border border-amber-400/40"
                  aria-label="Gửi tin nhắn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
