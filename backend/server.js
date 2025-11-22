const express = require("express");
const cors = require("cors");
const cvRoutes = require("./routes/cv.routes");
const { getPool } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cv", cvRoutes);

// Test kết nối database khi server khởi động
async function testConnection() {
    try {
        const pool = await getPool();
        console.log("✔ Đã kết nối SQL Server thành công!");
        return true;
    } catch (error) {
        console.error("✖ Lỗi kết nối SQL Server:", error.message);
        console.error("Chi tiết:", error);
        return false;
    }
}

// Khởi động server
const PORT = 5000;
app.listen(PORT, async () => {
    console.log("Backend đang chạy tại http://localhost:" + PORT);
    console.log("Đang kiểm tra kết nối database...");
    await testConnection();
});
