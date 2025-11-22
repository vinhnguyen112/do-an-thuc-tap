-- Script tạo user và cấp quyền cho database
-- Chạy script này trong SQL Server Management Studio với quyền sysadmin

USE master;
GO

-- Kiểm tra xem user đã tồn tại chưa
IF EXISTS (SELECT * FROM sys.server_principals WHERE name = 'nodejs_user')
BEGIN
    PRINT 'User nodejs_user đã tồn tại. Đang xóa và tạo lại...';
    DROP LOGIN nodejs_user;
END
GO

-- Tạo login (user ở server level)
CREATE LOGIN nodejs_user
WITH PASSWORD = '123456',
     DEFAULT_DATABASE = HotrovieclamSV,
     CHECK_EXPIRATION = OFF,
     CHECK_POLICY = OFF;
GO

PRINT 'Đã tạo login nodejs_user thành công!';
GO

-- Chuyển sang database cần dùng
USE HotrovieclamSV;
GO

-- Tạo user trong database (map với login)
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'nodejs_user')
BEGIN
    DROP USER nodejs_user;
END
GO

CREATE USER nodejs_user FOR LOGIN nodejs_user;
GO

-- Cấp quyền db_owner (full quyền trên database)
ALTER ROLE db_owner ADD MEMBER nodejs_user;
GO

PRINT 'Đã tạo user nodejs_user trong database HotrovieclamSV và cấp quyền db_owner!';
GO

-- Kiểm tra lại
SELECT 
    name AS 'User Name',
    type_desc AS 'Type',
    default_schema_name AS 'Default Schema'
FROM sys.database_principals
WHERE name = 'nodejs_user';
GO

PRINT 'Hoàn tất! Bây giờ bạn có thể kết nối với user nodejs_user.';
GO

