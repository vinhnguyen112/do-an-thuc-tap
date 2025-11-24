const { getPool, closePool } = require('./db');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    try {
        const pool = await getPool();
        
        const sqlPath = path.join(__dirname, 'database', 'create_applications_table.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('Executing SQL...');
        await pool.request().query(sqlContent);
        
        console.log('Database setup completed successfully!');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        await closePool();
    }
}

setupDatabase();
