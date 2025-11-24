const { getPool } = require('./src/db');

async function getEmployerUser() {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
            SELECT TOP 1 Email, MatKhau, HoTen 
            FROM Users 
            WHERE VaiTro = 'employer'
        `);

        if (result.recordset.length > 0) {
            console.log('Found Employer User:');
            console.log(result.recordset[0]);
        } else {
            console.log('No employer user found.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

getEmployerUser();
