IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CV]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[CV](
        [CV_id] [int] IDENTITY(1,1) NOT NULL,
        [SinhVien_id] [int] NOT NULL,
        [TenCV] [nvarchar](255) NOT NULL,
        [Skills] [nvarchar](max),
        [TepCV] [nvarchar](255),
        [NgayTaiLen] [datetime] DEFAULT GETDATE(),
        PRIMARY KEY CLUSTERED 
        (
            [CV_id] ASC
        )
    );
    PRINT 'Table CV created successfully';
END
ELSE
    PRINT 'Table CV already exists';
