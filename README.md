# 🚀 Hướng Dẫn Chạy Dự Án

Tài liệu này hướng dẫn cách cài đặt môi trường và khởi chạy dự án Next.js ở cả môi trường phát triển (Development) và môi trường thực tế (Production).

---

## 🛠️ Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
* **Node.js**: Phiên bản `18.17.0` trở lên (Khuyến nghị dùng bản LTS).
* **Package Manager**: Một trong các công cụ `npm`, `yarn`, `pnpm` hoặc `bun`.

---

## 📥 1. Cài Đặt Ban Đầu

**Bước 1:** Di chuyển vào thư mục dự án:
```bash
cd ten-thu-muc-du-an
```

**Bước 2:** Cài đặt các gói phụ thuộc (dependencies):
*Nếu dự án sử dụng công cụ nào, hãy chạy lệnh tương ứng của công cụ đó:*

```bash
# Nếu dùng npm
npm install

# Nếu dùng yarn
yarn install

# Nếu dùng pnpm
pnpm install

# Nếu dùng bun
bun install
```

**Bước 3 (Tùy chọn):** Tạo file môi trường cấu hình:
Nếu dự án có file `.env.example`, hãy copy và đổi tên thành `.env.local`, sau đó điền các biến môi trường cần thiết vào:
```bash
cp .env.example .env.local
```

---

## 💻 2. Chạy Trong Môi Trường Phát Triển (Development)

Lệnh này giúp bật server local hỗ trợ tính năng **Hot Reload** (Tự động cập nhật giao diện ngay khi bạn lưu file chỉnh sửa mã nguồn).

```bash
npm run dev
# hoặc yarn dev / pnpm dev / bun dev
```

Sau khi chạy lệnh thành công, hãy mở trình duyệt và truy cập vào đường dẫn:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📦 3. Biên Dịch Và Chạy Trên Môi Trường Thực Tế (Production)

Để dự án chạy mượt mà, tối ưu tốc độ và bảo mật cho người dùng cuối, bạn cần build dự án trước khi chạy.

**Bước 1: Biên dịch dự án (Build)**
```bash
npm run build
# hoặc yarn build / pnpm build / bun build
```
*Lệnh này sẽ tối ưu hóa mã nguồn và tạo ra thư mục ẩn `.next` chứa phiên bản production.*

**Bước 2: Khởi chạy Server Production**
```bash
npm run start
# hoặc yarn start / pnpm start / bun start
```
Hệ thống sẽ chạy ứng dụng tối ưu tại địa chỉ **`http://localhost:3000`**.

---

## 📋 Các Lệnh Thường Dùng Khác (Nếu có)

* `npm run lint`: Kiểm tra lỗi định dạng và cú pháp code (ESLint).
* `npm run format`: Tự động sửa định dạng code (Prettier).
