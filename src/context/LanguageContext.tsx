import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, Category, BlogPost, StoreBranch } from '../types';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, defaultVi?: string) => string;
  getDishName: (dish: Dish) => string;
  getDishDesc: (dish: Dish) => string;
  getDishUnit: (dish: Dish) => string;
  getDishTags: (dish: Dish) => string[];
  getCategoryName: (cat: Category) => string;
  getCategoryDesc: (cat: Category) => string;
  getBlogTitle: (post: BlogPost) => string;
  getBlogExcerpt: (post: BlogPost) => string;
  getBlogContent: (post: BlogPost) => string;
  getBlogCategory: (post: BlogPost) => string;
  getStoreName: (store: StoreBranch) => string;
  getStoreAddress: (store: StoreBranch) => string;
  getStoreHours: (store: StoreBranch) => string;
  formatPrice: (price: number) => string;
}

const UI_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  // Navigation
  'nav.home': { vi: 'TRANG CHỦ', en: 'HOME' },
  'nav.menu': { vi: 'THỰC ĐƠN', en: 'MENU' },
  'nav.blog': { vi: 'BLOG ẨM THỰC', en: 'BLOG' },
  'nav.locations': { vi: 'HỆ THỐNG CỬA HÀNG', en: 'LOCATIONS' },
  'nav.contact': { vi: 'LIÊN HỆ', en: 'CONTACT' },
  'nav.reserve': { vi: 'Đặt bàn trước', en: 'Reserve Table' },
  'nav.reserve_mobile': { vi: 'Đặt bàn trước chu đáo', en: 'Reserve a Table' },
  'nav.search': { vi: 'Tìm kiếm', en: 'Search' },
  'nav.search_placeholder': { vi: 'Tìm món phở (tái lăn, tái gân, gà ta...)...', en: 'Search phở (wok-seared, tendon, chicken...)...' },
  'nav.lang_label': { vi: 'Ngôn ngữ hiển thị:', en: 'Display language:' },
  'nav.switch_lang': { vi: 'Tiếng Việt', en: 'English' },
  'nav.tagline': { vi: 'Tinh hoa phở truyền thống đất Hà Thành', en: 'The authentic essence of traditional Hanoi Phở' },
  'nav.hours': { vi: 'Giờ phục vụ: 06:00 - 22:30', en: 'Hours: 06:00 - 22:30' },

  // Announcements
  'ticker.1': { vi: '🥣 Gọi bát phở đặc biệt tặng ngay đĩa quẩy giòn 3 chiếc', en: '🥣 Order any Special Combo bowl and receive 3 complimentary crispy crullers' },
  'ticker.2': { vi: '🎓 Giảm 10% cho sinh viên & giảng viên Đại học Xây Dựng, Bách Khoa', en: '🎓 10% discount for students & faculty of NUCE, HUST, and NEU' },
  'ticker.3': { vi: '🛵 Giao phở nóng tận nơi trong 30 phút - Hotline: 0988 567 899', en: '🛵 Piping hot phở delivered within 30 minutes - Hotline: 0988 567 899' },
  'ticker.4': { vi: '✨ Phở Cô Hân - Nước dùng ninh xương bò 18 tiếng ngọt thanh nguyên bản', en: '✨ Teacher Han’s Phở - 18-hour slow-simmered bone broth, purely authentic' },

  // Hero Banner
  'hero.slide1.badge': { vi: 'ĐẶC SẢN NỨC TIẾNG HÀ THÀNH', en: 'RENOWNED HANOI SPECIALTY' },
  'hero.slide1.headline': { vi: 'PHỞ BÒ TÁI LĂN', en: 'WOK-SEARED BEEF PHỞ' },
  'hero.slide1.highlight': { vi: 'Hương Vị Phở Xưa Hà Nội', en: 'Authentic Heritage Taste' },
  'hero.slide1.badgetitle': { vi: 'MỸ VỊ GIA TRUYỀN', en: 'HEIRLOOM FLAVOR' },
  'hero.slide1.item1': { vi: 'Nước dùng ninh xương 18 tiếng', en: '18-hour slow-simmered bone broth' },
  'hero.slide1.item2': { vi: 'Giảm 10% sinh viên & thầy cô ĐHXD', en: '10% off for NUCE students & faculty' },
  'hero.slide1.footernote': { vi: '* Nước dùng trong veo ngọt tủy, thơm nồng gừng nướng & hồi quế', en: '* Crystal-clear marrow broth, scented with roasted ginger & star anise' },
  'hero.slide1.cta': { vi: 'THƯỞNG THỨC NGAY', en: 'ORDER NOW' },
  'hero.slide1.dish': { vi: 'Phở Bò Tái Lăn Hà Nội', en: 'Hanoi Wok-Seared Beef Phở' },
  'hero.slide1.tag': { vi: 'Tuyệt phẩm #1 Cô Hân', en: 'Teacher Han’s #1 Masterpiece' },

  'hero.slide2.badge': { vi: 'TINH TÚY GÀ TA THẢ ĐỒI', en: 'FREE-RANGE CHICKEN ESSENCE' },
  'hero.slide2.headline': { vi: 'PHỞ GÀ TA ĐÙI CHẶT', en: 'CHICKEN THIGH PHỞ' },
  'hero.slide2.highlight': { vi: 'Da Vàng Óng Giòn Sần Sật', en: 'Crispy Golden Skin & Sweet Meat' },
  'hero.slide2.badgetitle': { vi: 'THANH NHÃ NGUYÊN BẢN', en: 'PURE & DELICATE' },
  'hero.slide2.item1': { vi: 'Lá chanh non thái chỉ thơm ngát', en: 'Fragrant shredded kaffir lime leaves' },
  'hero.slide2.item2': { vi: 'Nước dùng thanh trong ngọt dịu tự nhiên', en: 'Naturally delicate, crystal-clear broth' },
  'hero.slide2.footernote': { vi: '* Gà ta thả đồi tuyển chọn luộc mới mỗi sớm tinh mơ', en: '* Selected hillside free-range chicken freshly prepared each morning' },
  'hero.slide2.cta': { vi: 'XEM THỰC ĐƠN', en: 'VIEW MENU' },
  'hero.slide2.dish': { vi: 'Phở Gà Ta Đùi Chặt', en: 'Free-Range Chicken Thigh Phở' },
  'hero.slide2.tag': { vi: 'Thanh tao ngọt dịu', en: 'Delicate & soothing' },

  'hero.slide3.badge': { vi: 'PHỞ BÒ ĐẶC BIỆT THẬP CẨM', en: 'SPECIAL COMBINATION BEEF PHỞ' },
  'hero.slide3.headline': { vi: 'BÁT ĐẶC BIỆT ĐẦY ĐẶN', en: 'THE GRAND COMBINATION BOWL' },
  'hero.slide3.badgetitle': { vi: 'ĐẦY ĐỦ VỊ NGON', en: 'EVERY SAVORY CUT IN ONE BOWL' },
  'hero.slide3.item1': { vi: 'Tái, nạm, gầu, gân & trứng trần', en: 'Rare beef, brisket, flank, tendon & poached egg' },
  'hero.slide3.item2': { vi: 'Tặng kèm đĩa quẩy giòn rụm vàng ươm', en: 'Complimentary golden crispy crullers plate' },
  'hero.slide3.footernote': { vi: '* Bát phở chất chứa tấm lòng của cô giáo gửi tới học trò', en: '* A generous bowl infused with teacher’s heart for students' },
  'hero.slide3.cta': { vi: 'ĐẶT BÁT ĐẶC BIỆT', en: 'ORDER SPECIAL BOWL' },
  'hero.slide3.dish': { vi: 'Phở Bò Thập Cẩm Trứng Trần', en: 'Special Combo Beef Phở with Egg' },
  'hero.slide3.tag': { vi: 'Đầy đặn no ấm', en: 'Rich & Comforting' },

  // Bestseller Section
  'bestseller.seal': { vi: 'HẢO HẠNG', en: 'PREMIUM' },
  'bestseller.eyebrow': { vi: 'Tuyệt Phẩm Phở Gia Truyền', en: 'Authentic Heirloom Phở' },
  'bestseller.heading': { vi: 'Top 3 Món Bestseller', en: 'Top 3 Bestsellers' },
  'bestseller.subheading': { vi: 'Ninh xương ống 18 tiếng, nước dùng ngọt thanh nguyên bản không mì chính, thịt tươi mềm dẻo thái tay mỗi sớm', en: '18-hour bone broth, naturally sweet with no MSG, fresh succulent meat hand-sliced each morning' },
  'bestseller.medal1': { vi: '✦ BẢO VẬT ẨM THỰC #1', en: '✦ CULINARY TREASURE #1' },
  'bestseller.medal2': { vi: '✦ ĐẶC SẢN NỨC TIẾNG #2', en: '✦ RENOWNED SPECIALTY #2' },
  'bestseller.medal3': { vi: '✦ TINH TÚY HÀ THÀNH #3', en: '✦ ESSENCE OF HANOI #3' },
  'bestseller.order_now': { vi: 'ĐẶT MÓN NGAY', en: 'ORDER NOW' },
  'bestseller.added': { vi: 'ĐÃ THÊM VÀO GIỎ', en: 'ADDED TO CART' },

  // Full Menu (Featured Dishes)
  'menu.seal': { vi: 'TOÀN TẬP', en: 'ALL DISHES' },
  'menu.eyebrow': { vi: 'Hương Vị Phở Hà Nội Thuần Khiết', en: 'Pure Hanoi Phở Flavors' },
  'menu.heading': { vi: 'Thực Đơn Phở Ngọc Hân', en: 'Phở Ngọc Hân Menu' },
  'menu.slogan': { vi: 'Ninh xương ống 18 tiếng • Không mì chính', en: '18-Hour Bone Broth • No MSG' },
  'menu.subheading': { vi: 'Chuyên các món phở bò truyền thống (tái, chín, gầu, gân, sốt vang), phở gà ta thả đồi thơm lá chanh, phở cuốn tươi mát và phở xào nóng hổi', en: 'Featuring traditional beef phở (rare, brisket, flank, tendon, red wine stewed), fragrant chicken phở, fresh noodle rolls, and sizzling stir-fried phở' },
  'menu.add_to_cart': { vi: 'Thêm vào giỏ', en: 'Add to Cart' },
  'menu.added': { vi: 'Đã thêm', en: 'Added' },
  'menu.view_details': { vi: 'Xem chi tiết', en: 'View Details' },

  // Video Section
  'video.seal': { vi: 'TRẢI NGHIỆM', en: 'EXPERIENCE' },
  'video.eyebrow': { vi: 'Hình Ảnh & Phóng Sự', en: 'Footage & Stories' },
  'video.heading': { vi: 'Video & Ký Sự Phở Ngọc Hân', en: 'Videos & Culinary Stories' },
  'video.subheading': { vi: 'Ghi lại những khoảnh khắc ấm cúng bên nồi nước dùng bốc khói nghi ngút và trải nghiệm chân thực của thực khách tại quán Cô Hân', en: 'Capturing warm moments around the steaming broth kettle and authentic dining experiences at Teacher Han’s restaurant' },
  'video.watch_badge': { vi: 'Xem video clip', en: 'Watch video' },
  'video.playing_badge': { vi: 'Đang phát', en: 'Now playing' },
  'video.channel': { vi: 'Kênh', en: 'Channel' },
  'video.duration': { vi: 'Thời lượng:', en: 'Duration:' },
  'video.views': { vi: 'lượt xem', en: 'views' },
  'video.watch_btn': { vi: 'Xem video này', en: 'Watch this video' },
  'video.selected_btn': { vi: 'Đang chọn xem', en: 'Currently watching' },
  'video.modal_title': { vi: 'Phát video ẩm thực', en: 'Playing culinary video' },

  // Blog Section
  'blog.seal': { vi: 'BÚT KÝ', en: 'ESSAYS' },
  'blog.eyebrow': { vi: 'Chuyện Nghề & Ký Ức Hà Thành', en: 'Culinary Craft & Hanoi Memories' },
  'blog.heading': { vi: 'Blog Ẩm Thực Phở', en: 'Phở Culinary Blog' },
  'blog.date_prefix': { vi: 'Ngày', en: 'Date:' },
  'blog.read_more': { vi: 'Đọc tiếp bài viết', en: 'Read full story' },
  'blog.modal_title': { vi: 'Chi tiết bài viết', en: 'Article Details' },
  'blog.close': { vi: 'Đóng', en: 'Close' },

  // Store Locator
  'store.seal': { vi: 'ĐIỂM HẸN', en: 'LOCATIONS' },
  'store.heading': { vi: 'Hệ thống quán Phở Ngọc Hân', en: 'Phở Ngọc Hân Restaurant Locations' },
  'store.subheading': { vi: 'Kính mời quý khách, thầy cô và các bạn sinh viên ghé thưởng thức', en: 'Warmly welcoming all guests, teachers, and students' },
  'store.find_nearest': { vi: 'Tìm quán gần nhất', en: 'Find Nearest Branch' },
  'store.all': { vi: 'Tất cả chi nhánh', en: 'All Branches' },
  'store.search_placeholder': { vi: 'Tìm theo tên đường hoặc quận...', en: 'Search by street name or district...' },
  'store.hours_label': { vi: 'Giờ mở cửa:', en: 'Hours:' },
  'store.hotline_label': { vi: 'Hotline:', en: 'Hotline:' },
  'store.directions': { vi: 'Chỉ đường Google Maps', en: 'Get Directions' },
  'store.located_toast': { vi: 'Đã định vị thành công! Chi nhánh gần bạn nhất: Phở Ngọc Hân - Cổng ĐH Xây Dựng (55 Giải Phóng)', en: 'Location found! Nearest branch: Phở Ngọc Hân - NUCE Gate (55 Giai Phong)' },

  // Footer
  'footer.seal': { vi: 'GIA TRUYỀN', en: 'HEIRLOOM' },
  'footer.motto': { vi: 'Đượm vị thanh tao • Gói trọn tình cô giáo', en: 'Refined subtle elegance • Infused with teacher’s heart' },
  'footer.about': { vi: 'Khởi nguồn từ tình yêu ẩm thực và cái tâm, Phở Ngọc Hân gìn giữ nồi nước dùng ninh xương ống bò 18 tiếng ngọt thanh nguyên bản, trao gửi trọn vẹn phong vị Hà Thành xưa.', en: 'Born from deep culinary passion and dedication, Phở Ngọc Hân preserves the 18-hour bone broth tradition, offering the timeless spirit of old Hanoi.' },
  'footer.nuce': { vi: 'Góc hẹn thân thương kề bên cổng Trường Đại học Xây Dựng Hà Nội', en: 'A beloved rendezvous right by the gate of Hanoi University of Civil Engineering' },
  'footer.col_contact': { vi: 'Thông tin liên hệ', en: 'Contact Information' },
  'footer.address': { vi: 'Số 55 Giải Phóng, Hai Bà Trưng, Hà Nội (Cạnh cổng ĐH Xây Dựng)', en: '55 Giai Phong St, Hai Ba Trung, Hanoi (Next to NUCE Gate)' },
  'footer.phone_label': { vi: 'Điện thoại:', en: 'Phone:' },
  'footer.hotline_label': { vi: 'Hotline đặt phở:', en: 'Order hotline:' },
  'footer.col_cuisine': { vi: 'Góc ẩm thực', en: 'Culinary Corner' },
  'footer.link_beef': { vi: 'Phở bò tái lăn & phở gà', en: 'Wok-seared beef & chicken phở' },
  'footer.link_rolls': { vi: 'Phở cuốn & phở xào giòn', en: 'Phở rolls & crispy stir-fried phở' },
  'footer.link_stores': { vi: 'Hệ thống cơ sở quán', en: 'Restaurant locations' },
  'footer.link_promo': { vi: 'Ưu đãi sinh viên & thầy cô', en: 'Student & teacher discounts' },
  'footer.link_delivery': { vi: 'Giao phở nóng tận nơi', en: 'Piping hot delivery' },
  'footer.col_policy': { vi: 'Chính sách & Hỗ trợ', en: 'Policy & Service' },
  'footer.policy_hygiene': { vi: 'Cam kết vệ sinh ATTP 100%', en: '100% Food safety certified' },
  'footer.policy_fresh': { vi: 'Thịt bò tươi thái tay trong ngày', en: 'Fresh hand-sliced beef daily' },
  'footer.policy_delivery': { vi: 'Giao nhanh giữ nhiệt trong 30p', en: 'Thermal insulated 30-min delivery' },
  'footer.policy_feedback': { vi: 'Góp ý chất lượng phục vụ', en: 'Guest feedback & quality' },
  'footer.policy_recruit': { vi: 'Tuyển dụng phụ bếp & phục vụ', en: 'Kitchen & service careers' },
  'footer.col_social': { vi: 'Kết nối cùng Cô Hân', en: 'Connect with Us' },
  'footer.social_sub': { vi: 'Theo dõi video nấu phở và những câu chuyện đời thường ấm áp từ quán Phở Ngọc Hân.', en: 'Follow our broth simmering stories and heartwarming daily moments at Phở Ngọc Hân.' },
  'footer.copyright': { vi: 'Bản quyền thuộc về Quán Phở Ngọc Hân. Giữ trọn tinh hoa phở truyền thống đất Hà Thành.', en: 'Copyright © Phở Ngọc Hân. Preserving the true essence of traditional Hanoi Phở.' },

  // Cart Drawer
  'cart.title_cart': { vi: 'Giỏ phở của bạn', en: 'Your Phở Cart' },
  'cart.title_checkout': { vi: 'Thông tin giao hàng', en: 'Delivery Details' },
  'cart.title_success': { vi: 'Đặt món thành công', en: 'Order Successful' },
  'cart.items_count': { vi: 'phần', en: 'items' },
  'cart.promo_cruller': { vi: 'Ưu đãi quán Cô Hân: Được tặng {count} đĩa quẩy giòn thơm khi đặt từ 2 bát phở!', en: 'Special offer: Complimentary {count} plate(s) of crispy crullers for ordering 2+ bowls!' },
  'cart.empty_title': { vi: 'Giỏ hàng đang trống', en: 'Your cart is empty' },
  'cart.empty_sub': { vi: 'Khám phá thực đơn và chọn món phở nóng hổi bạn yêu thích nhé!', en: 'Explore our menu and choose your favorite steaming hot bowls!' },
  'cart.clear': { vi: 'Xóa tất cả', en: 'Clear all' },
  'cart.subtotal': { vi: 'Tạm tính:', en: 'Subtotal:' },
  'cart.delivery_fee': { vi: 'Phí giao hàng:', en: 'Delivery fee:' },
  'cart.free_inner_city': { vi: 'Miễn phí (nội thành)', en: 'Free (inner city)' },
  'cart.total': { vi: 'Tổng thanh toán:', en: 'Total Amount:' },
  'cart.checkout_btn': { vi: 'TIẾP TỤC ĐẶT HÀNG', en: 'PROCEED TO CHECKOUT' },
  'cart.continue_ordering': { vi: 'Chọn thêm món khác', en: 'Order more items' },
  'cart.customer_name': { vi: 'Họ và tên người nhận', en: 'Recipient Full Name' },
  'cart.phone': { vi: 'Số điện thoại', en: 'Phone Number' },
  'cart.address': { vi: 'Địa chỉ nhận phở (Số nhà, tên đường, phường...)', en: 'Delivery Address (Street, building, ward...)' },
  'cart.notes': { vi: 'Ghi chú cho quán (VD: nhiều hành, nước béo, ít bánh...)', en: 'Special notes (e.g. extra scallions, rich broth...)' },
  'cart.confirm_btn': { vi: 'XÁC NHẬN ĐẶT PHỞ NGAY', en: 'CONFIRM & PLACE ORDER NOW' },
  'cart.back_to_cart': { vi: 'Quay lại giỏ hàng', en: 'Back to cart' },
  'cart.success_msg': { vi: 'Đã nhận đơn phở nóng của bạn!', en: 'Order received successfully!' },
  'cart.success_sub': { vi: 'Quán Cô Hân đang chuẩn bị nước dùng sôi sùng sục và đóng gói giữ nhiệt. Nhân viên sẽ giao tới bạn trong khoảng 25 - 35 phút.', en: 'We are preparing your steaming broth in thermal packaging. Our driver will deliver within 25 - 35 minutes.' },
  'cart.close_btn': { vi: 'HOÀN TẤT & ĐÓNG', en: 'FINISH & CLOSE' },

  // Reservation Modal
  'res.seal': { vi: 'ĐẶT BÀN', en: 'RESERVATION' },
  'res.title': { vi: 'Đặt bàn tại Phở Ngọc Hân', en: 'Table Reservation at Phở Ngọc Hân' },
  'res.sub': { vi: 'Kính mời quý khách điền thông tin để Cô Hân và quán chuẩn bị bàn ghế tươm tất cùng nước dùng nóng hổi đón tiếp quý khách.', en: 'Please provide your details so Teacher Han and staff can prepare a cozy table and hot broth for your arrival.' },
  'res.branch_label': { vi: 'Chọn địa điểm', en: 'Select Branch' },
  'res.date_label': { vi: 'Ngày đến', en: 'Arrival Date' },
  'res.time_label': { vi: 'Giờ đến', en: 'Arrival Time' },
  'res.guests_label': { vi: 'Số lượng khách', en: 'Number of Guests' },
  'res.name_label': { vi: 'Họ và tên', en: 'Full Name' },
  'res.phone_label': { vi: 'Số điện thoại', en: 'Phone Number' },
  'res.note_label': { vi: 'Ghi chú đặc biệt (tùy chọn)', en: 'Special Requests (optional)' },
  'res.submit_btn': { vi: 'XÁC NHẬN ĐẶT BÀN', en: 'CONFIRM RESERVATION' },
  'res.success_title': { vi: 'Đặt bàn thành công!', en: 'Reservation Confirmed!' },
  'res.success_sub': { vi: 'Cảm ơn quý khách! Phở Ngọc Hân đã ghi nhận thông tin bàn và sẽ gọi hotline xác nhận trước giờ đón tiếp quý khách chu đáo.', en: 'Thank you! Phở Ngọc Hân has recorded your table reservation and will call to confirm before your arrival.' },
  'res.close_btn': { vi: 'Đã hiểu & Đóng', en: 'Got it & Close' },

  // Search Modal
  'search.placeholder': { vi: 'Tìm phở bò tái lăn, phở tái gầu, phở gà, phở cuốn, phở xào...', en: 'Search beef phở, chicken phở, fresh rolls, stir-fried phở...' },
  'search.clear': { vi: 'Xóa', en: 'Clear' },
  'search.found': { vi: 'Tìm thấy {count} món phù hợp', en: 'Found {count} matching dishes' },
  'search.suggestions': { vi: 'Gợi ý món ăn nổi bật', en: 'Recommended Dishes' },
  'search.empty': { vi: 'Không tìm thấy món ăn nào phù hợp với từ khóa', en: 'No dishes found matching your search' },

  // Dish Detail Modal
  'dish.seal': { vi: 'GIA TRUYỀN', en: 'HEIRLOOM' },
  'dish.quantity': { vi: 'Số lượng', en: 'Quantity' },
  'dish.add_to_cart': { vi: 'Thêm vào giỏ hàng', en: 'Add to Cart' },
  'dish.added': { vi: 'Đã thêm vào giỏ hàng', en: 'Added to Cart' },
  'dish.ingredients_highlight': { vi: 'Nước dùng ninh xương 18 tiếng • Không mì chính hóa chất • Thịt tươi trong ngày', en: '18-hour bone broth • No chemical MSG • Fresh daily meat' },

  // Floating Widgets
  'widget.tooltip_reserve': { vi: 'Đặt bàn trước', en: 'Reserve Table' },
  'widget.tooltip_stores': { vi: 'Hệ thống quán', en: 'Locations' },
  'widget.tooltip_cart': { vi: 'Giỏ phở của bạn', en: 'Your Cart' },
  'widget.tooltip_top': { vi: 'Cuộn lên đầu trang', en: 'Scroll to top' },
  'widget.chat_title': { vi: 'Tư vấn trực tuyến', en: 'Live Assistance' },
  'widget.chat_online': { vi: 'Quán Phở Ngọc Hân trực tuyến', en: 'Phở Ngọc Hân is online' },
  'widget.chat_welcome': { vi: 'Chào mừng quý khách đến với Phở Ngọc Hân! Bạn muốn đặt phở mang đi, đặt bàn hay cần tư vấn bát phở hợp khẩu vị ạ?', en: 'Welcome to Phở Ngọc Hân! Would you like to order delivery, reserve a table, or need recommendations on our best phở bowls?' },
  'widget.chat_reply': { vi: 'Dạ cảm ơn quý khách! Quán Cô Hân sẵn sàng phục vụ. Quý khách có thể bấm "Đặt bàn" hoặc gọi hotline 0988 567 899 để được hỗ trợ nhanh nhất ạ!', en: 'Thank you! Teacher Han and staff are ready to assist. You can click "Reserve Table" or call hotline 0988 567 899 for instant service!' },
  'widget.chat_placeholder': { vi: 'Nhập tin nhắn tư vấn...', en: 'Type your message...' },
  'widget.chat_send': { vi: 'Gửi', en: 'Send' },
  'widget.chat_just_now': { vi: 'Vừa xong', en: 'Just now' },
};

// Localized mapping for dishes
const DISH_TRANSLATIONS: Record<string, {
  nameEn: string;
  descEn: string;
  tagsEn: string[];
  unitEn: string;
}> = {
  'pho-bo-tai-lan': {
    nameEn: 'Hanoi Wok-Seared Rare Beef Phở',
    descEn: '#1 Bestseller! Tender sliced beef flash-seared over blazing flame with crushed garlic and fresh scallions. 18-hour marrow broth blended with aromatic scallion oil for a deeply savory, fragrant finish.',
    tagsEn: ['#1 Bestseller', 'Wok-Seared Beef', 'Teacher Han Recipe'],
    unitEn: 'Bowl',
  },
  'pho-bo-dac-biet': {
    nameEn: 'Special Combination Beef Phở with Poached Egg',
    descEn: 'A lavish bowl filled with tender rare beef, well-done brisket, crunchy flank, chewy tendon, bouncy beef meatballs, and a farm-fresh egg gently poached in simmering broth.',
    tagsEn: ['#2 Bestseller', 'Special Combo', 'Hearty & Rich'],
    unitEn: 'Bowl',
  },
  'pho-ga-ta-dui-chat': {
    nameEn: 'Free-Range Chicken Thigh Phở',
    descEn: 'Carefully selected free-range chicken, cooked to perfection with crispy golden skin, succulent meat, and finely shredded fragrant lime leaves in a crystal-clear broth.',
    tagsEn: ['#3 Bestseller', 'Free-Range Chicken', 'Crispy Skin'],
    unitEn: 'Bowl',
  },
  'pho-bo-tai': {
    nameEn: 'Fresh Rare Beef Phở',
    descEn: 'Paper-thin tender slices of fresh beef spread across soft rice noodles, scalded with boiling bone broth until blooming with delicate pink tenderness and natural sweetness.',
    tagsEn: ['Beef Phở', 'Naturally Sweet', 'Tender Beef'],
    unitEn: 'Bowl',
  },
  'pho-bo-chin': {
    nameEn: 'Well-Done Beef Brisket Phở',
    descEn: 'Prime beef brisket slow-boiled with roasted ginger and star anise, thinly carved into aromatic slices with a hint of marbled fat that melts without grease.',
    tagsEn: ['Beef Phở', 'Tender Brisket', 'Traditional'],
    unitEn: 'Bowl',
  },
  'pho-bo-tai-nam': {
    nameEn: 'Rare & Well-Done Brisket Beef Phở',
    descEn: 'The quintessential balance between melt-in-mouth rare beef and the fragrant, subtly crunchy well-done beef flank.',
    tagsEn: ['Beef Phở', 'Rich Flavor'],
    unitEn: 'Bowl',
  },
  'pho-bo-tai-gau': {
    nameEn: 'Crispy Beef Flank & Rare Beef Phở',
    descEn: 'Crisp and marbled beef flank flap combined with fresh rare beef. A revered choice for true Hanoi phở connoisseurs.',
    tagsEn: ['Beef Phở', 'Crispy Flank', 'Connoisseur Pick'],
    unitEn: 'Bowl',
  },
  'pho-bo-tai-gan': {
    nameEn: 'Soft Tendon & Rare Beef Phở',
    descEn: 'Translucent beef tendon simmered to velvety, gelatinous perfection, rich in collagen, paired with tender rare beef.',
    tagsEn: ['Beef Phở', 'Tender Tendon', 'Nourishing'],
    unitEn: 'Bowl',
  },
  'pho-bo-sot-vang': {
    nameEn: 'Rich Red Wine Stewed Beef Phở',
    descEn: 'Beef shank braised in red wine, black cardamom, cinnamon, star anise, and vine-ripened tomatoes until deeply savory and ruby-red. Perfect for brisk days.',
    tagsEn: ['Wine-Stewed Beef', 'Aromatic Spices', 'Rich Broth'],
    unitEn: 'Bowl',
  },
  'pho-ga-xe-phay': {
    nameEn: 'Shredded Free-Range Chicken Phở',
    descEn: 'Hand-shredded tender chicken breast and thigh garnished with fragrant kaffir lime ribbons in a crystal-clear, light, soothing broth.',
    tagsEn: ['Chicken Phở', 'Light & Fresh', 'Kaffir Lime'],
    unitEn: 'Bowl',
  },
  'pho-ga-tron-dac-biet': {
    nameEn: 'Traditional Mixed Chicken Phở (Dry Phở)',
    descEn: 'Warm rice noodles tossed with house savory soy dressing, shredded free-range chicken, golden crispy fried shallots, crushed peanuts, and a side bowl of rich broth.',
    tagsEn: ['Dry Mixed Phở', 'Flavorful', 'House Recipe'],
    unitEn: 'Bowl',
  },
  'pho-cuon-bo': {
    nameEn: 'Hanoi Beef Fresh Phở Rolls (10 pcs)',
    descEn: 'Silky rice noodle sheets rolled with flash-sautéed garlic beef, crisp green lettuce, and aromatic herbs. Served with traditional sweet-tangy dipping sauce with crunchy papaya.',
    tagsEn: ['Phở Rolls', 'Fresh & Light', 'Appetizer'],
    unitEn: 'Plate',
  },
  'pho-bo-xao-mem': {
    nameEn: 'Soft Stir-Fried Beef Phở with Greens',
    descEn: 'Soft rice noodles wok-tossed in savory beef reduction, tender sliced beef, fresh bok choy greens, onions, and ripe tomatoes.',
    tagsEn: ['Stir-Fried Soft Phở', 'Piping Hot'],
    unitEn: 'Plate',
  },
  'pho-bo-xao-gion': {
    nameEn: 'Crispy Skillet-Seared Beef Phở',
    descEn: 'Rice noodles seared into a golden crispy cake with a tender chewy center, drenched in a sizzling wok sauce of tender beef and seasonal greens.',
    tagsEn: ['Crispy Stir-Fried Phở', 'Golden Crunchy'],
    unitEn: 'Plate',
  },
  'quay-gion-pho': {
    nameEn: 'Crispy Fried Crullers (5 pcs)',
    descEn: 'Golden crispy Vietnamese crullers, non-greasy and perfectly hollowed to dip into piping hot bone broth.',
    tagsEn: ['Side Dish', 'Extra Crispy'],
    unitEn: 'Plate',
  },
  'trung-ga-ta-tran': {
    nameEn: 'Poached Farm Egg in Hot Phở Broth',
    descEn: 'Farm-fresh chicken egg delicately poached in bubbling phở broth with a velvety molten yolk.',
    tagsEn: ['Side Dish', 'Nutritious'],
    unitEn: 'Piece',
  },
  'tra-da-hoa-nhai': {
    nameEn: 'Hanoi Jasmine Iced Green Tea',
    descEn: 'Rustic green tea naturally scented with fresh jasmine blossoms, the iconic refreshing companion to hot phở.',
    tagsEn: ['Beverage', 'Cooling & Light'],
    unitEn: 'Glass',
  },
  'nuoc-chanh-tuoi-duong-phen': {
    nameEn: 'Fresh Lime Juice with Rock Sugar',
    descEn: 'Freshly squeezed lime juice balanced with mild rock sugar syrup over crushed ice.',
    tagsEn: ['Beverage', 'Refreshing'],
    unitEn: 'Glass',
  },
  'sua-dau-nanh-la-dua': {
    nameEn: 'Homemade Pandan Soy Milk',
    descEn: 'Freshly ground organic soybeans gently simmered with aromatic pandan leaves every morning.',
    tagsEn: ['Beverage', 'Homemade'],
    unitEn: 'Bottle',
  },
};

// Localized mapping for Categories
const CATEGORY_TRANSLATIONS: Record<string, { nameEn: string; descEn: string }> = {
  'pho-bo': {
    nameEn: 'Traditional Beef Phở',
    descEn: '18-hour beef bone broth, naturally sweet and rich in authentic Hanoi heritage',
  },
  'pho-ga': {
    nameEn: 'Free-Range Chicken Phở',
    descEn: 'Crisp golden skin, tender succulent chicken in clear kaffir lime scented broth',
  },
  'pho-cuon-xao': {
    nameEn: 'Phở Rolls & Stir-Fried Phở',
    descEn: 'Refreshing fresh rolls and wok-seared phở with blazing wok hei aroma',
  },
  'an-kem-do-uong': {
    nameEn: 'Sides & Refreshing Drinks',
    descEn: 'Crisp crullers, poached eggs, and jasmine iced tea',
  },
};

// Localized mapping for Blog Posts
const BLOG_TRANSLATIONS: Record<string, {
  titleEn: string;
  categoryEn: string;
  excerptEn: string;
  contentEn: string;
}> = {
  'chuyen-co-giao-xay-dung-mo-quan-pho': {
    titleEn: 'From the Lecture Halls of Civil Engineering University to Teacher Han’s 18-Hour Phở Pot',
    categoryEn: 'Phở Story',
    excerptEn: 'After more than 30 years of dedicated teaching at Hanoi University of Civil Engineering, Teacher Ngoc Han pursued her lifelong passion: crafting traditional phở with the exactitude and heart of an educator.',
    contentEn: `For over three decades at the Hanoi University of Civil Engineering, Teacher Ngoc Han guided generations of young engineers and architects with white chalk and blue blueprints.\n\nThroughout those years, she nurtured a humble dream: upon retirement, she would open a warm, traditional phở shop where former students and lovers of Hanoi flavors could gather around steaming bowls of fragrant phở.\n\nApplying the rigorous standards and precision of an engineer, Teacher Han simmers fresh beef marrow bones continuously for 18 hours without artificial MSG, creating a crystal-clear, deeply sweet broth infused with roasted ginger, star anise, black cardamom, and cinnamon.`,
  },
  'bi-quyet-nau-nuoc-dung-pho-ngon': {
    titleEn: 'Secrets to 18-Hour Beef Bone Simmering for Crystal-Clear, Deeply Sweet Broth',
    categoryEn: 'Cooking Secrets',
    excerptEn: 'Why is Phở Ngọc Hân broth crystal-clear yet possesses a lasting natural sweetness? Discover the bone selection and flame control process.',
    contentEn: `To create an unforgettable pot of phở, marrow bones must be completely fresh, soaked in salt water, and meticulously blanched before slow simmering. The heat must remain at a gentle, rolling simmer to prevent cloudiness.\n\nThe intoxicating aroma arises from the delicate harmony of lightly charred native ginger, grilled shallots, crushed black cardamom, golden toasted star anise, and premium cinnamon bark.`,
  },
  'uu-dai-sinh-vien-dhxd': {
    titleEn: 'Appreciation Program: 10% Discount for Civil Engineering & Nearby University Students',
    categoryEn: 'Special Deals',
    excerptEn: 'Teacher Han warmly offers special discounts and complimentary crispy crullers to students and alumni of NUCE, HUST, and NEU.',
    contentEn: `Simply present your student ID or mention you are a student of Hanoi University of Civil Engineering or nearby universities, and Phở Ngọc Hân will immediately apply a 10% discount to your entire bill plus complimentary golden crispy crullers!`,
  },
};

// Localized mapping for Store Branches
const STORE_TRANSLATIONS: Record<string, {
  nameEn: string;
  addressEn: string;
  hoursEn: string;
}> = {
  'co-so-giai-phong': {
    nameEn: 'Phở Ngọc Hân - Main Branch (Next to NUCE)',
    addressEn: '55 Giai Phong Street, Dong Tam Ward, Hai Ba Trung District, Hanoi (50m from NUCE gate)',
    hoursEn: '06:00 - 22:30 (Open daily)',
  },
  'co-so-tran-dai-nghia': {
    nameEn: 'Phở Ngọc Hân - Tran Dai Nghia',
    addressEn: '116 Tran Dai Nghia Street, Bach Khoa Ward, Hai Ba Trung District, Hanoi',
    hoursEn: '06:00 - 22:30',
  },
  'co-so-thai-ha': {
    nameEn: 'Phở Ngọc Hân - Dong Da',
    addressEn: '42 Thai Ha Street, Trung Liet Ward, Dong Da District, Hanoi',
    hoursEn: '06:00 - 22:00',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pho_lang');
      if (saved === 'vi' || saved === 'en') return saved;
    } catch {}
    return 'vi';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('pho_lang', newLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string, defaultVi?: string): string => {
    const entry = UI_TRANSLATIONS[key];
    if (entry) {
      return lang === 'en' ? entry.en : entry.vi;
    }
    return defaultVi || key;
  };

  const getDishName = (dish: Dish): string => {
    if (lang === 'en' && DISH_TRANSLATIONS[dish.id]?.nameEn) {
      return DISH_TRANSLATIONS[dish.id].nameEn;
    }
    return dish.name;
  };

  const getDishDesc = (dish: Dish): string => {
    if (lang === 'en' && DISH_TRANSLATIONS[dish.id]?.descEn) {
      return DISH_TRANSLATIONS[dish.id].descEn;
    }
    return dish.description || '';
  };

  const getDishUnit = (dish: Dish): string => {
    if (lang === 'en' && DISH_TRANSLATIONS[dish.id]?.unitEn) {
      return DISH_TRANSLATIONS[dish.id].unitEn;
    }
    return dish.unit || (lang === 'en' ? 'Portion' : 'Phần');
  };

  const getDishTags = (dish: Dish): string[] => {
    if (lang === 'en' && DISH_TRANSLATIONS[dish.id]?.tagsEn) {
      return DISH_TRANSLATIONS[dish.id].tagsEn;
    }
    return dish.tags || [];
  };

  const getCategoryName = (cat: Category): string => {
    if (lang === 'en' && CATEGORY_TRANSLATIONS[cat.id]?.nameEn) {
      return CATEGORY_TRANSLATIONS[cat.id].nameEn;
    }
    return cat.name;
  };

  const getCategoryDesc = (cat: Category): string => {
    if (lang === 'en' && CATEGORY_TRANSLATIONS[cat.id]?.descEn) {
      return CATEGORY_TRANSLATIONS[cat.id].descEn;
    }
    return cat.description || '';
  };

  const getBlogTitle = (post: BlogPost): string => {
    if (lang === 'en' && BLOG_TRANSLATIONS[post.id]?.titleEn) {
      return BLOG_TRANSLATIONS[post.id].titleEn;
    }
    return post.title;
  };

  const getBlogExcerpt = (post: BlogPost): string => {
    if (lang === 'en' && BLOG_TRANSLATIONS[post.id]?.excerptEn) {
      return BLOG_TRANSLATIONS[post.id].excerptEn;
    }
    return post.excerpt;
  };

  const getBlogContent = (post: BlogPost): string => {
    if (lang === 'en' && BLOG_TRANSLATIONS[post.id]?.contentEn) {
      return BLOG_TRANSLATIONS[post.id].contentEn;
    }
    return post.content || post.excerpt;
  };

  const getBlogCategory = (post: BlogPost): string => {
    if (lang === 'en' && BLOG_TRANSLATIONS[post.id]?.categoryEn) {
      return BLOG_TRANSLATIONS[post.id].categoryEn;
    }
    return post.category;
  };

  const getStoreName = (store: StoreBranch): string => {
    if (lang === 'en' && STORE_TRANSLATIONS[store.id]?.nameEn) {
      return STORE_TRANSLATIONS[store.id].nameEn;
    }
    return store.name;
  };

  const getStoreAddress = (store: StoreBranch): string => {
    if (lang === 'en' && STORE_TRANSLATIONS[store.id]?.addressEn) {
      return STORE_TRANSLATIONS[store.id].addressEn;
    }
    return store.address;
  };

  const getStoreHours = (store: StoreBranch): string => {
    if (lang === 'en' && STORE_TRANSLATIONS[store.id]?.hoursEn) {
      return STORE_TRANSLATIONS[store.id].hoursEn;
    }
    return store.hours || (lang === 'en' ? '06:00 - 22:30 (Daily)' : '06:00 - 22:30 (Mở cửa tất cả các ngày)');
  };

  const formatPrice = (price: number): string => {
    if (lang === 'en') {
      return new Intl.NumberFormat('en-US').format(price) + ' VND';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        getDishName,
        getDishDesc,
        getDishUnit,
        getDishTags,
        getCategoryName,
        getCategoryDesc,
        getBlogTitle,
        getBlogExcerpt,
        getBlogContent,
        getBlogCategory,
        getStoreName,
        getStoreAddress,
        getStoreHours,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
