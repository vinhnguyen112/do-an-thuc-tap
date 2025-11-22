const { getPool } = require("../db");

// Helper: Lấy SinhVien_id từ userId
async function getSinhVienId(userId) {
  const id = parseInt(userId);
  return id;
}

/* ============================================
   LƯU CV CHÍNH THỨC (ĐÚNG VỚI BẢNG CỦA BẠN)
   ============================================ */
async function saveCV(data) {
  const pool = await getPool();
  const request = pool.request();

  const sinhVienId = await getSinhVienId(data.userId);

  request.input("SinhVien_id", sinhVienId);
  request.input("TenCV", data.title || "");

  // Skills: chuyển array → string
  let skillsValue = "";
  if (Array.isArray(data.skills)) {
    skillsValue = data.skills.join(", ");
  } else {
    skillsValue = data.skills || "";
  }
  request.input("Skills", skillsValue);

  // Không có TepCV lúc lưu → để null
  request.input("TepCV", null);

  const result = await request.query(`
        INSERT INTO CV (SinhVien_id, TenCV, Skills, TepCV)
        OUTPUT INSERTED.CV_id, INSERTED.NgayTaiLen
        VALUES (@SinhVien_id, @TenCV, @Skills, @TepCV)
    `);

  return {
    CVId: result.recordset[0].CV_id,
    CreatedAt: result.recordset[0].NgayTaiLen,
  };
}

/* ============================================
   LƯU BẢN NHÁP (CHỈ LƯU CỘT CƠ BẢN)
   ============================================ */
async function saveDraft(data) {
  return await saveCV(data);
}

/* ============================================
   LẤY DANH SÁCH CV
   ============================================ */
async function getCVs(userId) {
  const pool = await getPool();
  const request = pool.request();

  const sinhVienId = await getSinhVienId(userId);
  request.input("SinhVien_id", sinhVienId);

  const result = await request.query(`
        SELECT * FROM CV 
        WHERE SinhVien_id = @SinhVien_id
        ORDER BY NgayTaiLen DESC
    `);

  return result.recordset.map((cv) => ({
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
  const pool = await getPool();
  const request = pool.request();

  request.input("CV_id", parseInt(cvId));
  request.input("SinhVien_id", parseInt(userId));

  const result = await request.query(`
        SELECT * FROM CV 
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
    `);

  if (result.recordset.length === 0) return null;

  const cv = result.recordset[0];

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
async function updateCV(cvId, userId, data) {
  const pool = await getPool();
  const request = pool.request();

  request.input("CV_id", parseInt(cvId));
  request.input("SinhVien_id", parseInt(userId));
  request.input("TenCV", data.title);

  let skillsValue = "";
  if (Array.isArray(data.skills)) {
    skillsValue = data.skills.join(", ");
  } else {
    skillsValue = data.skills || "";
  }
  request.input("Skills", skillsValue);

  const result = await request.query(`
        UPDATE CV 
        SET TenCV = @TenCV, Skills = @Skills
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
        OUTPUT INSERTED.*
    `);

  if (!result.recordset.length) return null;

  const cv = result.recordset[0];

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
  const pool = await getPool();
  const request = pool.request();

  request.input("CV_id", parseInt(cvId));
  request.input("SinhVien_id", parseInt(userId));

  const result = await request.query(`
        DELETE FROM CV 
        WHERE CV_id = @CV_id AND SinhVien_id = @SinhVien_id
    `);

  return result.rowsAffected[0] > 0;
}

module.exports = {
  saveCV,
  saveDraft,
  getCVs,
  getCVById,
  updateCV,
  deleteCV,
};
