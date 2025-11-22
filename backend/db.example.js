// File ví dụ cấu hình database
// Copy file này thành db.js và điền thông tin của bạn

const sql = require("mssql");

// ============================================
// CÁCH 1: SQL Server Authentication (Khuyến nghị)
// ============================================
// Dùng cách này nếu bạn có user/password SQL Server
const config = {
  server: "localhost", // hoặc ".\SQLEXPRESS" hoặc tên server của bạn
  database: "HotrovieclamSV",
  user: "sa", // Tên user SQL Server
  password: "YourPassword123", // Mật khẩu SQL Server
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// ============================================
// CÁCH 2: Windows Authentication (NTLM)
// ============================================
// Dùng cách này nếu bạn muốn dùng Windows Authentication
// const config = {
//   server: "localhost", // hoặc tên server của bạn
//   database: "HotrovieclamSV",
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
//   authentication: {
//     type: "ntlm",
//     options: {
//       userName: "YourWindowsUser", // Tên user Windows
//       password: "", // Mật khẩu Windows (để trống nếu không có)
//       domain: "YourDomain", // Tên domain hoặc tên máy
//     },
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   }
// };

// ============================================
// CÁCH 3: Connection String (Đơn giản nhất)
// ============================================
// const config = "Server=localhost;Database=HotrovieclamSV;User Id=sa;Password=YourPassword123;TrustServerCertificate=true;";

// Tạo connection pool global để dùng lại
let pool = null;

// Hàm kết nối dùng lại trong toàn bộ project
async function getPool() {
  try {
    // Nếu pool đã tồn tại và connected, trả về pool đó
    if (pool && pool.connected) {
      return pool;
    }
    
    // Nếu pool chưa tồn tại hoặc đã bị đóng, tạo pool mới
    if (!pool || !pool.connected) {
      pool = await sql.connect(config);
      console.log("Kết nối SQL Server thành công!");
      
      // Xử lý lỗi khi pool bị đóng
      pool.on('error', err => {
        console.error('SQL Pool Error:', err);
        pool = null; // Reset pool để tạo lại
      });
    }
    
    return pool;
  } catch (err) {
    console.error("Lỗi kết nối SQL Server:", err);
    pool = null; // Reset pool khi có lỗi
    throw err;
  }
}

// Đóng pool khi cần
async function closePool() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log("Đã đóng connection pool");
    }
  } catch (err) {
    console.error("Lỗi khi đóng pool:", err);
  }
}

module.exports = { sql, getPool, closePool };

