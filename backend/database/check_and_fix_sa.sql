-- Script kiểm tra và sửa user sa
-- Chạy script này trong SSMS với Windows Authentication (quyền admin)

USE master;
GO

-- 1. Kiểm tra user sa có tồn tại không
PRINT '=== KIỂM TRA USER SA ===';
SELECT 
    name AS 'Login Name',
    type_desc AS 'Type',
    is_disabled AS 'Is Disabled',
    create_date AS 'Created Date'
FROM sys.server_principals
WHERE name = 'sa';
GO

-- 2. Kiểm tra SQL Server Authentication mode
PRINT '=== KIỂM TRA SQL SERVER AUTHENTICATION MODE ===';
SELECT 
    CASE 
        WHEN value = 2 THEN 'SQL Server and Windows Authentication mode (ENABLED) ✓'
        WHEN value = 1 THEN 'Windows Authentication mode only (DISABLED) ✗'
        ELSE 'Unknown'
    END AS 'Authentication Mode'
FROM sys.configurations
WHERE name = 'server authentication mode';
GO

-- 3. Enable SQL Server Authentication (nếu chưa enable)
PRINT '=== ENABLE SQL SERVER AUTHENTICATION ===';
EXEC xp_instance_regwrite 
    N'HKEY_LOCAL_MACHINE', 
    N'Software\Microsoft\MSSQLServer\MSSQLServer', 
    N'LoginMode', 
    REG_DWORD, 
    2; -- 2 = Mixed Mode (SQL + Windows)
GO

PRINT 'Đã enable SQL Server Authentication. Cần RESTART SQL Server service!';
GO

-- 4. Enable user sa (nếu bị disable)
PRINT '=== ENABLE USER SA ===';
ALTER LOGIN sa ENABLE;
GO

PRINT 'Đã enable user sa';
GO

-- 5. Đặt lại password cho sa (nếu cần)
-- UNCOMMENT dòng dưới và thay 'YourNewPassword123' bằng password bạn muốn
-- ALTER LOGIN sa WITH PASSWORD = 'YourNewPassword123';
-- GO
-- PRINT 'Đã đặt lại password cho sa';

-- 6. Kiểm tra lại
PRINT '=== KẾT QUẢ SAU KHI SỬA ===';
SELECT 
    name AS 'Login Name',
    type_desc AS 'Type',
    is_disabled AS 'Is Disabled',
    CASE WHEN is_disabled = 0 THEN 'ENABLED ✓' ELSE 'DISABLED ✗' END AS 'Status'
FROM sys.server_principals
WHERE name = 'sa';
GO

PRINT '========================================';
PRINT 'LƯU Ý: Nếu đã enable SQL Server Authentication,';
PRINT 'bạn CẦN RESTART SQL Server service!';
PRINT '========================================';
GO

