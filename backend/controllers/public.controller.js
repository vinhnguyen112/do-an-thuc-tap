const { getPool } = require('../db');

exports.getJobs = async (req, res) => {
    try {
        const pool = await getPool();
        
        // Lấy danh sách việc làm mới nhất, join với bảng Nhà tuyển dụng
        const result = await pool.request().query(`
            SELECT TOP 6 
                bd.BaiDang_id, 
                bd.LoaiCongViec as TieuDe, 
                bd.MucLuong, 
                bd.DiaDiem, 
                bd.NgayDang, 
                bd.YeuCau, -- Dùng làm kỹ năng (tạm thời)
                ntd.TenCongTy,
                ntd.NTD_id
            FROM BaiDang bd
            JOIN NhaTuyenDung ntd ON bd.NTD_id = ntd.NTD_id
            ORDER BY bd.NgayDang DESC
        `);
        
        // Format dữ liệu trả về
        const jobs = result.recordset.map(job => ({
            id: job.BaiDang_id,
            tieuDe: job.TieuDe,
            tenCongTy: job.TenCongTy || "Công ty ẩn danh",
            diaDiem: job.DiaDiem,
            loaiViec: "Toàn thời gian", // Tạm thời hardcode hoặc lấy từ cột khác nếu có
            luong: job.MucLuong,
            thoiGianDang: formatTimeAgo(job.NgayDang),
            kyNang: job.YeuCau ? job.YeuCau.split(',').slice(0, 3) : ["Kỹ năng khác"] // Tách yêu cầu thành mảng kỹ năng
        }));
        
        res.json(jobs);
    } catch (err) {
        console.error('Get jobs error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const pool = await getPool();
        
        // Lấy danh sách công ty
        const result = await pool.request().query(`
            SELECT TOP 6 
                ntd.NTD_id, 
                ntd.TenCongTy, 
                ntd.DiaChi,
                (SELECT COUNT(*) FROM BaiDang bd WHERE bd.NTD_id = ntd.NTD_id) as SoViTriTuyen
            FROM NhaTuyenDung ntd
        `);
        
        const companies = result.recordset.map(comp => ({
            id: comp.NTD_id,
            ten: comp.TenCongTy || "Công ty chưa cập nhật tên",
            nganhNghe: "Đa ngành", // Tạm thời hardcode
            diaDiem: comp.DiaChi ? comp.DiaChi.split(',').pop().trim() : "Việt Nam", // Lấy thành phố từ địa chỉ
            soNhanVien: "50-100", // Tạm thời hardcode
            soViTriTuyen: comp.SoViTriTuyen
        }));
        
        res.json(companies);
    } catch (err) {
        console.error('Get companies error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

// Hàm helper tính thời gian
function formatTimeAgo(date) {
    if (!date) return "Vừa xong";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " năm trước";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " tháng trước";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " ngày trước";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ trước";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút trước";
    return Math.floor(seconds) + " giây trước";
}
