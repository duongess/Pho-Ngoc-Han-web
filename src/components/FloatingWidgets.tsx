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
      text: 'Chào mừng bạn đến với Nét Huế! Bạn cần tư vấn thực đơn, đặt bàn tiệc hay giao hàng tận nơi ạ?',
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
          text: 'Cảm ơn quý khách! Chuyên viên tư vấn Nét Huế đang tiếp nhận. Quý khách cũng có thể gọi ngay Hotline 19009077 để được phục vụ nhanh nhất ạ!',
          time: 'Vừa xong',
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* 1. Bottom-Left Delivery Badge matching all screenshots */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <motion.a
          id="floating-delivery-badge"
          href="tel:19009077"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 bg-white text-stone-900 pl-2 pr-4 py-1.5 rounded-full shadow-2xl border-2 border-red-600 transition-all cursor-pointer"
          title="Gọi giao hàng tận nơi"
        >
          {/* Red Circle with Delivery Scooter */}
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md animate-pulse">
            <Bike className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-stone-500 font-medium leading-none">
              Giao hàng tận nơi
            </span>
            <span className="text-sm font-black text-red-600 leading-tight">
              19009077
            </span>
          </div>
        </motion.a>
      </motion.div>

      {/* 2. Floating Right Utility Buttons matching all screenshots */}
      <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        {/* Call button */}
        <motion.a
          id="floating-call-btn"
          href="tel:19009077"
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#d96b0c] hover:bg-[#d96b0c] hover:text-white shadow-xl flex items-center justify-center border border-amber-300 transition-colors"
          title="Hotline 19009077"
        >
          <Phone className="w-5 h-5" />
        </motion.a>

        {/* Map / Store Locator pin */}
        <motion.button
          id="floating-stores-btn"
          onClick={onScrollToStores}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#d96b0c] hover:bg-[#d96b0c] hover:text-white shadow-xl flex items-center justify-center border border-amber-300 transition-colors cursor-pointer"
          title="Xem hệ thống nhà hàng"
        >
          <MapPin className="w-5 h-5" />
        </motion.button>

        {/* Table Reservation quick button */}
        <motion.button
          id="floating-reserve-btn"
          onClick={onOpenReservation}
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#d96b0c] hover:bg-[#d96b0c] hover:text-white shadow-xl flex items-center justify-center border border-amber-300 transition-colors cursor-pointer"
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
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 text-amber-400 hover:text-white shadow-2xl flex items-center justify-center border border-amber-500/40 cursor-pointer overflow-hidden"
              title="Cuộn lên đầu trang"
              aria-label="Lên đầu trang"
            >
              {/* Progress ring SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-stone-700 fill-none"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-[#d96b0c] fill-none transition-all duration-150"
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

      {/* 3. Bottom-Right Support Chat Widget matching all screenshots */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {/* Welcome bubble like in screenshots */}
        <AnimatePresence>
          {!chatOpen && !chatDismissed && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white text-stone-800 text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-stone-200 max-w-[220px] relative"
            >
              <button
                onClick={() => setChatDismissed(true)}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-stone-300 hover:bg-stone-400 text-stone-700 flex items-center justify-center text-[10px] cursor-pointer"
                aria-label="Đóng thông báo"
              >
                ×
              </button>
              <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Nét Huế</span>
              </div>
              <p className="text-stone-600 leading-snug">
                Chào mừng bạn đến với website của chúng tôi!
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
          className="bg-[#0084ff] hover:bg-[#0074e4] text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Hỗ trợ</span>
        </motion.button>

        {/* Live Chat Popover Window */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[460px]"
            >
              {/* Chat header */}
              <div className="bg-[#0084ff] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white text-[#0084ff] font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                    NH
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-none">Hỗ trợ trực tuyến Nét Huế</h4>
                    <span className="text-[10px] text-blue-100">Luôn sẵn sàng phục vụ</span>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white/80 hover:text-white p-1 cursor-pointer"
                  aria-label="Đóng chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="p-3 overflow-y-auto space-y-2.5 h-64 bg-stone-50 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                        m.sender === 'user'
                          ? 'bg-[#0084ff] text-white rounded-tr-none'
                          : 'bg-white text-stone-800 shadow-xs border border-stone-200 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-stone-400 mt-0.5 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-stone-100 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-[#0084ff] text-white flex items-center justify-center hover:bg-[#0074e4] transition shrink-0 cursor-pointer"
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
