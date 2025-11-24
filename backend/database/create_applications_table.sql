IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DonUngTuyen]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[DonUngTuyen](
        [DonUngTuyen_id] [int] IDENTITY(1,1) NOT NULL,
        [SinhVien_id] [int] NOT NULL,
        [BaiDang_id] [int] NOT NULL,
        [NgayUngTuyen] [datetime] DEFAULT GETDATE(),
        [TrangThai] [nvarchar](50) DEFAULT N'Đang chờ duyệt',
        [CV_File] [nvarchar](255),
        [ThuGioiThieu] [nvarchar](max),
        PRIMARY KEY CLUSTERED 
        (
            [DonUngTuyen_id] ASC
        )
    );
    PRINT 'Table DonUngTuyen created successfully';
END
ELSE
    PRINT 'Table DonUngTuyen already exists';
