-- Script kiểm tra bảng CVs có đủ cột chưa
-- Chạy script này để xem các cột hiện có trong bảng CVs

USE HotrovieclamSV;
GO

-- Kiểm tra các cột trong bảng CVs
SELECT 
    COLUMN_NAME AS 'Tên cột',
    DATA_TYPE AS 'Kiểu dữ liệu',
    IS_NULLABLE AS 'Cho phép NULL',
    COLUMN_DEFAULT AS 'Giá trị mặc định'
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'CVs'
ORDER BY ORDINAL_POSITION;
GO

-- Kiểm tra các cột bắt buộc
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'CVs' AND COLUMN_NAME = 'IsDraft')
    PRINT '✓ Cột IsDraft đã tồn tại'
ELSE
    PRINT '✗ Cột IsDraft CHƯA tồn tại - Cần thêm!'

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'CVs' AND COLUMN_NAME = 'CVData')
    PRINT '✓ Cột CVData đã tồn tại'
ELSE
    PRINT '✗ Cột CVData CHƯA tồn tại - Cần thêm!'

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'CVs' AND COLUMN_NAME = 'UpdatedAt')
    PRINT '✓ Cột UpdatedAt đã tồn tại'
ELSE
    PRINT '✗ Cột UpdatedAt CHƯA tồn tại - Cần thêm!'
GO

