const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456",
    server: "LapcuaVinh",
    database: "HotrovieclamSV",
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Tạo pool kết nối để tái sử dụng
let poolPromise = null;
let pool = null;

let isConnected = false; // Flag để chỉ log 1 lần

async function getPool() {
    try {
        if (!poolPromise) {
            poolPromise = sql.connect(config);
            pool = await poolPromise;
            if (!isConnected) {
                console.log("✔ Đã kết nối SQL Server thành công!");
                isConnected = true;
            }
            
            // Xử lý lỗi khi pool bị đóng
            pool.on('error', err => {
                console.error('SQL Pool Error:', err);
                poolPromise = null;
                pool = null;
                isConnected = false;
            });
        } else {
            // Nếu poolPromise đã tồn tại, đợi nó resolve
            if (!pool) {
                pool = await poolPromise;
            }
            
            // Kiểm tra pool còn connected không
            if (pool && !pool.connected) {
                poolPromise = sql.connect(config);
                pool = await poolPromise;
                isConnected = true;
            }
        }
        
        return pool;
    } catch (error) {
        console.error("✖ Lỗi kết nối SQL Server:", error);
        poolPromise = null;
        pool = null;
        isConnected = false;
        throw error;
    }
}

// Đóng pool khi cần
async function closePool() {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            poolPromise = null;
            console.log("Đã đóng connection pool");
        }
    } catch (err) {
        console.error("Lỗi khi đóng pool:", err);
    }
}

module.exports = { sql, getPool, closePool };
