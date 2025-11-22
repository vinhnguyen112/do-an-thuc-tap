-- Script đơn giản để tạo user nodejs_user
-- Chạy script này trong SSMS với quyền admin (Windows Authentication)

USE master;
GO

-- Xóa user cũ nếu tồn tại
IF EXISTS (SELECT * FROM sys.server_principals WHERE name = 'nodejs_user')
BEGIN
    DROP LOGIN nodejs_user;
    PRINT 'Đã xóa login nodejs_user cũ';
END
GO

-- Tạo login mới
CREATE LOGIN nodejs_user
WITH PASSWORD = '123456',
     DEFAULT_DATABASE = HotrovieclamSV,
     CHECK_EXPIRATION = OFF,
     CHECK_POLICY = OFF;
GO

PRINT 'Đã tạo login nodejs_user thành công!';
GO

-- Cấp quyền cho database
USE HotrovieclamSV;
GO

-- Xóa user cũ trong database nếu có
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'nodejs_user')
BEGIN
    DROP USER nodejs_user;
END
GO

-- Tạo user trong database
CREATE USER nodejs_user FOR LOGIN nodejs_user;
GO

-- Cấp quyền db_owner (full quyền)
ALTER ROLE db_owner ADD MEMBER nodejs_user;
GO

PRINT 'Đã tạo user nodejs_user và cấp quyền db_owner thành công!';
GO

-- Test kết nối (sẽ hiển thị user hiện tại)
SELECT SYSTEM_USER AS 'Current User';
GO

PRINT 'Hoàn tất! Bây giờ bạn có thể kết nối với user nodejs_user và password 123456';
GO

