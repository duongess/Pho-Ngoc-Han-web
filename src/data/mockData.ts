import { Dish, Category, BlogPost, StoreBranch } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'trang-mieng',
    name: 'Món tráng miệng',
    iconName: 'IceCream',
    description: 'Các món chè Huế thanh tao, ngọt dịu trứ danh xứ Cố Đô',
    dishCount: 8,
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cung-dinh',
    name: 'Món cung đình',
    iconName: 'Crown',
    description: 'Ẩm thực cung đình Huế tinh tế, cầu kỳ dâng vua chúa',
    dishCount: 6,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bun-hue',
    name: 'Bún Huế',
    iconName: 'Soup',
    description: 'Bún bò Huế đậm đà thơm nồng ruốc sả đặc trưng',
    dishCount: 12,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'com-hue',
    name: 'Cơm Huế',
    iconName: 'Utensils',
    description: 'Cơm hến, cơm âm phủ, cơm niêu đượm hương vị miền Trung',
    dishCount: 9,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'chao-hue',
    name: 'Cháo Huế',
    iconName: 'Coffee',
    description: 'Cháo thơm ngậy, sánh mịn bổ dưỡng ấm lòng thực khách',
    dishCount: 5,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'banh-hue',
    name: 'Bánh Huế',
    iconName: 'Cookie',
    description: 'Bánh bèo chén, bánh nậm, bánh lọc mềm dai trong veo',
    dishCount: 7,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'lau-hue',
    name: 'Lẩu Huế',
    iconName: 'Flame',
    description: 'Nồi lẩu chua cay ấm cúng, đậm đà cho những buổi sum vầy',
    dishCount: 4,
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=400&q=80',
  },
];

export const DISHES: Dish[] = [
  {
    id: 'cha-luon-mo-chai',
    name: 'Chả lươn mỡ chài',
    price: 255000,
    category: 'cung-dinh',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Thịt lươn đồng băm nhuyễn hòa quyện mộc nhĩ, nấm hương gói trong lớp mỡ chài mỏng nướng vàng ruộm trên than hồng, ăn kèm rau sống và nước chấm chua ngọt.',
    tags: ['Món Cung Đình', 'Bán Chạy', 'Đặc Sản'],
  },
  {
    id: 'hen-xuc-banh-trang',
    name: 'Hến xúc bánh tráng',
    price: 88000,
    category: 'cung-dinh',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Hến Cồn Hến tươi xào thơm nức cùng rau răm, hành tây, ớt đỏ và đậu phộng rang giòn, xúc cùng bánh tráng mè nướng giòn rụm đậm vị xứ Huế.',
    tags: ['Đặc Sản Cồn Hến', 'Món Nhậu'],
  },
  {
    id: 'bun-bo-hue-dac-biet',
    name: 'Bún bò Huế đặc biệt',
    price: 96000,
    category: 'bun-hue',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    description: 'Tô bún đầy đặn với thịt bò bắp hoa, giò heo ninh mềm, chả cua Huế ngọt thanh, huyết mềm cùng nước dùng hầm xương ống 12 tiếng thoảng hương ruốc sả ớt bột cay cay.',
    tags: ['Best Seller', 'Hương Vị Cố Đô'],
  },
  {
    id: 'bun-cha-ca-thac-lac',
    name: 'Bún chả cá Thác lác',
    price: 82000,
    category: 'bun-hue',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    description: 'Chả cá thác lác quết dẻo tay chiên vàng óng, nước dùng thanh ngọt nấu từ cà chua, dứa và xương hầm, tạo nên hương vị nhẹ nhàng mà quyến rũ.',
    tags: ['Thanh Đạm', 'Món Ngon Mỗi Ngày'],
  },
  {
    id: 'bun-hen',
    name: 'Bún hến',
    price: 60000,
    category: 'bun-hue',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=600&q=80',
    description: 'Món ăn dân dã nức tiếng xứ kinh kỳ gồm bún sợi nhỏ, thịt hến xào, tóp mỡ chiên giòn, bắp chuối thái sợi, rau thơm, đậu phộng và nước hến luộc nóng hổi ăn kèm.',
    tags: ['Món Huế Chuẩn Vị', 'Ăn Là Ghiền'],
  },
  {
    id: 'com-hen-hue',
    name: 'Cơm hến Huế',
    price: 65000,
    category: 'com-hue',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    description: 'Cơm nguội tơi xốp quyện hòa cùng thịt hến xào cay thơm, bắp chuối, rau muống chẻ, ớt sa tế cay nồng và mắm ruốc chưng thơm lừng.',
    tags: ['Đặc Sản Cố Đô'],
  },
  {
    id: 'banh-beo-chen',
    name: 'Khay Bánh bèo chén (8 chén)',
    price: 65000,
    category: 'banh-hue',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    description: 'Bánh bèo đúc trong chén sứ nhỏ, bột dẻo mềm phủ nhân tôm chấy đỏ au, tóp mỡ giòn và hành phi, chan nước mắm ớt cay ngọt thanh.',
    tags: ['Bánh Cổ Truyền'],
  },
  {
    id: 'nem-lui-hue',
    name: 'Nem lụi nướng sả (Phần)',
    price: 110000,
    category: 'cung-dinh',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    description: 'Nem lụi quấn cọng sả nướng trên than hoa thơm nức mũi, cuốn cùng bánh tráng, khế chua, chuối chát và chấm nước lèo bùi ngậy từ gan và đậu tương.',
    tags: ['Món Nhậu', 'Gia Truyền'],
  },
  {
    id: 'che-suong-sa-hat-luu',
    name: 'Chè sương sa hạt lựu',
    price: 35000,
    category: 'trang-mieng',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    description: 'Hạt lựu củ năng giòn sần sật, sương sa thạch lá nếp thanh mát hòa cùng đậu xanh đánh nhuyễn mịn màng và nước cốt dừa béo ngậy.',
    tags: ['Tráng Miệng', 'Tặng Kèm Khi Mua Mang Về'],
  },
  {
    id: 'che-sen-long-nhan',
    name: 'Chè hạt sen long nhãn',
    price: 42000,
    category: 'trang-mieng',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80',
    description: 'Hạt sen hồ Tịnh Tâm bở thơm lồng trong cùi nhãn ngọt lịm, nước đường phèn thanh khiết ướp hoa bưởi thoang thoảng quý phái.',
    tags: ['Chè Cung Đình', 'Thanh Mát'],
  },
  {
    id: 'lau-bo-nhung-dam',
    name: 'Lẩu bò nhúng dấm Nét Huế',
    price: 385000,
    category: 'lau-hue',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80',
    description: 'Thịt bắp bò hoa tươi thái mỏng nhúng nước lẩu chua thanh dịu từ dấm bỗng và sả thơm, cuốn bánh tráng rau rừng chấm mắm nêm gia truyền.',
    tags: ['Lẩu Sum Họp', 'Tặng 2 Chè'],
  },
  {
    id: 'chao-ca-loc-hue',
    name: 'Cháo cá lóc rau đắng',
    price: 68000,
    category: 'chao-hue',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    description: 'Cá lóc đồng phi lê ướp nghệ tây xào chín tới, ninh cùng gạo rang thơm phức, ăn cùng rau đắng non giòn bùi bổ dưỡng.',
    tags: ['Món Bổ Dưỡng'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'lich-ban-hang-tet-2026',
    title: 'Lịch Bán Hàng Tết 2026',
    date: '16/02/2026',
    category: 'Thông Báo',
    image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&w=600&q=80',
    excerpt: 'CHÚC MỪNG NĂM MỚI - BÍNH NGỌ 2026! Giữa không khí rộn ràng của những ngày đầu năm, Nét Huế xin gửi lời tri ân sâu sắc và lời chúc An khang – Thịnh vượng – Vạn sự như ý đến Quý khách hàng.',
    content: `Cơ sở hoạt động xuyên Tết:
- AEON Mall Hà Đông
- AEON Mall Long Biên
- AEON Mall Xuân Thủy
- 198 Hàng Bông

Các chi nhánh còn lại mở cửa trở lại từ Mùng 5 Tết! Hân hạnh phục vụ Quý khách trong mùa Tết đoàn viên này.`
  },
  {
    id: 'mua-3-mon-mang-ve-tang-1-che',
    title: 'Mua 3 Món Mang Về Tặng 1 Chè Huế',
    date: '21/03/2023',
    category: 'Ưu Đãi',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Nét Huế vẫn đang áp dụng chương trình ưu đãi dành cho khách mua mang về ạ. Mua 3 món ăn, Tặng 1 Chè Huế. Mua Lẩu mang về cũng được thêm chè, "Xtra Ưu Đãi" - Lẩu nhỏ: thêm 1 chè. - Lẩu lớn : thêm 2 chè.',
    content: `Chương trình tri ân dành riêng cho quý khách hàng đặt món mang về:
- Cứ mỗi đơn đặt 3 món ăn chính bất kỳ: TẶNG NGAY 1 cốc chè Huế thơm ngon (Chè bắp, chè sương sa hạt lựu, chè đậu đỏ).
- Áp dụng lũy tiến không giới hạn số lượng!
- Lẩu nhỏ mang về: TẶNG 1 chè.
- Lẩu lớn mang về: TẶNG 2 chè.`
  },
  {
    id: 'phong-phu-khau-vi-rieng-cua-nguoi-hue',
    title: 'Phong Phú Khẩu Vị Riêng Của Người Huế',
    date: '17/05/2022',
    category: 'Văn Hóa Ẩm Thực',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Nét Văn Hóa Ẩm Thực Của Người Huế. Khám phá sự kết hợp tinh tế giữa ngũ vị âm dương trong từng bát bún, chén bánh và đĩa chả trứ danh.',
    content: `Huế không chỉ là đất của những đền đài lăng tẩm trầm mặc, mà còn là kinh đô ẩm thực của dải đất hình chữ S. Người Huế ăn bằng mắt, ăn bằng mũi rồi mới ăn bằng miệng. Mỗi món ăn là một tác phẩm nghệ thuật, hội tụ đủ thanh sắc và đậm đà nghĩa tình.`
  }
];

export const STORE_BRANCHES: StoreBranch[] = [
  {
    id: 'bac-tu-liem',
    name: 'Nét Huế - Bắc Từ Liêm',
    address: 'B1- 18- 19, Tầng B1- Trung tâm thương mại Vincom Plaza- Bắc Từ Liêm - Phạm Văn Đồng',
    district: 'Bắc Từ Liêm',
    hotline: '+84867534093',
    email: 'Nethue.com.vn',
    hours: '10:00 - 22:00',
    mapQuery: 'Vincom+Plaza+Bắc+Từ+Liêm'
  },
  {
    id: 'aeon-xuan-thuy',
    name: 'Nét Huế - Aeon Xuân Thủy - Cầu Giấy',
    address: '122-124 Xuân Thủy - Cầu Giấy - HN',
    district: 'Cầu Giấy',
    hotline: '02437631919',
    email: 'xuanthuy@nethue.com.vn',
    hours: '09:00 - 22:00',
    mapQuery: '122+Xuân+Thủy+Cầu+Giấy'
  },
  {
    id: 'nguyen-van-loc',
    name: 'Nét Huế Nguyễn Văn Lộc',
    address: '151 Phố Nguyễn Văn Lộc, Phường Mỗ Lao, Hà Đông, HN',
    district: 'Hà Đông',
    hotline: '0968296433',
    email: 'info@nethue.com.vn',
    hours: '10:00 - 22:00',
    mapQuery: '151+Nguyễn+Văn+Lộc+Hà+Đông'
  },
  {
    id: 'thai-ha',
    name: 'Nét Huế - Thái Hà',
    address: 'Tầng 4 số 34 - 36 Thái Hà, Quận Đống Đa, Hà Nội',
    district: 'Đống Đa',
    hotline: '02438572929',
    email: 'thaiha@nethue.com.vn',
    hours: '10:00 - 22:00',
    mapQuery: '34+Thái+Hà+Đống+Đa'
  },
  {
    id: 'hang-bong',
    name: 'Nét Huế - Hàng Bông',
    address: '198 Hàng Bông, Phường Hàng Bông, Hoàn Kiếm, Hà Nội',
    district: 'Hoàn Kiếm',
    hotline: '02439381795',
    email: 'hangbong@nethue.com.vn',
    hours: '08:30 - 22:30',
    mapQuery: '198+Hàng+Bông+Hoàn+Kiếm'
  },
  {
    id: 'times-city',
    name: 'Nét Huế - Vincom Times City',
    address: 'Tầng B1, TTTM Vincom Mega Mall Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội',
    district: 'Hai Bà Trưng',
    hotline: '02432007799',
    email: 'timescity@nethue.com.vn',
    hours: '10:00 - 22:00',
    mapQuery: 'Times+City+458+Minh+Khai'
  }
];

export const VIDEOS = [
  {
    id: 'vlog-ba-nam',
    title: 'Bà Năm Vlog lên thành phố - Chất quá bà ơi!',
    channel: 'Nét Huế Official',
    views: '152K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '08:45',
  },
  {
    id: 'bi-quyet-bun-bo',
    title: 'Bí quyết nấu Bún Bò Huế chuẩn vị cung đình từ bếp trưởng Nét Huế',
    channel: 'Nét Huế Official',
    views: '89K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    duration: '12:20',
  },
  {
    id: 'lam-banh-beo',
    title: 'Nghệ thuật đúc bánh bèo chén tôm chấy truyền thống',
    channel: 'Nét Huế Official',
    views: '64K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    duration: '06:15',
  },
  {
    id: 'khong-gian-co-do',
    title: 'Khám phá không gian ấm cúng đậm chất Cố Đô tại hệ thống Nét Huế',
    channel: 'Nét Huế Official',
    views: '118K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '05:30',
  },
  {
    id: 'mam-co-hue',
    title: 'Mâm cỗ tiệc Tết sum vầy và câu chuyện ẩm thực cung đình Huế',
    channel: 'Nét Huế Official',
    views: '97K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '09:10',
  }
];
