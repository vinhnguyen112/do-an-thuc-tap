# Hướng Dẫn Cài Đặt Dự Án JobHub

## 📋 Yêu cầu hệ thống

- **Node.js**: v14 trở lên
- **SQL Server**: 2019 trở lên (Express/Developer/Standard)
- **Git**: Để clone dự án

---

## 🚀 Bước 1: Clone dự án từ GitHub

```bash
git clone https://github.com/your-repo/do-an-thuc-tap.git
cd do-an-thuc-tap
```

---

## 🗄️ Bước 2: Cài đặt SQL Server Database

### 2.1. Tạo Database

1. Mở **SQL Server Management Studio (SSMS)**
2. Kết nối với **Windows Authentication** (hoặc sa nếu đã có)
3. Tạo database mới:

```sql
CREATE DATABASE HotrovieclamSV;
GO
```

### 2.2. Tạo User để kết nối từ Node.js

Chạy script sau trong SSMS:

```bash
cd backend/database
```

Mở file `create_user_simple.sql` trong SSMS và chạy toàn bộ script.

**Hoặc** copy và chạy trực tiếp:

```sql
USE master;
GO

-- Tạo login mới
CREATE LOGIN nodejs_user
WITH PASSWORD = '123456',
     DEFAULT_DATABASE = HotrovieclamSV,
     CHECK_EXPIRATION = OFF,
     CHECK_POLICY = OFF;
GO

-- Cấp quyền cho database
USE HotrovieclamSV;
GO

-- Tạo user trong database
CREATE USER nodejs_user FOR LOGIN nodejs_user;
GO

-- Cấp quyền db_owner (full quyền)
ALTER ROLE db_owner ADD MEMBER nodejs_user;
GO

PRINT 'Hoàn tất! User nodejs_user đã được tạo với password 123456';
GO
```

### 2.3. Thông tin kết nối Database

| Thông tin | Giá trị |
|-----------|---------|
| **Username** | `nodejs_user` |
| **Password** | `123456` |
| **Server** | `TênMáyTính` (xem bước 3) |
| **Database** | `HotrovieclamSV` |

---

## ⚙️ Bước 3: Cấu hình Backend

### 3.1. Cài đặt dependencies

```bash
cd backend
npm install
```

### 3.2. Tìm tên máy tính (Server name)

**Windows:**
```bash
hostname
```

Kết quả sẽ hiển thị tên máy tính của bạn, ví dụ: `DESKTOP-ABC123`

### 3.3. Tạo file .env

1. Copy file `.env.example` thành `.env`:

```bash
copy .env.example .env
```

2. Mở file `.env` và sửa các thông tin:

```env
# Database Configuration
DB_USER=nodejs_user
DB_PASSWORD=123456
DB_SERVER=DESKTOP-ABC123    # <-- Thay bằng tên máy tính của bạn
DB_NAME=HotrovieclamSV

# Server Configuration
PORT=5000
```

**⚠️ Lưu ý:** 
- Thay `DESKTOP-ABC123` bằng tên máy tính thực tế của bạn (chạy lệnh `hostname`)
- Nếu dùng **SQL Server Express**, server name thường là: `TênMáyTính\SQLEXPRESS`

### 3.4. Cập nhật file db.js (nếu cần)

Mở file `backend/db.js` và kiểm tra:

```javascript
const config = {
    user: "nodejs_user",        // ← Đảm bảo đúng user
    password: "123456",          // ← Đảm bảo đúng password
    server: "DESKTOP-ABC123",    // ← Thay bằng tên máy của bạn
    database: "HotrovieclamSV",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
```

---

## 🎯 Bước 4: Chạy ứng dụng

### 4.1. Chạy Backend

```bash
cd backend
npm start
```

Kết quả mong đợi:
```
✔ Đã kết nối SQL Server thành công!
Server đang chạy trên port 5000
```

### 4.2. Chạy Frontend

Mở trình duyệt và truy cập:

```
http://localhost:5173
```

Hoặc mở trực tiếp file HTML:

```
frontend-only/page/index.html
```

---

## 🔐 Thông Tin Đăng Nhập

### Database Credentials

| Loại | Username | Password | Ghi chú |
|------|----------|----------|---------|
| **SQL Server Admin** | `sa` | `123456` | Chỉ dùng để tạo database |
| **Node.js App User** | `nodejs_user` | `123456` | Dùng trong ứng dụng |

### Demo User Accounts

**Sinh viên:**
- Email: `student@gmail.com`
- Password: (bất kỳ)

**Nhà tuyển dụng:**
- Email: `employer@company.com` 
- Password: (bất kỳ)

> **Lưu ý:** Hiện tại đang ở chế độ DEMO, chưa kết nối backend thực sự. Login sẽ redirect dựa trên email:
> - Email chứa `employer/company/recruiter/hr` → Trang nhà tuyển dụng
> - Còn lại → Trang sinh viên

---

## � Xử lý lỗi thường gặp

### Lỗi: "Login failed for user 'nodejs_user'"

**Nguyên nhân:** User chưa được tạo hoặc password sai

**Giải pháp:**
1. Chạy lại script `create_user_simple.sql` trong SSMS
2. Kiểm tra file `.env` hoặc `db.js` có đúng password không

### Lỗi: "Cannot connect to server"

**Nguyên nhân:** Tên server sai hoặc SQL Server chưa bật

**Giải pháp:**
1. Kiểm tra SQL Server đang chạy: 
   - Mở **SQL Server Configuration Manager**
   - Đảm bảo **SQL Server** service đang **Running**
2. Kiểm tra lại tên server bằng lệnh `hostname`
3. Nếu dùng SQL Express, thêm `\SQLEXPRESS` vào tên server

### Lỗi: "Database 'HotrovieclamSV' does not exist"

**Giải pháp:**
```sql
CREATE DATABASE HotrovieclamSV;
GO
```

### Lỗi: Port 5000 đã được sử dụng

**Giải pháp:**
1. Sửa file `.env`:
```env
PORT=5001
```

2. Hoặc tắt ứng dụng đang dùng port 5000

---

## � Cấu trúc thư mục

```
do-an-thuc-tap/
├── backend/
│   ├── database/
│   │   ├── create_user_simple.sql  ← Script tạo user
│   │   └── ...
│   ├── .env.example                ← Template cấu hình
│   ├── .env                        ← Cấu hình thực tế (tạo thủ công)
│   ├── db.js                       ← Kết nối database
│   ├── server.js                   ← Server chính
│   └── package.json
├── frontend-only/
│   ├── page/
│   │   ├── index.html              ← Trang chủ
│   │   ├── login.html              ← Đăng nhập
│   │   └── ...
│   ├── student/
│   │   ├── student-home.html       ← Trang chủ sinh viên
│   │   └── ...
│   └── employer/
│       ├── employer-home.html      ← Trang chủ nhà tuyển dụng
│       └── ...
└── README.md                       ← File này
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. ✅ SQL Server đang chạy
2. ✅ Database `HotrovieclamSV` đã được tạo
3. ✅ User `nodejs_user` đã được tạo với quyền đầy đủ
4. ✅ File `.env` có đúng thông tin
5. ✅ Tên server trong `.env` đúng với máy tính của bạn

**Contact:**
- Email: support@jobhub.vn
- GitHub Issues: [Link to your repo]

---

## 🎓 Quick Start (TL;DR)

```bash
# 1. Clone project
git clone https://github.com/your-repo/do-an-thuc-tap.git
cd do-an-thuc-tap

# 2. Cài backend
cd backend
npm install
copy .env.example .env
# Sửa .env với DB_SERVER = tên máy của bạn (hostname)

# 3. Tạo database trong SSMS
CREATE DATABASE HotrovieclamSV;

# 4. Chạy script tạo user (trong SSMS)
# File: backend/database/create_user_simple.sql

# 5. Start backend
npm start

# 6. Mở frontend
# frontend-only/page/index.html
```

**Username:** `nodejs_user`  
**Password:** `123456`  
**Database:** `HotrovieclamSV`

Xong! 🎉
