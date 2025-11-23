const { getPool } = require('./db');

async function checkTables() {
    try {
        const pool = await getPool();
        const result = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        console.log("Tables in database:");
        result.recordset.forEach(row => {
            console.log(`- ${row.TABLE_NAME}`);
        });
        process.exit(0);
    } catch (err) {
        console.error("Error checking tables:", err);
        process.exit(1);
    }
}

checkTables();
