-- Script cập nhật bảng CV để hỗ trợ CV Builder
-- Bảng CV đã tồn tại, chỉ cần thêm các cột mới

USE HotrovieclamSV;
GO

-- Kiểm tra và thêm các cột mới nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'Objective')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [Objective] NVARCHAR(MAX) NULL;
    PRINT 'Đã thêm cột Objective.';
END
ELSE
    PRINT 'Cột Objective đã tồn tại.';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'Template')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [Template] NVARCHAR(50) DEFAULT 'modern' NULL;
    PRINT 'Đã thêm cột Template.';
END
ELSE
    PRINT 'Cột Template đã tồn tại.';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'IsDraft')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [IsDraft] BIT DEFAULT 0 NULL;
    PRINT 'Đã thêm cột IsDraft.';
END
ELSE
    PRINT 'Cột IsDraft đã tồn tại.';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'CVData')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [CVData] NVARCHAR(MAX) NULL;
    PRINT 'Đã thêm cột CVData.';
END
ELSE
    PRINT 'Cột CVData đã tồn tại.';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'CreatedAt')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [CreatedAt] DATETIME DEFAULT GETDATE() NULL;
    PRINT 'Đã thêm cột CreatedAt.';
END
ELSE
    PRINT 'Cột CreatedAt đã tồn tại.';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND name = 'UpdatedAt')
BEGIN
    ALTER TABLE [dbo].[CV] ADD [UpdatedAt] DATETIME NULL;
    PRINT 'Đã thêm cột UpdatedAt.';
END
ELSE
    PRINT 'Cột UpdatedAt đã tồn tại.';

GO

PRINT 'Hoàn tất cập nhật bảng CV!';
GO

