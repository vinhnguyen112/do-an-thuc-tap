// Import các thư viện cần thiết
const express = require("express");
const cors = require("cors");
const cvRoutes = require("./routes/cv.routes");
const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const studentRoutes = require("./routes/student.routes");
const { getPool } = require("./db");

// Tạo ứng dụng Express
const app = express();

// Cho phép CORS (để frontend có thể gọi API)
app.use(cors());

// Cho phép đọc JSON từ request body
app.use(express.json());

const employerRoutes = require("./routes/employer.routes");

// Sử dụng routes
app.use("/api/cv", cvRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/employer", employerRoutes);

// Hàm kiểm tra kết nối database
async function kiemTraKetNoi() {
    try {
        // Thử lấy kết nối database
        const pool = await getPool();
        console.log("✔ Đã kết nối SQL Server thành công!");
        return true;
    } catch (loi) {
        // Nếu có lỗi thì in ra
        console.error("✖ Lỗi kết nối SQL Server:", loi.message);
        console.error("Chi tiết:", loi);
        return false;
    }
}

// Cổng để chạy server
const PORT = 5000;

// Khởi động server
app.listen(PORT, async () => {
    console.log("Backend đang chạy tại http://localhost:" + PORT);
    console.log("Đang kiểm tra kết nối database...");
    
    // Gọi hàm kiểm tra kết nối
    await kiemTraKetNoi();
});
