const { getPool } = require('./db');

async function checkTables() {
    try {
        const pool = await getPool();
        
        console.log("Checking Users table...");
        try {
            const resUsers = await pool.request().query("SELECT TOP 1 * FROM Users");
            console.log("Users table exists. Columns:", Object.keys(resUsers.recordset[0] || {}));
        } catch (e) { console.log("Users table error:", e.message); }

        console.log("Checking SinhVien table...");
        try {
            const resSV = await pool.request().query("SELECT TOP 1 * FROM SinhVien");
            console.log("SinhVien table exists. Columns:", Object.keys(resSV.recordset[0] || {}));
        } catch (e) { console.log("SinhVien table error:", e.message); }

        console.log("Checking NhaTuyenDung table...");
        try {
            const resNTD = await pool.request().query("SELECT TOP 1 * FROM NhaTuyenDung");
            console.log("NhaTuyenDung table exists. Columns:", Object.keys(resNTD.recordset[0] || {}));
        } catch (e) { console.log("NhaTuyenDung table error:", e.message); }

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkTables();
