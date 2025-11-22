-- Script đặt lại password cho user sa
-- Chạy script này trong SSMS với Windows Authentication (quyền admin)

USE master;
GO

-- Đặt lại password cho sa
-- THAY ĐỔI '123456' bằng password bạn muốn
ALTER LOGIN sa WITH PASSWORD = '123456';
GO

-- Enable user sa (nếu bị disable)
ALTER LOGIN sa ENABLE;
GO

PRINT 'Đã đặt lại password cho sa thành: 123456';
PRINT 'Đã enable user sa';
PRINT '';
PRINT 'Bây giờ bạn có thể dùng:';
PRINT '  user: sa';
PRINT '  password: 123456';
GO

