const { getPool } = require('../db');

// Tạo CV mới
exports.createCV = async (req, res) => {
    const { sinhVienId, tenCV, template, trangThai, duLieuCV } = req.body;

    // Validate sinhVienId
    if (!sinhVienId || sinhVienId === 'null' || sinhVienId === 'undefined') {
        return res.status(400).json({ message: 'Lỗi xác thực: Vui lòng đăng xuất và đăng nhập lại.' });
    }

    try {
        const pool = await getPool();
        
        // Chuyển duLieuCV sang JSON string nếu nó là object
        const duLieuString = typeof duLieuCV === 'object' ? JSON.stringify(duLieuCV) : duLieuCV;

        await pool.request()
            .input('sv_id', sinhVienId)
            .input('ten', tenCV)
            .input('template', template)
            .input('trang_thai', trangThai)
            .input('du_lieu', duLieuString)
            .query(`
                INSERT INTO CV (SinhVien_id, TenCV, Template, TrangThai, DuLieuCV, NgayTaiLen)
                VALUES (@sv_id, @ten, @template, @trang_thai, @du_lieu, GETDATE())
            `);

        res.json({ success: true, message: 'Đã lưu CV thành công' });
    } catch (err) {
        console.error('Create CV Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Lấy danh sách CV của sinh viên
exports.getCVs = async (req, res) => {
    const { id } = req.params; // SinhVien_id

    try {
        const pool = await getPool();

        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT * FROM CV 
                WHERE SinhVien_id = @id 
                ORDER BY NgayTaiLen DESC
            `);

        res.json(result.recordset);
    } catch (err) {
        console.error('Get CVs Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Lấy chi tiết 1 CV
exports.getCV = async (req, res) => {
    const { id } = req.params; // CV_id

    try {
        const pool = await getPool();

        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM CV WHERE CV_id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy CV' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Get CV Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Cập nhật CV
exports.updateCV = async (req, res) => {
    const { id } = req.params; // CV_id
    const { tenCV, template, trangThai, duLieuCV } = req.body;

    try {
        const pool = await getPool();
        
        const duLieuString = typeof duLieuCV === 'object' ? JSON.stringify(duLieuCV) : duLieuCV;

        await pool.request()
            .input('id', id)
            .input('ten', tenCV)
            .input('template', template)
            .input('trang_thai', trangThai)
            .input('du_lieu', duLieuString)
            .query(`
                UPDATE CV 
                SET TenCV = @ten, 
                    Template = @template, 
                    TrangThai = @trang_thai, 
                    DuLieuCV = @du_lieu,
                    NgayTaiLen = GETDATE()
                WHERE CV_id = @id
            `);

        res.json({ success: true, message: 'Cập nhật CV thành công' });
    } catch (err) {
        console.error('Update CV Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Xóa CV
exports.deleteCV = async (req, res) => {
    const { id } = req.params; // CV_id

    try {
        const pool = await getPool();

        await pool.request()
            .input('id', id)
            .query('DELETE FROM CV WHERE CV_id = @id');

        res.json({ success: true, message: 'Đã xóa CV' });
    } catch (err) {
        console.error('Delete CV Error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};
