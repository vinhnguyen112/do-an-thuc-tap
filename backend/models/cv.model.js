// Import hàm getPool từ db.js
const { getPool } = require("../db");

// Hàm helper: Lấy SinhVien_id từ userId
async function getSinhVienId(userId) {
  const id = parseInt(userId);
  return id;
}

/* ============================================
   LƯU CV CHÍNH THỨC (ĐÚNG VỚI BẢNG CỦA BẠN)
   ============================================ */
async function saveCV(duLieu) {
  // Lấy kết nối database
  const ketNoi = await getPool();
  const yeuCau = ketNoi.request();

  // Lấy SinhVien_id từ userId
  const sinhVienId = await getSinhVienId(duLieu.userId);

  // Thêm các tham số vào yêu cầu
  yeuCau.input("SinhVien_id", sinhVienId);
  yeuCau.input("TenCV", duLieu.title || "");

  // Skills: chuyển array → string
  let kyNangString = "";
  if (Array.isArray(duLieu.skills)) {
    kyNangString = duLieu.skills.join(", ");
  } else {
    kyNangString = duLieu.skills || "";
  }
  yeuCau.input("Skills", kyNangString);

  // Không có TepCV lúc lưu → để null
  yeuCau.input("TepCV", null);

  // Thực hiện query INSERT
  const ketQua = await yeuCau.query(`
        INSERT INTO CV (SinhVien_id, TenCV, Skills, TepCV)
        OUTPUT INSERTED.CV_id, INSERTED.NgayTaiLen
        VALUES (@SinhVien_id, @TenCV, @Skills, @TepCV)
    `);

  // Trả về kết quả
  return {
    CVId: ketQua.recordset[0].CV_id,
    CreatedAt: ketQua.recordset[0].NgayTaiLen,
  };
}

/* ============================================
   LƯU BẢN NHÁP (CHỈ LƯU CỘT CƠ BẢN)
   ============================================ */
async function saveDraft(duLieu) {
  // Lưu bản nháp giống như lưu CV chính thức
  return await saveCV(duLieu);
}

/* ============================================
   LẤY DANH SÁCH CV
   ============================================ */
async function getCVs(userId) {
  // Lấy kết nối database
  const ketNoi = await getPool();
  const yeuCau = ketNoi.request();

  // Lấy SinhVien_id
  const sinhVienId = await getSinhVienId(userId);
  yeuCau.input("SinhVien_id", sinhVienId);

  // Thực hiện query SELECT
  const ketQua = await yeuCau.query(`
        SELECT * FROM CV 
        WHERE SinhVien_id = @SinhVien_id
        ORDER BY NgayTaiLen DESC
    `);

  // Chuyển dữ liệu sang dạng dễ đọc hơn
  return ketQua.recordset.map((cv) => ({
    CVId: cv.CV_id,
    UserId: cv.SinhVien_id,
    Title: cv.TenCV,
    Skills: cv.Skills ? cv.Skills.split(", ") : [],
    File: cv.TepCV,
    CreatedAt: cv.NgayTaiLen,
  }));
}

/* ============================================
   LẤY 1 CV
   ============================================ */
async function getCVById(cvId, userId) {
  // Lấy kết nối
  const ketNoi = await getPool();
  const yeuCau = ketNoi.request();

  // Thêm tham số
  yeuCau.input("CV_id", parseInt(cvId));
  yeuCau.input("SinhVien_id", parseInt(userId));

  // Thực hiện query
  const ketQua = await yeuCau.query(`
        SELECT * FROM CV 
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
    `);

  // Nếu không tìm thấy thì trả về null
  if (ketQua.recordset.length === 0) return null;

  // Lấy CV đầu tiên
  const cv = ketQua.recordset[0];

  // Trả về dữ liệu CV
  return {
    CVId: cv.CV_id,
    UserId: cv.SinhVien_id,
    Title: cv.TenCV,
    Skills: cv.Skills ? cv.Skills.split(", ") : [],
    File: cv.TepCV,
    CreatedAt: cv.NgayTaiLen,
  };
}

/* ============================================
   CẬP NHẬT CV
   ============================================ */
async function updateCV(cvId, userId, duLieu) {
  // Lấy kết nối
  const ketNoi = await getPool();
  const yeuCau = ketNoi.request();

  // Thêm tham số
  yeuCau.input("CV_id", parseInt(cvId));
  yeuCau.input("SinhVien_id", parseInt(userId));
  yeuCau.input("TenCV", duLieu.title);

  // Chuyển skills thành string
  let kyNangString = "";
  if (Array.isArray(duLieu.skills)) {
    kyNangString = duLieu.skills.join(", ");
  } else {
    kyNangString = duLieu.skills || "";
  }
  yeuCau.input("Skills", kyNangString);

  // Thực hiện query UPDATE
  const ketQua = await yeuCau.query(`
        UPDATE CV 
        SET TenCV = @TenCV, Skills = @Skills
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
        OUTPUT INSERTED.*
    `);

  // Nếu không có bản ghi nào được cập nhật
  if (!ketQua.recordset.length) return null;

  // Lấy CV vừa cập nhật
  const cv = ketQua.recordset[0];

  // Trả về dữ liệu
  return {
    CVId: cv.CV_id,
    UserId: cv.SinhVien_id,
    Title: cv.TenCV,
    Skills: cv.Skills.split(", "),
    File: cv.TepCV,
    CreatedAt: cv.NgayTaiLen,
  };
}

/* ============================================
   XOÁ CV
   ============================================ */
async function deleteCV(cvId, userId) {
  // Lấy kết nối
  const ketNoi = await getPool();
  const yeuCau = ketNoi.request();

  // Thêm tham số
  yeuCau.input("CV_id", parseInt(cvId));
  yeuCau.input("SinhVien_id", parseInt(userId));

  // Thực hiện query DELETE
  const ketQua = await yeuCau.query(`
        DELETE FROM CV 
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
    `);

  // Trả về true nếu xóa thành công (có ít nhất 1 bản ghi bị xóa)
  return ketQua.rowsAffected[0] > 0;
}

// Export các hàm để dùng ở file khác
module.exports = {
  saveCV,
  saveDraft,
  getCVs,
  getCVById,
  updateCV,
  deleteCV,
};
