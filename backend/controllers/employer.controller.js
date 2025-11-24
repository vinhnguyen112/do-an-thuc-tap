const { getPool } = require('../db');

// Lấy thông tin hồ sơ công ty
exports.getProfile = async (req, res) => {
    const { id } = req.params; // NTD_id

    try {
        const pool = await getPool();

        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT 
                    ntd.*, 
                    u.Email as UserEmail, 
                    u.HoTen as UserName
                FROM NhaTuyenDung ntd
                JOIN Users u ON ntd.user_id = u.user_id
                WHERE ntd.NTD_id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin công ty' });
        }

        const ntd = result.recordset[0];

        // Map dữ liệu sang format frontend
        const profile = {
            companyName: ntd.TenCongTy || ntd.UserName || '',
            shortName: ntd.TenVietTat || '',
            email: ntd.EmailCongTy || ntd.UserEmail || '',
            phone: ntd.SoDienThoai || '',
            address: ntd.DiaChi || '',
            website: ntd.Website || '',
            scale: ntd.QuyMo || '',
            industry: ntd.LinhVuc || '',
            description: ntd.MoTa || '',
            contactName: ntd.NguoiLienHe_Ten || '',
            contactPosition: ntd.NguoiLienHe_ChucVu || '',
            contactEmail: ntd.NguoiLienHe_Email || '',
            contactPhone: ntd.NguoiLienHe_SDT || '',
            facebook: ntd.Facebook || '',
            linkedin: ntd.LinkedIn || '',
            logo: ntd.Logo || ''
        };

        res.json(profile);

    } catch (err) {
        console.error('Get Employer Profile Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Cập nhật hồ sơ công ty
exports.updateProfile = async (req, res) => {
    const { id } = req.params; // NTD_id
    const {
        companyName, shortName, email, phone, address, website, scale, industry, description,
        contactName, contactPosition, contactEmail, contactPhone, facebook, linkedin, logo
    } = req.body;

    try {
        const pool = await getPool();

        // 1. Cập nhật bảng Users (Tên công ty -> HoTen)
        // Lấy user_id trước
        const ntdCheck = await pool.request()
            .input('id', id)
            .query('SELECT user_id FROM NhaTuyenDung WHERE NTD_id = @id');
            
        if (ntdCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhà tuyển dụng' });
        }
        
        const userId = ntdCheck.recordset[0].user_id;

        if (companyName) {
            await pool.request()
                .input('user_id', userId)
                .input('HoTen', companyName)
                .query('UPDATE Users SET HoTen = @HoTen WHERE user_id = @user_id');
        }

        // 2. Cập nhật bảng NhaTuyenDung
        await pool.request()
            .input('id', id)
            .input('TenCongTy', companyName)
            .input('TenVietTat', shortName)
            .input('EmailCongTy', email)
            .input('SoDienThoai', phone)
            .input('DiaChi', address)
            .input('Website', website)
            .input('QuyMo', scale)
            .input('LinhVuc', industry)
            .input('MoTa', description)
            .input('NguoiLienHe_Ten', contactName)
            .input('NguoiLienHe_ChucVu', contactPosition)
            .input('NguoiLienHe_Email', contactEmail)
            .input('NguoiLienHe_SDT', contactPhone)
            .input('Facebook', facebook)
            .input('LinkedIn', linkedin)
            .input('Logo', logo)
            .query(`
                UPDATE NhaTuyenDung 
                SET TenCongTy = @TenCongTy,
                    TenVietTat = @TenVietTat,
                    EmailCongTy = @EmailCongTy,
                    SoDienThoai = @SoDienThoai,
                    DiaChi = @DiaChi,
                    Website = @Website,
                    QuyMo = @QuyMo,
                    LinhVuc = @LinhVuc,
                    MoTa = @MoTa,
                    NguoiLienHe_Ten = @NguoiLienHe_Ten,
                    NguoiLienHe_ChucVu = @NguoiLienHe_ChucVu,
                    NguoiLienHe_Email = @NguoiLienHe_Email,
                    NguoiLienHe_SDT = @NguoiLienHe_SDT,
                    Facebook = @Facebook,
                    LinkedIn = @LinkedIn,
                    Logo = @Logo
                WHERE NTD_id = @id
            `);

        res.json({ success: true, message: 'Cập nhật hồ sơ thành công' });

    } catch (err) {
        console.error('Update Employer Profile Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};
