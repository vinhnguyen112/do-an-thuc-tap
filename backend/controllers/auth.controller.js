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
            .query('SELECT * FROM Users WHERE Email = @email');
            
        const user = result.recordset[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }
        
        // Kiểm tra mật khẩu
        if (user.Password_hash !== password) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }
        
        // Lấy thông tin chi tiết theo role
        let roleId = null;
        let specificInfo = {};
        let frontendRole = '';
        
        if (user.role === 'SinhVien') {
            frontendRole = 'student';
            const sv = await pool.request()
                .input('user_id', user.user_id)
                .query('SELECT * FROM SinhVien WHERE user_id = @user_id');
            if (sv.recordset.length) {
                roleId = sv.recordset[0].SinhVien_id;
                specificInfo = sv.recordset[0];
            }
        } else if (user.role === 'NhaTuyenDung') {
            frontendRole = 'employer';
            const ntd = await pool.request()
                .input('user_id', user.user_id)
                .query('SELECT * FROM NhaTuyenDung WHERE user_id = @user_id');
            if (ntd.recordset.length) {
                roleId = ntd.recordset[0].NTD_id;
                specificInfo = ntd.recordset[0];
            }
        }
        
        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                id: user.user_id,
                email: user.Email,
                name: user.HoTen,
                role: frontendRole, // Trả về 'student' hoặc 'employer' cho frontend
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
            .query('SELECT * FROM Users WHERE Email = @email');
            
        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }
        
        // Map frontend role to database role
        let dbRole = '';
        if (role === 'student') dbRole = 'SinhVien';
        else if (role === 'employer') dbRole = 'NhaTuyenDung';
        else dbRole = role; // Fallback

        // Insert vào bảng Users
        const result = await pool.request()
            .input('email', email)
            .input('password', password)
            .input('full_name', full_name)
            .input('role', dbRole)
            .input('phone', phone || '')
            .query(`
                INSERT INTO Users (Email, Password_hash, HoTen, role, SDT)
                OUTPUT INSERTED.user_id
                VALUES (@email, @password, @full_name, @role, @phone)
            `);
            
        const userId = result.recordset[0].user_id;
        
        // Insert vào bảng chi tiết (SinhVien hoặc NhaTuyenDung)
        if (role === 'student') {
            await pool.request()
                .input('user_id', userId)
                .input('HoTen', full_name)
                .query('INSERT INTO SinhVien (user_id, HoTen) VALUES (@user_id, @HoTen)');
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
