-- Thêm các cột mới vào bảng NhaTuyenDung nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'TenVietTat')
BEGIN
    ALTER TABLE NhaTuyenDung ADD TenVietTat nvarchar(50);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Website')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Website nvarchar(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'QuyMo')
BEGIN
    ALTER TABLE NhaTuyenDung ADD QuyMo nvarchar(50);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'LinhVuc')
BEGIN
    ALTER TABLE NhaTuyenDung ADD LinhVuc nvarchar(100);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'MoTa')
BEGIN
    ALTER TABLE NhaTuyenDung ADD MoTa nvarchar(max);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'DiaChi')
BEGIN
    ALTER TABLE NhaTuyenDung ADD DiaChi nvarchar(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'SoDienThoai')
BEGIN
    ALTER TABLE NhaTuyenDung ADD SoDienThoai nvarchar(20);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'EmailCongTy')
BEGIN
    ALTER TABLE NhaTuyenDung ADD EmailCongTy nvarchar(100);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_Ten')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_Ten nvarchar(100);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_ChucVu')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_ChucVu nvarchar(100);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_Email')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_Email nvarchar(100);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'NguoiLienHe_SDT')
BEGIN
    ALTER TABLE NhaTuyenDung ADD NguoiLienHe_SDT nvarchar(20);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Facebook')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Facebook nvarchar(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'LinkedIn')
BEGIN
    ALTER TABLE NhaTuyenDung ADD LinkedIn nvarchar(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[NhaTuyenDung]') AND name = 'Logo')
BEGIN
    ALTER TABLE NhaTuyenDung ADD Logo nvarchar(255);
END

PRINT 'Table NhaTuyenDung updated successfully';
