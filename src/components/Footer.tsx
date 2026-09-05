import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="lien-he" className="bg-[#141210] text-stone-300 pt-12 pb-8 border-t-2 border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          
          {/* Col 1: Brand Logo & Short Intro (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-400 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 text-amber-300" stroke="currentColor">
                  <path d="M6 22C6 34 16 40 24 40C32 40 42 34 42 22H6Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#b45309" />
                  <path d="M14 40L10 44H38L34 40" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 14C18 10 20 8 20 6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M24 14C24 9 26 7 26 5" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M30 14C30 10 32 8 32 6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black text-amber-300 tracking-wider">
                  Nét Huế
                </span>
                <span className="text-xs font-serif italic text-amber-400 tracking-widest">
                  Tinh hoa ẩm thực Huế
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pt-2">
              Nhà hàng Nét Huế gìn giữ và lan tỏa những giá trị ẩm thực tinh túy từ Cố Đô Huế đến người yêu ẩm thực Hà Thành.
            </p>
          </div>

          {/* Col 2: Thông tin liên hệ matching Screenshot 5 (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm sm:text-base font-serif font-bold text-amber-400 uppercase tracking-wide">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Tầng 4 số 34 - 36 Thái Hà, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span>Điện thoại: 0968 296433</span>
                  <br />
                  <span>Hotline: <strong className="text-white font-bold">19009077</strong></span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>nhahangnethue@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Website: nethue.com.vn</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Tin tức nổi bật & Chính sách matching Screenshot 5 (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm sm:text-base font-serif font-bold text-amber-400 uppercase tracking-wide">
              Có thể bạn quan tâm
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <a href="#dat-tiec" className="hover:text-amber-300 transition">Nhóm đông đặt tiệc</a>
              </li>
              <li>
                <a href="#dat-mon-tan-nha" className="hover:text-amber-300 transition">Đặt món phục vụ tại nhà</a>
              </li>
              <li>
                <a href="#gia" className="hover:text-amber-300 transition">Thông tin về giá sản phẩm</a>
              </li>
              <li>
                <a href="#chinh-sach-doi-tra" className="hover:text-amber-300 transition">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#chinh-sach-thanh-toan" className="hover:text-amber-300 transition">Chính sách thanh toán</a>
              </li>
              <li>
                <a href="#chinh-sach-van-chuyen" className="hover:text-amber-300 transition">Chính sách vận chuyển</a>
              </li>
              <li>
                <a href="#chinh-sach-kiem-hang" className="hover:text-amber-300 transition">Chính sách kiểm hàng</a>
              </li>
              <li>
                <a href="#chinh-sach-bao-mat" className="hover:text-amber-300 transition">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#chinh-sach-quy-dinh" className="hover:text-amber-300 transition">Chính sách quy định</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Fanpage & Mạng xã hội matching Screenshot 5 (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Fanpage Card Simulation */}
            <div className="bg-white text-stone-900 rounded-lg p-3 shadow-md border border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-serif font-bold text-xs flex items-center justify-center">
                  NH
                </div>
                <div>
                  <h5 className="text-xs font-bold leading-tight">Nhà Hàng Nét Huế</h5>
                  <span className="text-[10px] text-stone-500">30.605 người theo dõi</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-3 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition"
                >
                  <Facebook className="w-3 h-3" /> Theo dõi trang
                </a>
              </div>
            </div>

            {/* Social Icons matching Screenshot 5 */}
            <div>
              <h4 className="text-xs font-serif font-bold text-amber-400 uppercase tracking-wider mb-2">
                Mạng xã hội
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-stone-900 hover:bg-amber-400 hover:text-stone-900 flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-stone-900 hover:bg-amber-400 hover:text-stone-900 flex items-center justify-center transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-stone-900 hover:bg-amber-400 hover:text-stone-900 flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white text-blue-700 font-bold text-xs flex items-center justify-center hover:bg-amber-400 hover:text-stone-900 transition"
                  aria-label="Zalo"
                >
                  Z
                </a>
              </div>
            </div>

            {/* Gia Thành Partner Badge matching Screenshot 5 */}
            <div className="bg-white rounded-md p-2 w-fit border border-stone-300">
              <div className="text-[10px] font-black tracking-tighter text-amber-800 leading-tight">
                GIA THÀNH
              </div>
              <div className="text-[8px] text-stone-500 tracking-tight">
                Hủ tiếu • Bánh canh
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright matching Screenshot 5 */}
        <div className="pt-6 text-center text-xs text-stone-500 space-y-1 font-light">
          <p className="font-medium text-stone-400">
            CÔNG TY TNHH SẢN XUẤT VÀ DỊCH VỤ GIA THÀNH
          </p>
          <p>
            GPKD số 0105380594 do Sở KHĐT Hà Nội cấp ngày 06/07/2011 • Đại diện: Nhà hàng Nét Huế
          </p>
          <p className="text-[11px] text-stone-600">
            © {new Date().getFullYear()} Nét Huế. Tinh hoa ẩm thực Huế. Tất cả quyền được bảo lưu.
          </p>
        </div>

      </div>
    </footer>
  );
};
