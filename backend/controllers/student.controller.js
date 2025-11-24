const { getPool } = require('../db');

exports.getProfile = async (req, res) => {
    const { id } = req.params; // id này là user_id hoặc SinhVien_id, tùy frontend gửi
    // Ở auth.controller.js trả về roleId (SinhVien_id) và id (user_id). 
    // Frontend nên gửi SinhVien_id để tiện query bảng SinhVien.

    try {
        const pool = await getPool();
        
        // Query bảng SinhVien
        // Giả sử id gửi lên là SinhVien_id
        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT sv.*, u.Email, u.SDT 
                FROM SinhVien sv
                JOIN Users u ON sv.user_id = u.user_id
                WHERE sv.SinhVien_id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ sinh viên' });
        }

        const sv = result.recordset[0];
        
        // Map dữ liệu DB sang format frontend mong đợi (camelCase)
        const profile = {
            hoTen: sv.HoTen,
            email: sv.Email,
            sdt: sv.SDT,
            diaChi: sv.DiaChi || '',
            ngaySinh: sv.NgaySinh ? new Date(sv.NgaySinh).toISOString().split('T')[0] : '',
            gioiTinh: sv.GioiTinh || '',
            truong: sv.Truong || '',
            nganh: sv.Nganh || '',
            namTotNghiep: sv.NamTotNghiep || ''
        };

        res.json(profile);

    } catch (err) {
        console.error('Get Profile Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params; // SinhVien_id
    const { hoTen, sdt, diaChi, ngaySinh, gioiTinh, truong, nganh, namTotNghiep } = req.body;

    try {
        const pool = await getPool();

        // 1. Cập nhật bảng Users (HoTen, SDT)
        // Cần lấy user_id từ bảng SinhVien trước
        const svCheck = await pool.request()
            .input('id', id)
            .query('SELECT user_id FROM SinhVien WHERE SinhVien_id = @id');
            
        if (svCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        }
        
        const userId = svCheck.recordset[0].user_id;

        await pool.request()
            .input('user_id', userId)
            .input('HoTen', hoTen)
            .input('SDT', sdt)
            .query('UPDATE Users SET HoTen = @HoTen, SDT = @SDT WHERE user_id = @user_id');

        // 2. Cập nhật bảng SinhVien (Các thông tin còn lại)
        // Lưu ý: Cần đảm bảo các cột này tồn tại trong DB. Nếu chưa có, lệnh này sẽ lỗi.
        // Tôi giả định các cột này đã được tạo theo logic thông thường.
        await pool.request()
            .input('id', id)
            .input('HoTen', hoTen)
            .input('DiaChi', diaChi)
            .input('NgaySinh', ngaySinh)
            .input('GioiTinh', gioiTinh)
            .input('Truong', truong)
            .input('Nganh', nganh)
            .input('NamTotNghiep', namTotNghiep)
            .query(`
                UPDATE SinhVien 
                SET HoTen = @HoTen,
                    DiaChi = @DiaChi,
                    NgaySinh = @NgaySinh,
                    GioiTinh = @GioiTinh,
                    Truong = @Truong,
                    Nganh = @Nganh,
                    NamTotNghiep = @NamTotNghiep
                WHERE SinhVien_id = @id
            `);

        res.json({ success: true, message: 'Cập nhật hồ sơ thành công' });

    } catch (err) {
        console.error('Update Profile Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.getSavedJobs = async (req, res) => {
    const { id } = req.params; // SinhVien_id

    try {
        const pool = await getPool();
        
        // Lấy danh sách việc làm đã lưu
        // Giả sử bảng ViecLamDaLuu(SinhVien_id, BaiDang_id, NgayLuu)
        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT 
                    bd.BaiDang_id as id,
                    bd.LoaiCongViec as tieuDe,
                    ntd.TenCongTy as congTy,
                    bd.DiaDiem as diaDiem,
                    bd.MucLuong as mucLuong,
                    vl.NgayLuu as ngayLuu
                FROM ViecLamDaLuu vl
                JOIN BaiDang bd ON vl.BaiDang_id = bd.BaiDang_id
                JOIN NhaTuyenDung ntd ON bd.NTD_id = ntd.NTD_id
                WHERE vl.SinhVien_id = @id
                ORDER BY vl.NgayLuu DESC
            `);

        const savedJobs = result.recordset.map(job => ({
            ...job,
            ngayLuu: job.ngayLuu ? new Date(job.ngayLuu).toLocaleDateString('vi-VN') : ''
        }));

        res.json(savedJobs);

    } catch (err) {
        console.error('Get Saved Jobs Error:', err);
        // Nếu lỗi do bảng không tồn tại, trả về mảng rỗng để frontend không crash
        if (err.message.includes('Invalid object name')) {
            return res.json([]);
        }
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.saveJob = async (req, res) => {
    const { id } = req.params; // SinhVien_id
    const { jobId } = req.body; // BaiDang_id

    try {
        const pool = await getPool();

        // Kiểm tra xem đã lưu chưa
        const check = await pool.request()
            .input('sv_id', id)
            .input('job_id', jobId)
            .query('SELECT * FROM ViecLamDaLuu WHERE SinhVien_id = @sv_id AND BaiDang_id = @job_id');

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Công việc này đã được lưu rồi' });
        }

        // Lưu vào DB
        await pool.request()
            .input('sv_id', id)
            .input('job_id', jobId)
            .query('INSERT INTO ViecLamDaLuu (SinhVien_id, BaiDang_id, NgayLuu) VALUES (@sv_id, @job_id, GETDATE())');

        res.json({ success: true, message: 'Đã lưu công việc' });

    } catch (err) {
        console.error('Save Job Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.unsaveJob = async (req, res) => {
    const { id, jobId } = req.params; // id: SinhVien_id, jobId: BaiDang_id

    try {
        const pool = await getPool();

        await pool.request()
            .input('sv_id', id)
            .input('job_id', jobId)
            .query('DELETE FROM ViecLamDaLuu WHERE SinhVien_id = @sv_id AND BaiDang_id = @job_id');

        res.json({ success: true, message: 'Đã bỏ lưu công việc' });

    } catch (err) {
        console.error('Unsave Job Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.applyJob = async (req, res) => {
    const { id } = req.params; // SinhVien_id
    const { jobId, thuGioiThieu, tenFileCV } = req.body;

    try {
        const pool = await getPool();

        // Kiểm tra xem đã ứng tuyển chưa
        const check = await pool.request()
            .input('sv_id', id)
            .input('job_id', jobId)
            .query('SELECT * FROM DonUngTuyen WHERE SinhVien_id = @sv_id AND BaiDang_id = @job_id');

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Bạn đã ứng tuyển công việc này rồi' });
        }

        // Lưu vào DB
        await pool.request()
            .input('sv_id', id)
            .input('job_id', jobId)
            .input('thu', thuGioiThieu)
            .input('cv', tenFileCV)
            .query(`
                INSERT INTO DonUngTuyen (SinhVien_id, BaiDang_id, NgayUngTuyen, TrangThai, ThuGioiThieu, CV_File) 
                VALUES (@sv_id, @job_id, GETDATE(), N'Đang chờ duyệt', @thu, @cv)
            `);

        res.json({ success: true, message: 'Ứng tuyển thành công' });

    } catch (err) {
        console.error('Apply Job Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.getApplications = async (req, res) => {
    const { id } = req.params; // SinhVien_id

    try {
        const pool = await getPool();

        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT 
                    dt.DonUngTuyen_id as id,
                    bd.LoaiCongViec as tieuDe,
                    ntd.TenCongTy as congTy,
                    bd.DiaDiem as diaDiem,
                    dt.NgayUngTuyen as ngayUngTuyen,
                    dt.TrangThai as trangThai
                FROM DonUngTuyen dt
                JOIN BaiDang bd ON dt.BaiDang_id = bd.BaiDang_id
                JOIN NhaTuyenDung ntd ON bd.NTD_id = ntd.NTD_id
                WHERE dt.SinhVien_id = @id
                ORDER BY dt.NgayUngTuyen DESC
            `);

        const applications = result.recordset.map(app => ({
            ...app,
            ngayUngTuyen: app.ngayUngTuyen ? new Date(app.ngayUngTuyen).toLocaleDateString('vi-VN') : ''
        }));

        res.json(applications);

    } catch (err) {
        console.error('Get Applications Error:', err);
        if (err.message.includes('Invalid object name')) {
            return res.json([]);
        }
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};
