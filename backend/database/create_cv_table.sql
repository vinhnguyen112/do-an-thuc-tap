-- Script tạo bảng CVs cho CV Builder
-- Chạy script này trong SQL Server Management Studio hoặc Azure Data Studio

USE HotrovieclamSV;
GO

-- Kiểm tra và tạo bảng CVs
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CVs]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[CVs] (
        [CVId] INT PRIMARY KEY IDENTITY(1,1),
        [UserId] INT NOT NULL,
        [Title] NVARCHAR(255) NOT NULL,
        [Objective] NVARCHAR(MAX),
        [Skills] NVARCHAR(MAX), -- Lưu dạng JSON string
        [Template] NVARCHAR(50) DEFAULT 'modern',
        [IsDraft] BIT DEFAULT 0, -- 0 = CV chính thức, 1 = bản nháp
        [CVData] NVARCHAR(MAX), -- Lưu toàn bộ dữ liệu CV dạng JSON
        [CreatedAt] DATETIME DEFAULT GETDATE(),
        [UpdatedAt] DATETIME NULL
    );
    
    PRINT 'Bảng CVs đã được tạo thành công!';
END
ELSE
BEGIN
    PRINT 'Bảng CVs đã tồn tại.';
    
    -- Thêm các cột mới nếu chưa có (cho trường hợp bảng đã tồn tại)
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CVs]') AND name = 'IsDraft')
    BEGIN
        ALTER TABLE [dbo].[CVs] ADD [IsDraft] BIT DEFAULT 0;
        PRINT 'Đã thêm cột IsDraft.';
    END
    
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CVs]') AND name = 'CVData')
    BEGIN
        ALTER TABLE [dbo].[CVs] ADD [CVData] NVARCHAR(MAX);
        PRINT 'Đã thêm cột CVData.';
    END
    
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CVs]') AND name = 'UpdatedAt')
    BEGIN
        ALTER TABLE [dbo].[CVs] ADD [UpdatedAt] DATETIME NULL;
        PRINT 'Đã thêm cột UpdatedAt.';
    END
END
GO

-- Tạo index để tối ưu truy vấn
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_CVs_UserId')
BEGIN
    CREATE INDEX IX_CVs_UserId ON [dbo].[CVs]([UserId]);
    PRINT 'Đã tạo index IX_CVs_UserId.';
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_CVs_IsDraft')
BEGIN
    CREATE INDEX IX_CVs_IsDraft ON [dbo].[CVs]([IsDraft]);
    PRINT 'Đã tạo index IX_CVs_IsDraft.';
END

PRINT 'Hoàn tất!';
GO

