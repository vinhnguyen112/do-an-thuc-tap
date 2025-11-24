const express = require("express");
const cors = require("cors");
const path = require("path");
const { getPool } = require("./db");

const cvRoutes = require("./routes/cv.routes");
const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const studentRoutes = require("./routes/student.routes");
const employerRoutes = require("./routes/employer.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cv", cvRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/employer", employerRoutes);

app.use(express.static(path.join(__dirname, "../frontend-only")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend-only/page/index.html"));
});

async function kiemTraKetNoi() {
    try {
        const pool = await getPool();
        console.log("✔ Đã kết nối SQL Server thành công!");
        return true;
    } catch (loi) {
        console.error("✖ Lỗi kết nối SQL Server:", loi.message);
        return false;
    }
}

const PORT = 5000;

app.listen(PORT, async () => {
    console.log("Backend đang chạy tại http://localhost:" + PORT);
    await kiemTraKetNoi();
});
