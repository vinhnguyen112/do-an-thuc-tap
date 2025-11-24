-- ============================================
-- SCRIPT HOÀN CHỈNH: Bổ sung TẤT CẢ các trường còn thiếu
-- Chạy script này trong SQL Server Management Studio (SSMS)
-- ============================================

USE HotrovieclamSV;
GO

PRINT '========================================';
PRINT 'BẮT ĐẦU BỔ SUNG CÁC TRƯỜNG CÒN THIẾU';
PRINT '========================================';
GO

-- ============================================
-- BẢNG SinhVien
-- ============================================
PRINT '';
PRINT '>>> Đang cập nhật bảng SinhVien...';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'DiaChi')
BEGIN
    ALTER TABLE SinhVien ADD DiaChi nvarchar(255);
    PRINT '  ✓ Đã thêm cột DiaChi';
END
ELSE
    PRINT '  - Cột DiaChi đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'NgaySinh')
BEGIN
    ALTER TABLE SinhVien ADD NgaySinh date;
    PRINT '  ✓ Đã thêm cột NgaySinh';
END
ELSE
    PRINT '  - Cột NgaySinh đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'GioiTinh')
BEGIN
    ALTER TABLE SinhVien ADD GioiTinh nvarchar(10);
    PRINT '  ✓ Đã thêm cột GioiTinh';
END
ELSE
    PRINT '  - Cột GioiTinh đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'Truong')
BEGIN
    ALTER TABLE SinhVien ADD Truong nvarchar(255);
    PRINT '  ✓ Đã thêm cột Truong';
END
ELSE
    PRINT '  - Cột Truong đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'Nganh')
BEGIN
    ALTER TABLE SinhVien ADD Nganh nvarchar(255);
    PRINT '  ✓ Đã thêm cột Nganh';
END
ELSE
    PRINT '  - Cột Nganh đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'NamTotNghiep')
BEGIN
    ALTER TABLE SinhVien ADD NamTotNghiep int;
    PRINT '  ✓ Đã thêm cột NamTotNghiep';
END
ELSE
    PRINT '  - Cột NamTotNghiep đã tồn tại';

GO

-- ============================================
-- BẢNG NhaTuyenDung
-- ============================================
PRINT '';
PRINT '>>> Đang cập nhật bảng NhaTuyenDung...';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'TenVietTat')
BEGIN
    ALTER TABLE NhaTuyenDung ADD TenVietTat nvarchar(50);
    PRINT '  ✓ Đã thêm cột TenVietTat';
END
ELSE
    PRINT '  - Cột TenVietTat đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Website')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Website nvarchar(255);
    PRINT '  ✓ Đã thêm cột Website';
END
ELSE
    PRINT '  - Cột Website đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'QuyMo')
BEGIN
    ALTER TABLE NhaTuyenDung ADD QuyMo nvarchar(50);
    PRINT '  ✓ Đã thêm cột QuyMo';
END
ELSE
    PRINT '  - Cột QuyMo đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'LinhVuc')
BEGIN
    ALTER TABLE NhaTuyenDung ADD LinhVuc nvarchar(100);
    PRINT '  ✓ Đã thêm cột LinhVuc';
END
ELSE
    PRINT '  - Cột LinhVuc đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'MoTa')
BEGIN
    ALTER TABLE NhaTuyenDung ADD MoTa nvarchar(max);
    PRINT '  ✓ Đã thêm cột MoTa';
END
ELSE
    PRINT '  - Cột MoTa đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'DiaChi')
BEGIN
    ALTER TABLE NhaTuyenDung ADD DiaChi nvarchar(255);
    PRINT '  ✓ Đã thêm cột DiaChi';
END
ELSE
    PRINT '  - Cột DiaChi đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'SoDienThoai')
BEGIN
    ALTER TABLE NhaTuyenDung ADD SoDienThoai nvarchar(20);
    PRINT '  ✓ Đã thêm cột SoDienThoai';
END
ELSE
    PRINT '  - Cột SoDienThoai đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'EmailCongTy')
BEGIN
    ALTER TABLE NhaTuyenDung ADD EmailCongTy nvarchar(100);
    PRINT '  ✓ Đã thêm cột EmailCongTy';
END
ELSE
    PRINT '  - Cột EmailCongTy đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_Ten')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_Ten nvarchar(100);
    PRINT '  ✓ Đã thêm cột NguoiLienHe_Ten';
END
ELSE
    PRINT '  - Cột NguoiLienHe_Ten đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_ChucVu')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_ChucVu nvarchar(100);
    PRINT '  ✓ Đã thêm cột NguoiLienHe_ChucVu';
END
ELSE
    PRINT '  - Cột NguoiLienHe_ChucVu đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_Email')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_Email nvarchar(100);
    PRINT '  ✓ Đã thêm cột NguoiLienHe_Email';
END
ELSE
    PRINT '  - Cột NguoiLienHe_Email đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_SDT')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_SDT nvarchar(20);
    PRINT '  ✓ Đã thêm cột NguoiLienHe_SDT';
END
ELSE
    PRINT '  - Cột NguoiLienHe_SDT đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Facebook')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Facebook nvarchar(255);
    PRINT '  ✓ Đã thêm cột Facebook';
END
ELSE
    PRINT '  - Cột Facebook đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'LinkedIn')
BEGIN
    ALTER TABLE NhaTuyenDung ADD LinkedIn nvarchar(255);
    PRINT '  ✓ Đã thêm cột LinkedIn';
END
ELSE
    PRINT '  - Cột LinkedIn đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Logo')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Logo nvarchar(255);
    PRINT '  ✓ Đã thêm cột Logo';
END
ELSE
    PRINT '  - Cột Logo đã tồn tại';

GO

-- ============================================
-- BẢNG CV
-- ============================================
PRINT '';
PRINT '>>> Đang cập nhật bảng CV...';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'Template')
BEGIN
    ALTER TABLE CV ADD Template nvarchar(50) DEFAULT 'modern';
    PRINT '  ✓ Đã thêm cột Template';
END
ELSE
    PRINT '  - Cột Template đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'TrangThai')
BEGIN
    ALTER TABLE CV ADD TrangThai nvarchar(50) DEFAULT 'draft';
    PRINT '  ✓ Đã thêm cột TrangThai';
END
ELSE
    PRINT '  - Cột TrangThai đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'DuLieuCV')
BEGIN
    ALTER TABLE CV ADD DuLieuCV nvarchar(max);
    PRINT '  ✓ Đã thêm cột DuLieuCV';
END
ELSE
    PRINT '  - Cột DuLieuCV đã tồn tại';

-- Các cột bổ sung cho CV (đã có trong update_cv_table.sql)
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'Objective')
BEGIN
    ALTER TABLE CV ADD Objective nvarchar(max);
    PRINT '  ✓ Đã thêm cột Objective';
END
ELSE
    PRINT '  - Cột Objective đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'IsDraft')
BEGIN
    ALTER TABLE CV ADD IsDraft bit DEFAULT 0;
    PRINT '  ✓ Đã thêm cột IsDraft';
END
ELSE
    PRINT '  - Cột IsDraft đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'CreatedAt')
BEGIN
    ALTER TABLE CV ADD CreatedAt datetime DEFAULT GETDATE();
    PRINT '  ✓ Đã thêm cột CreatedAt';
END
ELSE
    PRINT '  - Cột CreatedAt đã tồn tại';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'UpdatedAt')
BEGIN
    ALTER TABLE CV ADD UpdatedAt datetime;
    PRINT '  ✓ Đã thêm cột UpdatedAt';
END
ELSE
    PRINT '  - Cột UpdatedAt đã tồn tại';

GO

-- ============================================
-- KẾT THÚC
-- ============================================
PRINT '';
PRINT '========================================';
PRINT 'HOÀN TẤT BỔ SUNG CÁC TRƯỜNG!';
PRINT '========================================';
PRINT '';
PRINT 'Các bảng đã được cập nhật:';
PRINT '  ✓ SinhVien: 6 trường';
PRINT '  ✓ NhaTuyenDung: 15 trường';
PRINT '  ✓ CV: 7 trường';
PRINT '';
PRINT 'Bây giờ bạn có thể chạy backend mà không bị lỗi!';
GO
