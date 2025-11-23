const { getPool } = require('../db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
    }

    try {
        const pool = await getPool();
        
        // Tìm user theo email
        const result = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE email = @email');
            
        const user = result.recordset[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }
        
        // Kiểm tra mật khẩu (đơn giản, không mã hóa cho demo)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        
        // Lấy thông tin chi tiết theo role
        let roleId = null;
        let specificInfo = {};
        
        if (user.role === 'student') {
            const sv = await pool.request()
                .input('user_id', user.user_id)
                .query('SELECT * FROM SinhVien WHERE user_id = @user_id');
            if (sv.recordset.length) {
                roleId = sv.recordset[0].SinhVien_id;
                specificInfo = sv.recordset[0];
            }
        } else if (user.role === 'employer') {
            const ntd = await pool.request()
                .input('user_id', user.user_id)
                .query('SELECT * FROM NhaTuyenDung WHERE user_id = @user_id');
            if (ntd.recordset.length) {
                roleId = ntd.recordset[0].NhaTuyenDung_id;
                specificInfo = ntd.recordset[0];
            }
        }
        
        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                id: user.user_id,
                email: user.email,
                name: user.full_name,
                role: user.role,
                roleId: roleId,
                ...specificInfo
            }
        });
        
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};

exports.register = async (req, res) => {
    const { full_name, email, password, role, phone } = req.body;
    
    if (!email || !password || !full_name || !role) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    try {
        const pool = await getPool();
        
        // Kiểm tra email đã tồn tại chưa
        const check = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE email = @email');
            
        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }
        
        // Insert vào bảng Users
        const result = await pool.request()
            .input('email', email)
            .input('password', password)
            .input('full_name', full_name)
            .input('role', role)
            .input('phone', phone || '')
            .query(`
                INSERT INTO Users (email, password, full_name, role, SDT)
                OUTPUT INSERTED.user_id
                VALUES (@email, @password, @full_name, @role, @phone)
            `);
            
        const userId = result.recordset[0].user_id;
        
        // Insert vào bảng chi tiết (SinhVien hoặc NhaTuyenDung)
        if (role === 'student') {
            await pool.request()
                .input('user_id', userId)
                .query('INSERT INTO SinhVien (user_id) VALUES (@user_id)');
        } else if (role === 'employer') {
            await pool.request()
                .input('user_id', userId)
                .query('INSERT INTO NhaTuyenDung (user_id) VALUES (@user_id)');
        }
        
        res.json({
            success: true,
            message: 'Đăng ký thành công',
            userId: userId
        });
        
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
};
