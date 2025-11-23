const { getPool } = require('./db');

async function checkRoleConstraint() {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
            SELECT definition 
            FROM sys.check_constraints 
            WHERE name = 'CK__Users__role__6477ECF3'
        `);
        
        if (result.recordset.length > 0) {
            console.log("Constraint definition:", result.recordset[0].definition);
        } else {
            console.log("Constraint not found by name. Listing all check constraints on Users table:");
            const allConstraints = await pool.request().query(`
                SELECT cc.name, cc.definition 
                FROM sys.check_constraints cc
                JOIN sys.tables t ON cc.parent_object_id = t.object_id
                WHERE t.name = 'Users'
            `);
            allConstraints.recordset.forEach(row => {
                console.log(`- ${row.name}: ${row.definition}`);
            });
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkRoleConstraint();
