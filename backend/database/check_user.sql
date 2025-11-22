-- Script kiểm tra user và quyền
-- Chạy script này để xem thông tin user

USE master;
GO

-- Kiểm tra login ở server level
PRINT '=== KIỂM TRA LOGIN (SERVER LEVEL) ===';
SELECT 
    name AS 'Login Name',
    type_desc AS 'Type',
    is_disabled AS 'Is Disabled',
    default_database_name AS 'Default Database'
FROM sys.server_principals
WHERE name = 'nodejs_user';
GO

USE HotrovieclamSV;
GO

-- Kiểm tra user trong database
PRINT '=== KIỂM TRA USER (DATABASE LEVEL) ===';
SELECT 
    name AS 'User Name',
    type_desc AS 'Type',
    default_schema_name AS 'Default Schema'
FROM sys.database_principals
WHERE name = 'nodejs_user';
GO

-- Kiểm tra quyền của user
PRINT '=== KIỂM TRA QUYỀN ===';
SELECT 
    dp.name AS 'User',
    dp.type_desc AS 'Type',
    r.name AS 'Role'
FROM sys.database_principals dp
LEFT JOIN sys.database_role_members rm ON dp.principal_id = rm.member_principal_id
LEFT JOIN sys.database_principals r ON rm.role_principal_id = r.principal_id
WHERE dp.name = 'nodejs_user';
GO

-- Kiểm tra SQL Server Authentication mode
PRINT '=== KIỂM TRA SQL SERVER AUTHENTICATION MODE ===';
SELECT 
    CASE 
        WHEN value = 2 THEN 'SQL Server and Windows Authentication mode (ENABLED)'
        WHEN value = 1 THEN 'Windows Authentication mode only (DISABLED)'
        ELSE 'Unknown'
    END AS 'Authentication Mode'
FROM sys.configurations
WHERE name = 'server authentication mode';
GO

