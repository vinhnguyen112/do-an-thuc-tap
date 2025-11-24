-- Script: Bổ sung các trường còn thiếu cho bảng SinhVien
-- Mục đích: Đảm bảo tất cả trường được sử dụng trong code đều tồn tại trong database

USE HotrovieclamSV;
GO

PRINT '=== Bắt đầu cập nhật bảng SinhVien ===';
GO

-- DiaChi - Địa chỉ
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'DiaChi')
BEGIN
    ALTER TABLE SinhVien ADD DiaChi nvarchar(255);
    PRINT '✓ Đã thêm cột DiaChi';
END
ELSE
    PRINT '- Cột DiaChi đã tồn tại';

-- NgaySinh - Ngày sinh
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'NgaySinh')
BEGIN
    ALTER TABLE SinhVien ADD NgaySinh date;
    PRINT '✓ Đã thêm cột NgaySinh';
END
ELSE
    PRINT '- Cột NgaySinh đã tồn tại';

-- GioiTinh - Giới tính
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'GioiTinh')
BEGIN
    ALTER TABLE SinhVien ADD GioiTinh nvarchar(10);
    PRINT '✓ Đã thêm cột GioiTinh';
END
ELSE
    PRINT '- Cột GioiTinh đã tồn tại';

-- Truong - Trường học
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'Truong')
BEGIN
    ALTER TABLE SinhVien ADD Truong nvarchar(255);
    PRINT '✓ Đã thêm cột Truong';
END
ELSE
    PRINT '- Cột Truong đã tồn tại';

-- Nganh - Ngành học
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'Nganh')
BEGIN
    ALTER TABLE SinhVien ADD Nganh nvarchar(255);
    PRINT '✓ Đã thêm cột Nganh';
END
ELSE
    PRINT '- Cột Nganh đã tồn tại';

-- NamTotNghiep - Năm tốt nghiệp
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SinhVien]') AND name = 'NamTotNghiep')
BEGIN
    ALTER TABLE SinhVien ADD NamTotNghiep int;
    PRINT '✓ Đã thêm cột NamTotNghiep';
END
ELSE
    PRINT '- Cột NamTotNghiep đã tồn tại';

GO

PRINT '';
PRINT '=== Hoàn tất cập nhật bảng SinhVien ===';
GO
