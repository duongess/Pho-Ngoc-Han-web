import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Youtube, Heart, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="lien-he" className="bg-gradient-to-b from-[#1a0f0f] via-[#140b0b] to-[#0d0707] text-stone-300 pt-16 pb-10 border-t-2 border-amber-600/40 relative overflow-hidden">
      {/* Decorative subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-amber-900/30">
          
          {/* Col 1: Brand Logo & Short Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7f1d1d] to-[#991b1b] border-2 border-amber-400/80 overflow-hidden flex items-center justify-center p-1 shadow-lg shadow-black/60">
                <img
                  src="/pho_ngoc_han_logo.svg"
                  alt="Logo Phở Ngọc Hân"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-black gold-gradient-text tracking-wide">
                    Phở Ngọc Hân
                  </span>
                  <span className="seal-stamp text-[9px] py-0.5 px-1.5 hidden sm:inline-block">GIA TRUYỀN</span>
                </div>
                <span className="text-xs font-calligraphy text-amber-400/90 tracking-widest text-sm">
                  Đượm vị thanh tao • Gói trọn tình cô giáo
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pt-2 font-literary">
              Khởi nguồn từ tình yêu ẩm thực và cái tâm của cô giáo Đại học Xây Dựng về hưu, Phở Ngọc Hân gìn giữ nồi nước dùng ninh xương ống bò 18 tiếng ngọt thanh nguyên bản, trao gửi trọn vẹn phong vị Hà Thành xưa.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-serif bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/50">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Góc hẹn thân thương kề bên cổng Trường Đại học Xây Dựng Hà Nội</span>
            </div>
          </div>

          {/* Col 2: Thông tin liên hệ (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-base font-serif font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-xs text-stone-300 font-literary">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Số 55 Giải Phóng, Hai Bà Trưng, Hà Nội (Cạnh cổng ĐH Xây Dựng)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span>Điện thoại: <strong>0988 567 899</strong></span>
                  <br />
                  <span className="text-amber-300/80">Hotline đặt phở: <strong className="text-amber-200">1900 9077</strong></span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>phongochan.xaydung@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Website: phongochan.com</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Có thể bạn quan tâm (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-base font-serif font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Góc ẩm thực
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-literary">
              <li>
                <a href="#thuc-don" className="hover:text-amber-300 transition">Phở bò tái lăn & phở gà</a>
              </li>
              <li>
                <a href="#thuc-don" className="hover:text-amber-300 transition">Phở cuốn & phở xào giòn</a>
              </li>
              <li>
                <a href="#gioi-thieu" className="hover:text-amber-300 transition">Chuyện cô giáo Xây Dựng</a>
              </li>
              <li>
                <a href="#he-thong-cua-hang" className="hover:text-amber-300 transition">Hệ thống cơ sở quán</a>
              </li>
              <li>
                <a href="#uu-dai" className="hover:text-amber-300 transition">Ưu đãi sinh viên & thầy cô</a>
              </li>
              <li>
                <a href="#dat-mon" className="hover:text-amber-300 transition">Giao phở nóng tận nơi</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Fanpage & Mạng xã hội (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Fanpage Card */}
            <div className="bg-[#fffdfa] text-stone-900 rounded-2xl p-3.5 shadow-xl border-2 border-amber-400/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7f1d1d] to-[#991b1b] text-amber-200 font-serif font-bold text-xs flex items-center justify-center border border-amber-300">
                  NH
                </div>
                <div>
                  <h5 className="text-xs font-serif font-bold leading-tight text-[#7f1d1d]">Phở Ngọc Hân - ĐH Xây Dựng</h5>
                  <span className="text-[10px] text-stone-500 font-literary">Hơn 45.000 thực khách mến mộ</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-stone-200 flex items-center justify-between">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-3.5 py-1.5 rounded-full text-[11px] font-serif font-semibold flex items-center gap-1.5 transition shadow-xs"
                >
                  <Facebook className="w-3 h-3" /> Ghé thăm trang
                </a>
                <span className="seal-stamp text-[8px] py-0.5 px-1.5">CHÍNH HÃNG</span>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-widest mb-2.5">
                Mạng xã hội & Đánh giá
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2a1717] border border-amber-500/40 text-amber-200 hover:bg-[#991b1b] hover:text-amber-100 flex items-center justify-center transition shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2a1717] border border-amber-500/40 text-amber-200 hover:bg-[#991b1b] hover:text-amber-100 flex items-center justify-center transition shadow-sm"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#2a1717] border border-amber-500/40 text-amber-200 font-serif font-bold text-xs flex items-center justify-center hover:bg-[#991b1b] hover:text-amber-100 transition shadow-sm"
                  aria-label="Zalo"
                >
                  Zalo
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 text-center text-xs text-stone-500 space-y-1.5 font-literary">
          <p className="font-serif font-bold text-amber-400 tracking-wider">
            QUÁN PHỞ NGỌC HÂN — CÔ GIÁO ĐẠI HỌC XÂY DỰNG
          </p>
          <p className="text-stone-400">
            Địa chỉ: 55 Giải Phóng, P. Đồng Tâm, Q. Hai Bà Trưng, TP. Hà Nội • Hotline đặt phở: 0988 567 899
          </p>
          <p className="text-[11px] text-stone-500 font-serif italic">
            © {new Date().getFullYear()} Phở Ngọc Hân. Tinh hoa phở truyền thống đất Hà Thành. Gói trọn tâm tình trong từng bát phở.
          </p>
        </div>

      </div>
    </footer>
  );
};
