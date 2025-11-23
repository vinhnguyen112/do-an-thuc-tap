const { getPool } = require('./db');

async function checkData() {
    try {
        const pool = await getPool();
        
        console.log("--- Sample BaiDang Data ---");
        const resBD = await pool.request().query("SELECT TOP 3 * FROM BaiDang");
        console.log(resBD.recordset);

        console.log("\n--- PhanLoaiViecLam Schema ---");
        const resPL = await pool.request().query(`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'PhanLoaiViecLam'
        `);
        resPL.recordset.forEach(row => {
            console.log(`${row.COLUMN_NAME} (${row.DATA_TYPE})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkData();
