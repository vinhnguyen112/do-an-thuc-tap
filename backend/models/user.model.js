const { getPool } = require("../db");

// Lấy SinhVien_id từ user_id
async function getSinhVienIdByUserId(userId) {
    const pool = await getPool();
    const request = pool.request();
    const user_id = typeof userId === 'string' ? parseInt(userId) : userId;
    
    request.input("user_id", user_id);
    
    const result = await request.query(`
        SELECT SinhVien_id 
        FROM SinhVien 
        WHERE user_id = @user_id
    `);
    
    if (!result.recordset || result.recordset.length === 0) {
        return null;
    }
    
    return result.recordset[0].SinhVien_id;
}

// Lấy user_id từ SinhVien_id
async function getUserIdBySinhVienId(sinhVienId) {
    const pool = await getPool();
    const request = pool.request();
    const sinhVien_id = typeof sinhVienId === 'string' ? parseInt(sinhVienId) : sinhVienId;
    
    request.input("SinhVien_id", sinhVien_id);
    
    const result = await request.query(`
        SELECT user_id 
        FROM SinhVien 
        WHERE SinhVien_id = @SinhVien_id
    `);
    
    if (!result.recordset || result.recordset.length === 0) {
        return null;
    }
    
    return result.recordset[0].user_id;
}

module.exports = {
    getSinhVienIdByUserId,
    getUserIdBySinhVienId
};

