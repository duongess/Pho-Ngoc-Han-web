import { Dish, Category, BlogPost, StoreBranch } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'pho-bo',
    name: 'Phở Bò Truyền Thống',
    iconName: 'Soup',
    description: 'Nước dùng ninh xương ống bò 18 tiếng ngọt thanh đậm đà chuẩn vị',
    dishCount: 8,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pho-ga',
    name: 'Phở Gà Ta Thả Vườn',
    iconName: 'Utensils',
    description: 'Gà ta da vàng giòn ngọt thịt, nước dùng thanh trong thơm lá chanh',
    dishCount: 3,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pho-cuon-xao',
    name: 'Phở Cuốn & Phở Xào',
    iconName: 'Flame',
    description: 'Phở cuốn tươi mát, phở xào bò thơm lừng lửa chảo',
    dishCount: 3,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'an-kem-do-uong',
    name: 'Món Ăn Kèm & Đồ Uống',
    iconName: 'Coffee',
    description: 'Quẩy giòn tan, trứng trần lòng đào, trà đá hoa nhài giải nhiệt',
    dishCount: 5,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
  },
];

export const DISHES: Dish[] = [
  // --- TOP 3 BEST SELLERS ---
  {
    id: 'pho-bo-tai-lan',
    name: 'Phở Bò Tái Lăn Hà Nội',
    price: 75000,
    originalPrice: 85000,
    category: 'pho-bo',
    isFeatured: true,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z2343703734202511313b61907e2f570369ba5f32ead04-6355.jpg',
    description: 'Món Best Seller số 1 tại quán! Thịt bò thăn tươi thái mỏng xào lăn nhanh tay trên lửa lớn cùng tỏi đập dập và hành hoa thơm nức mũi. Nước dùng ninh xương bò 18 tiếng hòa quyện lớp mỡ hành béo ngậy, ngọt thanh sâu thẳm.',
    tags: ['Best Seller #1', 'Bò Tái Lăn', 'Công Thức Cô Hân'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-dac-biet',
    name: 'Phở Bò Đặc Biệt Thập Cẩm',
    price: 95000,
    originalPrice: 110000,
    category: 'pho-bo',
    isFeatured: true,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/anh-chup-man-hinh-2023-07-11-luc-124746-8268.png',
    description: 'Bát phở đầy ắp đượm tình: bò tái mềm ngọt, nạm chín thơm bùi, gầu hoa giòn sần sật, gân bò dẻo quánh, bò viên dai giòn và một quả trứng gà ta trần nước phở béo ngậy.',
    tags: ['Best Seller #2', 'Đặc Biệt', 'Đầy Đặn No Nê'],
    unit: 'Bát',
  },
  {
    id: 'pho-ga-ta-dui-chat',
    name: 'Phở Gà Ta Đùi Chặt',
    price: 85000,
    originalPrice: 95000,
    category: 'pho-ga',
    isFeatured: true,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z45056226691455b2d1e3ea75fce3d68c4f54745ab1363-1075.jpg',
    description: 'Gà ta thả đồi chọn lọc kỹ lưỡng, luộc chuẩn lửa cho lớp da vàng óng giòn sần sật, thịt đùi chắc ngọt thơm mùi lá chanh non thái chỉ. Nước dùng gà ninh kèm xương hầm trong veo thanh dịu.',
    tags: ['Best Seller #3', 'Gà Ta Đồi', 'Da Giòn Thịt Ngọt'],
    unit: 'Bát',
  },

  // --- CÁC MÓN PHỞ BÒ TRUYỀN THỐNG ---
  {
    id: 'pho-bo-tai',
    name: 'Phở Bò Tái Tươi',
    price: 65000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/photostuan096912740314-8557.jpg',
    description: 'Thịt bò tươi mềm thái mỏng trải đều trên mặt bánh phở, chan nước dùng sôi sùng sục làm thịt chín tái hồng hào, giữ nguyên vẹn vị ngọt đậm đà tự nhiên.',
    tags: ['Phở Bò', 'Thanh Ngọt', 'Thịt Mềm'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-chin',
    name: 'Phở Bò Chín Nạm',
    price: 65000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/z23437012152839390f55b1d1f6b82b6d41b04993146ed-6173.jpg',
    description: 'Thịt nạm bò ta luộc kỹ cùng gừng nướng và hồi quế, thái lát mỏng có vân mỡ mỏng mềm thơm, béo bùi mà không hề ngấy.',
    tags: ['Phở Bò', 'Nạc Mềm', 'Truyền Thống'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-tai-nam',
    name: 'Phở Bò Tái Nạm',
    price: 70000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/anh-chup-man-hinh-2023-07-11-luc-125205-7683.png',
    description: 'Sự kết hợp hoàn hảo giữa độ ngọt mềm tan của thịt bò tái và vị béo bùi giòn dai nhẹ của nạm bò chín tới.',
    tags: ['Phở Bò', 'Đậm Vị'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-tai-gau',
    name: 'Phở Bò Tái Gầu Giòn',
    price: 75000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/7576177883f27dac24e3-4822.jpg',
    description: 'Gầu bò hoa giòn sần sật, béo ngậy thơm lừng ăn kèm bò tái tươi. Món phở quen thuộc của những người sành ăn phở đất Hà Thành.',
    tags: ['Phở Bò', 'Gầu Giòn', 'Sành Ăn'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-tai-gan',
    name: 'Phở Bò Tái Gân Dẻo',
    price: 75000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/photostuan09691274035-5938.jpg',
    description: 'Gân bò trong veo được hầm kỹ đạt độ dẻo mềm sần sật, giàu collagen, hòa quyện với thịt bò tái ngọt mềm.',
    tags: ['Phở Bò', 'Gân Dẻo', 'Bổ Dưỡng'],
    unit: 'Bát',
  },
  {
    id: 'pho-bo-sot-vang',
    name: 'Phở Bò Sốt Vang Đậm Đà',
    price: 75000,
    category: 'pho-bo',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/anh-chup-man-hinh-2023-07-11-luc-125004-6389.png',
    description: 'Nạm gân bò ninh nhừ cùng rượu vang đỏ, thảo quả, quế hồi và cà chua thơm sánh đỏ au, hương thơm nồng nàn quyến rũ ấm lòng ngày trở gió.',
    tags: ['Phở Sốt Vang', 'Thơm Nồng', 'Nước Sốt Đậm'],
    unit: 'Bát',
  },

  // --- CÁC MÓN PHỞ GÀ ---
  {
    id: 'pho-ga-xe-phay',
    name: 'Phở Gà Ta Xé Phay',
    price: 65000,
    category: 'pho-ga',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/cc51f6cd70478e19d756-3011.jpg',
    description: 'Thịt ức và đùi gà ta xé sợi tơi mềm, rắc lá chanh bánh tẻ thái chỉ thơm lừng, nước phở ngọt thanh nhẹ nhàng dễ chịu.',
    tags: ['Phở Gà', 'Thanh Nhẹ', 'Lá Chanh'],
    unit: 'Bát',
  },
  {
    id: 'pho-ga-tron-dac-biet',
    name: 'Phở Gà Trộn Gia Truyền Cô Hân',
    price: 75000,
    category: 'pho-ga',
    isFeatured: false,
    image: 'https://pho10lyquocsu.com.vn/watermark/product/540x540x1/upload/product/61d62a5a9fd0618e38c1-1006.jpg',
    description: 'Bánh phở trần mềm trộn nước sốt xì dầu gia truyền, thịt gà ta xé, hành phi tự phi vàng rộm giòn tan, lạc rang thơm bùi và đĩa nước dùng nhỏ ăn kèm.',
    tags: ['Phở Trộn', 'Đậm Đà', 'Gia Truyền'],
    unit: 'Bát',
  },

  // --- PHỞ CUỐN & PHỞ XÀO ---
  {
    id: 'pho-cuon-bo',
    name: 'Phở Cuốn Bò Truyền Thống (Đĩa 10 chiếc)',
    price: 85000,
    category: 'pho-cuon-xao',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    description: 'Lá bánh phở mỏng dẻo dai cuốn bên trong thịt bò xào lăn tỏi thơm nức, xà lách tươi, rau mùi và húng láng. Chấm cùng bát nước mắm chua ngọt đu đủ giòn.',
    tags: ['Phở Cuốn', 'Tươi Mát', 'Món Ăn Chơi'],
    unit: 'Đĩa',
  },
  {
    id: 'pho-bo-xao-mem',
    name: 'Phở Bò Xào Mềm Cải Ngọt',
    price: 80000,
    category: 'pho-cuon-xao',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    description: 'Bánh phở xào chín mềm thấm đượm nước sốt thịt bò, thịt bò mềm ngọt xào cùng rau cải ngọt xanh mướt, hành tây và cà chua.',
    tags: ['Phở Xào Mềm', 'Nóng Hổi'],
    unit: 'Đĩa',
  },
  {
    id: 'pho-bo-xao-gion',
    name: 'Phở Bò Xào Giòn Cháy Cạnh',
    price: 85000,
    category: 'pho-cuon-xao',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Bánh phở được ép chiên vàng ruộm giòn tan bên ngoài nhưng mềm dẻo bên trong, rưới đĩa thịt bò xào rau cải sền sệt bốc khói nghi ngút.',
    tags: ['Phở Xào Giòn', 'Giòn Rụm'],
    unit: 'Đĩa',
  },

  // --- MÓN ĂN KÈM & ĐỒ UỐNG ---
  {
    id: 'quay-gion-pho',
    name: 'Đĩa Quẩy Giòn (5 chiếc)',
    price: 15000,
    category: 'an-kem-do-uong',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Quẩy thắt vàng óng, giòn rụm không bị ngấm dầu, nhúng vào nước dùng phở ngấm trọn vị tủy xương béo ngọt thơm ngất ngây.',
    tags: ['Ăn Kèm', 'Giòn Tan'],
    unit: 'Đĩa',
  },
  {
    id: 'trung-ga-ta-tran',
    name: 'Trứng Gà Ta Trần Nước Phở',
    price: 10000,
    category: 'an-kem-do-uong',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80',
    description: 'Trứng gà ta thả vườn trần lòng đào trong nồi nước dùng phở đang sôi, lòng đỏ béo ngậy ngọt ngào tăng thêm dinh dưỡng.',
    tags: ['Ăn Kèm', 'Bổ Dưỡng'],
    unit: 'Quả',
  },
  {
    id: 'tra-da-hoa-nhai',
    name: 'Trà Đá Hoa Nhài Hà Nội',
    price: 5000,
    category: 'an-kem-do-uong',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    description: 'Trà xanh mộc ướp hoa nhài tự nhiên thơm mát, giải ngấy hoàn hảo sau bát phở bò nóng hổi.',
    tags: ['Đồ Uống', 'Thanh Mát'],
    unit: 'Cốc',
  },
  {
    id: 'nuoc-chanh-tuoi-duong-phen',
    name: 'Nước Chanh Tươi Đường Phèn',
    price: 20000,
    category: 'an-kem-do-uong',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    description: 'Chanh tươi vắt tay chua thanh kết hợp đường phèn ngọt dịu mát lạnh sảng khoái.',
    tags: ['Đồ Uống', 'Giải Nhiệt'],
    unit: 'Cốc',
  },
  {
    id: 'sua-dau-nanh-la-dua',
    name: 'Sữa Đậu Nành Lá Dứa Tự Nấu',
    price: 15000,
    category: 'an-kem-do-uong',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    description: 'Hạt đậu nành nguyên chất ngâm xay và nấu cùng lá dứa tươi mỗi sớm, sánh mịn thơm bùi.',
    tags: ['Đồ Uống', 'Nhà Nấu'],
    unit: 'Chai',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'chuyen-co-giao-xay-dung-mo-quan-pho',
    title: 'Từ Bục Giảng Đại Học Xây Dựng Đến Nồi Nước Phở 18 Tiếng Của Cô Ngọc Hân',
    date: '02/03/2026',
    category: 'Câu Chuyện Phở',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Sau hơn 30 năm tận tụy cống hiến tại Trường Đại học Xây Dựng (Hà Nội), Cô giáo Ngọc Hân quyết định thực hiện ước mơ tuổi trẻ: Mở quán phở truyền thống, chăm chút từng bát phở bằng sự tỉ mỉ của người thầy.',
    content: `Hơn 30 năm đứng trên bục giảng tại Trường Đại học Xây Dựng (Hà Nội), Cô giáo Ngọc Hân đã cùng phấn trắng và những đồ án kiến trúc dìu dắt biết bao thế hệ kỹ sư, kiến trúc sư trưởng thành. 

Năm tháng gắn bó với mái trường, cô luôn nuôi dưỡng một ước mơ bình dị: khi về hưu sẽ mở một quán phở nhỏ ấm cúng, nơi học trò cũ và những người yêu mến phong vị Hà thành có thể quây quần bên bát phở nghi ngút khói.

Từ tư duy chuẩn mực, khắt khe của một nhà giáo ngành Xây dựng, nồi nước dùng của cô Hân được ninh từ xương ống bò tươi suốt 18 tiếng liên tục, không mì chính hóa chất, chỉ có vị ngọt tự nhiên sâu thẳm từ tủy xương cùng hương thảo quả, quế, hồi và gừng nướng nức mũi.`
  },
  {
    id: 'bi-quyet-nau-nuoc-dung-pho-ngon',
    title: 'Bí Quyết Ninh Xương Bò 18 Tiếng Cho Nước Dùng Phở Trong Veo, Ngọt Thanh',
    date: '15/01/2026',
    category: 'Bí Quyết Nấu Phở',
    image: 'https://images.unsplash.com/photo-1503764654157-724d26fb0cb3?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Tại sao nước dùng Phở Ngọc Hân lại trong vắt mà vị ngọt lại đọng sâu ở cuống họng? Khám phá quy trình chọn xương và canh lửa gia truyền của Cô Hân.',
    content: `Muốn có nồi nước phở ngon, trước hết xương ống bò phải tươi, đem ngâm muối và chần nước sôi kỹ càng trước khi ninh. Lửa hầm phải liu riu không được sôi sùng sục làm đục nước.

Hương thơm của nồi phở là sự giao thoa tinh tế giữa gừng ta nướng xém vỏ, hành khô nướng, thảo quả đập dập, hoa hồi sao vàng và thanh quế chi thượng hạng.`
  },
  {
    id: 'uu-dai-sinh-vien-dhxd',
    title: 'Chương Trình Tri Ân: Giảm 10% Cho Sinh Viên & Cựu Sinh Viên Đại Học Xây Dựng',
    date: '20/12/2025',
    category: 'Ưu Đãi',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Cô Hân luôn dành sự yêu thương đặc biệt cho các thế hệ sinh viên ĐH Xây Dựng, ĐH Bách Khoa và ĐH Kinh Tế Quốc Dân khi ghé quán thưởng thức phở.',
    content: `Chỉ cần mang thẻ sinh viên hoặc nói là học trò của Đại học Xây Dựng, quán Phở Ngọc Hân giảm ngay 10% tổng hóa đơn và tặng kèm đĩa quẩy giòn thơm phức!`
  }
];

export const STORE_BRANCHES: StoreBranch[] = [
  {
    id: 'co-so-giai-phong',
    name: 'Phở Ngọc Hân - Cơ Sở Chính (Cổng ĐH Xây Dựng)',
    address: 'Số 55 Đường Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, Hà Nội (Cách cổng ĐH Xây Dựng 50m)',
    district: 'Hai Bà Trưng',
    hotline: '0988 567 899',
    email: 'phongochan.xaydung@gmail.com',
    hours: '06:00 - 22:30 (Mở cửa tất cả các ngày)',
    mapQuery: '55+Giải+Phóng+Hai+Bà+Trưng+Hà+Nội'
  },
  {
    id: 'co-so-tran-dai-nghia',
    name: 'Phở Ngọc Hân - Trần Đại Nghĩa',
    address: 'Số 116 Phố Trần Đại Nghĩa, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội',
    district: 'Hai Bà Trưng',
    hotline: '0988 567 900',
    email: 'phongochan.tdn@gmail.com',
    hours: '06:00 - 22:30',
    mapQuery: '116+Trần+Đại+Nghĩa+Hà+Nội'
  },
  {
    id: 'co-so-thai-ha',
    name: 'Phở Ngọc Hân - Đống Đa',
    address: 'Số 42 Phố Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội',
    district: 'Đống Đa',
    hotline: '0988 567 901',
    email: 'phongochan.thaiha@gmail.com',
    hours: '06:00 - 22:00',
    mapQuery: '42+Thái+Hà+Đống+Đa+Hà+Nội'
  }
];

export const VIDEOS = [
  {
    id: 'vlog-ba-nam',
    title: 'Bà Năm Vlog lên thành phố ăn thử Phở Cô Hân - Khen nức nở!',
    channel: 'Phở Ngọc Hân Official',
    views: '152K lượt xem',
    thumbnail: 'https://i.ytimg.com/vi/wTOAy5NlOWw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/wTOAy5NlOWw',
    duration: '01:00',
  },
  {
    id: 'quy-trinh-noi-pho-18h',
    title: 'Bí mật nồi nước dùng phở bò ninh 18 tiếng của cô giáo ĐH Xây Dựng về hưu',
    channel: 'Phở Ngọc Hân Official',
    views: '89K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    duration: '12:20',
  },
  {
    id: 'lam-pho-cuon-bo',
    title: 'Nghệ thuật xào bò và cuốn bánh phở tươi giòn ngọt chuẩn vị Hà Nội',
    channel: 'Phở Ngọc Hân Official',
    views: '64K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    duration: '06:15',
  },
  {
    id: 'khong-gian-quan-pho',
    title: 'Không gian ấm cúng quán Phở Ngọc Hân - Điểm hẹn sinh viên và cựu sinh viên ĐHXD',
    channel: 'Phở Ngọc Hân Official',
    views: '118K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1503764654157-724d26fb0cb3?auto=format&fit=crop&w=800&q=80',
    duration: '05:30',
  },
  {
    id: 'pho-ga-ta-doi',
    title: 'Thưởng thức bát Phở gà ta đùi chặt da vàng óng ngập lá chanh cùng cô Hân',
    channel: 'Phở Ngọc Hân Official',
    views: '97K lượt xem',
    thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    duration: '09:10',
  }
];
