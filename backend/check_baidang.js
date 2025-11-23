const { getPool } = require('./db');

async function checkBaiDangSchema() {
    try {
        const pool = await getPool();
        
        console.log("--- BaiDang Table Columns ---");
        const resBD = await pool.request().query(`
            SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'BaiDang'
        `);
        resBD.recordset.forEach(row => {
            console.log(`${row.COLUMN_NAME} (${row.DATA_TYPE}, ${row.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkBaiDangSchema();
