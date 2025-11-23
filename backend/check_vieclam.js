const { getPool } = require('./db');

async function checkViecLamSchema() {
    try {
        const pool = await getPool();
        
        console.log("--- ViecLam Table Columns ---");
        const resVL = await pool.request().query(`
            SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'ViecLam'
        `);
        resVL.recordset.forEach(row => {
            console.log(`${row.COLUMN_NAME} (${row.DATA_TYPE}, ${row.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkViecLamSchema();
