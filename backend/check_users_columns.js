const { getPool } = require('./db');

async function checkUsersSchema() {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Users'
        `);
        
        console.log("Columns in Users table:");
        result.recordset.forEach(row => {
            console.log(`- ${row.COLUMN_NAME}`);
        });
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkUsersSchema();
