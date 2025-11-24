IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ViecLamDaLuu]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[ViecLamDaLuu](
        [SinhVien_id] [int] NOT NULL,
        [BaiDang_id] [int] NOT NULL,
        [NgayLuu] [datetime] DEFAULT GETDATE(),
        PRIMARY KEY CLUSTERED 
        (
            [SinhVien_id] ASC,
            [BaiDang_id] ASC
        )
    );
    PRINT 'Table ViecLamDaLuu created successfully';
END
ELSE
    PRINT 'Table ViecLamDaLuu already exists';
