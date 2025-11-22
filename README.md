# Đồ Án Thực Tập - Hệ Thống Hỗ Trợ Việc Làm Sinh Viên

Dự án web hỗ trợ kết nối sinh viên với cơ hội việc làm từ các doanh nghiệp.

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: phiên bản 14.x trở lên
- **SQL Server**: 2019 trở lên (Express Edition cũng được)
- **Git**: để clone repository
- **Trình duyệt**: Chrome, Firefox, hoặc Edge (phiên bản mới nhất)

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Clone Repository

```bash
git clone https://github.com/vinhnguyen112/do-an-thuc-tap.git
cd do-an-thuc-tap
```

### Bước 2: Cài Đặt SQL Server

1. **Tải SQL Server Express** (nếu chưa có):
   - Truy cập: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - Tải phiên bản **SQL Server 2019 Express** hoặc mới hơn
   - Cài đặt với các tùy chọn mặc định

2. **Tải SQL Server Management Studio (SSMS)**:
   - Truy cập: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms
   - Cài đặt SSMS để quản lý database

### Bước 3: Thiết Lập Database

1. **Mở SQL Server Management Studio (SSMS)**

2. **Kết nối đến SQL Server**:
   - Server name: `localhost` hoặc tên máy tính của bạn
   - Authentication: **Windows Authentication** hoặc **SQL Server Authentication**

3. **Tạo Database**:
   ```sql
   CREATE DATABASE HotrovieclamSV;
   GO
   ```

4. **Tạo User cho Backend** (chạy script trong thư mục `backend/database/create_user.sql`):
   ```sql
   USE master;
   GO

   -- Tạo login
   CREATE LOGIN nodejs_user
   WITH PASSWORD = '123456',
        DEFAULT_DATABASE = HotrovieclamSV,
        CHECK_EXPIRATION = OFF,
        CHECK_POLICY = OFF;
   GO

   -- Chuyển sang database
   USE HotrovieclamSV;
   GO

   -- Tạo user và cấp quyền
   CREATE USER nodejs_user FOR LOGIN nodejs_user;
   ALTER ROLE db_owner ADD MEMBER nodejs_user;
   GO
   ```

5. **Tạo bảng CV** (chạy script trong `backend/database/create_cv_table.sql`):
   ```sql
   USE HotrovieclamSV;
   GO

   CREATE TABLE CVs (
       id INT PRIMARY KEY IDENTITY(1,1),
       fullName NVARCHAR(255) NOT NULL,
       email NVARCHAR(255) NOT NULL,
       phone NVARCHAR(50),
       address NVARCHAR(500),
       education NVARCHAR(MAX),
       experience NVARCHAR(MAX),
       skills NVARCHAR(MAX),
       createdAt DATETIME DEFAULT GETDATE()
   );
   GO
   ```

### Bước 4: Cấu Hình Backend

1. **Di chuyển vào thư mục backend**:
   ```bash
   cd backend
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Cấu hình kết nối database** trong file `backend/db.js`:
   
   Mở file `db.js` và cập nhật thông tin kết nối:
   ```javascript
   const config = {
       user: "sa",              // Hoặc "nodejs_user" nếu dùng user đã tạo
       password: "123456",      // Mật khẩu của bạn
       server: "TenMayTinh",    // Thay bằng tên máy tính của bạn
       database: "HotrovieclamSV",
       options: {
           encrypt: false,
           trustServerCertificate: true
       }
   };
   ```

   **Cách tìm tên máy tính**:
   - Windows: Mở Command Prompt và gõ `hostname`
   - Hoặc vào **This PC** → **Properties** → xem **Device name**

4. **Khởi động Backend Server**:
   ```bash
   npm start
   ```

   Nếu thành công, bạn sẽ thấy:
   ```
   Backend đang chạy tại http://localhost:5000
   ✔ Đã kết nối SQL Server thành công!
   ```

### Bước 5: Chạy Frontend

1. **Mở thư mục frontend**:
   ```bash
   cd ../frontend-only
   ```

2. **Chạy trang web**:
   - Mở file `page/index.html` bằng trình duyệt
   - Hoặc dùng Live Server extension trong VS Code

## 📁 Cấu Trúc Dự Án

```
do-an-thuc-tap/
├── backend/                 # Backend Node.js + Express
│   ├── controllers/        # Controllers xử lý logic
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── database/          # SQL scripts
│   ├── db.js             # Cấu hình database
│   ├── server.js         # Entry point
│   └── package.json
│
└── frontend-only/          # Frontend HTML/CSS/JS
    ├── page/              # Trang chính
    ├── student/           # Module sinh viên
    ├── employer/          # Module nhà tuyển dụng
    ├── admin/             # Module admin
    ├── shared/            # Components dùng chung
    └── css/               # Styles
```

## 🔧 Xử Lý Lỗi Thường Gặp

### Lỗi: "Login failed for user"
**Nguyên nhân**: Sai username/password hoặc user chưa được tạo

**Giải pháp**:
1. Kiểm tra lại username và password trong `db.js`
2. Chạy lại script `create_user.sql` trong SSMS
3. Hoặc dùng tài khoản `sa` với mật khẩu bạn đã đặt khi cài SQL Server

### Lỗi: "Cannot connect to server"
**Nguyên nhân**: Tên server không đúng hoặc SQL Server chưa chạy

**Giải pháp**:
1. Kiểm tra SQL Server đang chạy: Mở **SQL Server Configuration Manager**
2. Kiểm tra tên server: Trong SSMS, xem tên server khi kết nối
3. Thử dùng `localhost` hoặc `.` thay vì tên máy tính

### Lỗi: "Invalid object name 'CVs'"
**Nguyên nhân**: Bảng CVs chưa được tạo

**Giải pháp**:
Chạy script `create_cv_table.sql` trong SSMS

### Lỗi: "Port 5000 already in use"
**Nguyên nhân**: Port 5000 đang được sử dụng bởi ứng dụng khác

**Giải pháp**:
Đổi port trong `server.js`:
```javascript
const PORT = 5001; // Thay đổi sang port khác
```

## 📝 Scripts Database Có Sẵn

Trong thư mục `backend/database/`:

- `create_user.sql` - Tạo user nodejs_user
- `create_cv_table.sql` - Tạo bảng CVs
- `check_user.sql` - Kiểm tra user đã tồn tại chưa
- `check_cv_table.sql` - Kiểm tra bảng CV
- `reset_sa_password.sql` - Reset mật khẩu sa (nếu cần)

## 🌐 API Endpoints

### CV APIs
- `GET /api/cv` - Lấy danh sách tất cả CV
- `GET /api/cv/:id` - Lấy chi tiết 1 CV
- `POST /api/cv` - Tạo CV mới
- `PUT /api/cv/:id` - Cập nhật CV
- `DELETE /api/cv/:id` - Xóa CV
- `GET /api/cv/:id/pdf` - Tải CV dưới dạng PDF

## 👥 Các Module

### 1. Student (Sinh viên)
- Tìm kiếm việc làm
- Tạo và quản lý CV
- Ứng tuyển công việc
- Xem trạng thái ứng tuyển

### 2. Employer (Nhà tuyển dụng)
- Đăng tin tuyển dụng
- Quản lý tin đăng
- Xem danh sách ứng viên
- Quản lý hồ sơ công ty

### 3. Admin
- Quản lý người dùng
- Duyệt tin tuyển dụng
- Thống kê hệ thống

## 🔐 Thông Tin Đăng Nhập Mặc Định

**Database User**:
- Username: `nodejs_user`
- Password: `123456`

**SQL Server SA** (nếu dùng):
- Username: `sa`
- Password: (mật khẩu bạn đặt khi cài SQL Server)

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi cài đặt, vui lòng:
1. Kiểm tra lại từng bước trong hướng dẫn
2. Xem phần "Xử Lý Lỗi Thường Gặp"
3. Liên hệ: vinhnguyen112 (GitHub)

## 📄 License

Dự án này được phát triển cho mục đích học tập.

---

**Lưu ý**: Đây là dự án đồ án thực tập, không dùng cho môi trường production.
