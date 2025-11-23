// Import thư viện mssql để kết nối SQL Server
const sql = require("mssql");

// Cấu hình kết nối database
const config = {
    user: "sa",  // Tên đăng nhập
    password: "123456",  // Mật khẩu
    server: "LapcuaVinh",  // Tên server
    database: "HotrovieclamSV",  // Tên database
    options: {
        encrypt: false,  // Không mã hóa
        trustServerCertificate: true  // Tin tưởng certificate
    },
    pool: {
        max: 10,  // Tối đa 10 kết nối
        min: 0,  // Tối thiểu 0 kết nối
        idleTimeoutMillis: 30000  // Timeout 30 giây
    }
};

// Biến để lưu pool kết nối
let poolPromise = null;
let pool = null;

// Biến để kiểm tra đã kết nối chưa (để chỉ log 1 lần)
let daKetNoi = false;

// Hàm lấy kết nối database
async function getPool() {
    try {
        // Nếu chưa có pool thì tạo mới
        if (!poolPromise) {
            console.log("Đang tạo kết nối mới...");
            poolPromise = sql.connect(config);
            pool = await poolPromise;
            
            // Chỉ log lần đầu tiên
            if (!daKetNoi) {
                console.log("✔ Đã kết nối SQL Server thành công!");
                daKetNoi = true;
            }
            
            // Xử lý lỗi khi pool bị đóng
            pool.on('error', loi => {
                console.error('Lỗi SQL Pool:', loi);
                // Reset lại các biến
                poolPromise = null;
                pool = null;
                daKetNoi = false;
            });
        } else {
            // Nếu poolPromise đã tồn tại, đợi nó resolve
            if (!pool) {
                pool = await poolPromise;
            }
            
            // Kiểm tra pool còn connected không
            if (pool && !pool.connected) {
                console.log("Pool bị ngắt kết nối, đang kết nối lại...");
                poolPromise = sql.connect(config);
                pool = await poolPromise;
                daKetNoi = true;
            }
        }
        
        // Trả về pool
        return pool;
    } catch (loi) {
        // Nếu có lỗi
        console.error("✖ Lỗi kết nối SQL Server:", loi);
        
        // Reset lại các biến
        poolPromise = null;
        pool = null;
        daKetNoi = false;
        
        // Throw lỗi để hàm gọi biết
        throw loi;
    }
}

// Hàm đóng pool khi cần
async function closePool() {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            poolPromise = null;
            console.log("Đã đóng connection pool");
        }
    } catch (loi) {
        console.error("Lỗi khi đóng pool:", loi);
    }
}

// Export các hàm để dùng ở file khác
module.exports = { sql, getPool, closePool };
