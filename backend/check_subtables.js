const { getPool } = require('./db');

async function checkSubTablesSchema() {
    try {
        const pool = await getPool();
        
        console.log("--- SinhVien Table Columns ---");
        const resSV = await pool.request().query(`
            SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'SinhVien'
        `);
        resSV.recordset.forEach(row => {
            console.log(`${row.COLUMN_NAME} (${row.DATA_TYPE}, ${row.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });

        console.log("\n--- NhaTuyenDung Table Columns ---");
        const resNTD = await pool.request().query(`
            SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'NhaTuyenDung'
        `);
        resNTD.recordset.forEach(row => {
            console.log(`${row.COLUMN_NAME} (${row.DATA_TYPE}, ${row.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkSubTablesSchema();
