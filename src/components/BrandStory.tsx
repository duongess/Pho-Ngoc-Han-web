import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote, GraduationCap, Heart, Clock, Award } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

export const BrandStory: React.FC = () => {
  return (
    <section id="gioi-thieu" className="relative w-full bg-[#181311] text-amber-50 overflow-hidden py-16 sm:py-24 my-8 shadow-2xl border-y-2 border-amber-900/60">
      {/* Traditional woodblock / parchment subtle texture */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Floating subtle lacquer ambient glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-red-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Golden Framed Story Card with Scroll Reveal */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#201915]/95 p-6 sm:p-10 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative backdrop-blur-md group hover:border-amber-400/80 transition-colors"
          >
            {/* Antique corner brass brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 group-hover:scale-110 transition-transform" />

            {/* University teacher tag badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-amber-500/40 text-amber-200 text-xs font-serif tracking-wider uppercase mb-4 shadow-inner">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Ký ức giảng đường • Nồi phở đượm tình</span>
            </div>

            {/* Brand Title & Traditional Seal */}
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-amber-100 tracking-wide">
                Phở Ngọc Hân
              </h2>
              <div className="seal-stamp text-[10px] py-0.5 px-2 tracking-widest shrink-0">
                NGỌC HÂN
              </div>
            </div>

            <p className="font-calligraphy text-2xl sm:text-3xl text-amber-300 font-normal mb-5 leading-snug">
              Chuyện người cô giáo Đại học Xây Dựng sau ngày về hưu
            </p>

            <div className="space-y-4 text-stone-300 font-literary leading-relaxed text-justify text-sm sm:text-base">
              <p>
                <span className="float-left text-5xl sm:text-6xl font-serif font-black text-amber-400 mr-3 leading-none drop-shadow">
                  H
                </span>
                ơn ba mươi năm đứng trên bục giảng tại <strong>Trường Đại học Xây Dựng (Hà Nội)</strong>, Cô giáo Ngọc Hân đã dành trọn thanh xuân để dìu dắt biết bao thế hệ kỹ sư, kiến trúc sư xây đắp nên những công trình cho đất nước. Những đêm miệt mài bên đồ án của học trò, cô luôn ấp ủ một tâm nguyện mộc mạc: Ngày rời xa bảng đen phấn trắng, sẽ mở một quán phở nhỏ thơm thảo, tự tay đun nấu từng bát nước dùng ngọt lành để đón các em học trò cũ và người yêu ẩm thực tề tựu.
              </p>
              <p>
                Mang theo cái tâm chuẩn mực của nhà giáo cùng sự tỉ mỉ của người gắn bó với những bản vẽ kết cấu: Nồi nước phở của Cô Hân tuyệt đối <em>nói không với mì chính hay phụ gia công nghiệp</em>. Xương ống bò tươi được rửa qua rượu gừng, ninh liu riu suốt <strong>18 tiếng đồng hồ</strong> để từng giọt nước dùng đạt độ trong veo, sánh óng ánh và ngọt sâu nơi hậu vị. Hương thơm thanh nhã của quế chi, hoa hồi nướng và gừng ta quyện chặt vào từng thớ thịt bò mềm dẻo.
              </p>
              <p>
                Mỗi bát phở nóng hổi bưng ra bàn là một lời chúc bình an, chở che sự no ấm cho những bước chân bươn chải giữa phố phường Hà Nội.
              </p>
            </div>

            {/* Poetic quote in scroll design */}
            <div className="mt-6 pt-5 border-t border-amber-900/60 bg-black/20 p-4 rounded-2xl border border-amber-500/20 text-center">
              <Quote className="w-6 h-6 text-amber-400 mx-auto mb-1 opacity-75" />
              <p className="font-calligraphy text-2xl sm:text-3xl text-amber-200 leading-relaxed">
                “Xây những công trình lớn cho đời,<br />
                Và nấu bát phở ấm lòng người đi xa.”
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs sm:text-sm text-amber-300/80 font-serif italic">
                <span>— Cô giáo Ngọc Hân (Nguyên Giảng viên ĐH Xây Dựng)</span>
                <span className="seal-stamp text-[9px] py-0.5 px-1 tracking-normal not-italic">CẨN BÚT</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Traditional Food Presentation Visual with Parallax Float */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl aspect-square p-2.5 bg-gradient-to-tr from-amber-700/60 via-amber-400/40 to-transparent shadow-2xl border-2 border-amber-400/60 overflow-hidden"
              >
                <ImagePlaceholder
                  src="https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/anh-chup-man-hinh-2023-07-11-luc-124746-8268.png"
                  alt="Bát Phở Bò Ngọc Hân đậm đà chuẩn vị"
                  category="pho-bo"
                  aspectRatio="square"
                  className="w-full h-full rounded-2xl object-cover"
                  showLabel={false}
                />
              </motion.div>

              {/* Floating feature badge 1 */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-3 -left-3 bg-[#241c18] text-amber-200 border-2 border-amber-400/70 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Ninh xương ống 18 tiếng</span>
              </motion.div>

              {/* Floating feature badge 2 */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -top-3 -right-3 bg-[#241c18] text-amber-200 border-2 border-amber-400/70 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Không mì chính hóa chất</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
