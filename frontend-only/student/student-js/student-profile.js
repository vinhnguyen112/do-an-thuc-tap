// File: student-profile.js
// Chức năng: Quản lý hồ sơ sinh viên (Tích hợp API)
// Tác giả: Sinh viên thực tập

// Thông tin sinh viên
var thongTinSinhVien = {};

// Khi trang load
window.onload = function() {
    console.log('Trang hồ sơ đã load!');
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const roleId = localStorage.getItem('roleId');
    
    if (!isLoggedIn || !roleId) {
        alert('Vui lòng đăng nhập để xem hồ sơ!');
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Load thông tin sinh viên từ API
    taiThongTinSinhVien(roleId);
    
    // Setup form
    setupForm();
};

// Tải thông tin sinh viên từ API
async function taiThongTinSinhVien(id) {
    console.log('Đang tải thông tin sinh viên từ server...');
    
    try {
        const response = await fetch(`http://localhost:5000/api/student/profile/${id}`);
        
        if (!response.ok) {
            throw new Error('Không thể tải thông tin hồ sơ');
        }

        thongTinSinhVien = await response.json();
        console.log('Đã tải thông tin:', thongTinSinhVien);
        
        // Điền vào form
        dienThongTinVaoForm();
        
    } catch (error) {
        console.error('Lỗi tải hồ sơ:', error);
        alert('Có lỗi khi tải thông tin hồ sơ. Vui lòng thử lại sau.');
    }
}

// Điền thông tin vào form
function dienThongTinVaoForm() {
    console.log('Điền thông tin vào form...');
    
    // Lấy các ô input
    var oHoTen = document.getElementById('hoTen');
    var oEmail = document.getElementById('email');
    var oSdt = document.getElementById('sdt');
    var oDiaChi = document.getElementById('diaChi');
    var oNgaySinh = document.getElementById('ngaySinh');
    var oGioiTinh = document.getElementById('gioiTinh');
    var oTruong = document.getElementById('truong');
    var oNganh = document.getElementById('nganh');
    var oNamTotNghiep = document.getElementById('namTotNghiep');
    
    // Điền giá trị
    if (oHoTen) oHoTen.value = thongTinSinhVien.hoTen || '';
    if (oEmail) oEmail.value = thongTinSinhVien.email || '';
    if (oSdt) oSdt.value = thongTinSinhVien.sdt || '';
    if (oDiaChi) oDiaChi.value = thongTinSinhVien.diaChi || '';
    if (oNgaySinh) oNgaySinh.value = thongTinSinhVien.ngaySinh || '';
    if (oGioiTinh) oGioiTinh.value = thongTinSinhVien.gioiTinh || '';
    if (oTruong) oTruong.value = thongTinSinhVien.truong || '';
    if (oNganh) oNganh.value = thongTinSinhVien.nganh || '';
    if (oNamTotNghiep) oNamTotNghiep.value = thongTinSinhVien.namTotNghiep || '';
    
    console.log('Đã điền thông tin');
}

// Setup form
function setupForm() {
    var form = document.getElementById('profileForm'); // Cần đảm bảo ID form đúng trong HTML
    // Nếu HTML chưa có ID form, ta sẽ tìm nút lưu để gán sự kiện
    
    // Tìm nút lưu (dựa trên class hoặc vị trí nếu không có ID)
    // Trong HTML hiện tại: <button class="btn btn-primary">Lưu thay đổi</button>
    // Tốt nhất là thêm onclick vào nút đó hoặc tìm nó
    
    const buttons = document.querySelectorAll('button.btn-primary');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Lưu thay đổi')) {
            btn.onclick = luuThongTin;
        }
    });
}

// Lưu thông tin
async function luuThongTin() {
    console.log('Đang lưu thông tin...');
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    // Lấy dữ liệu từ form
    var hoTen = document.getElementById('hoTen').value;
    var sdt = document.getElementById('sdt').value;
    var diaChi = document.getElementById('diaChi').value;
    var ngaySinh = document.getElementById('ngaySinh').value;
    var gioiTinh = document.getElementById('gioiTinh').value;
    var truong = document.getElementById('truong').value;
    var nganh = document.getElementById('nganh').value;
    var namTotNghiep = document.getElementById('namTotNghiep').value;
    
    // Kiểm tra dữ liệu
    if (!hoTen || hoTen.trim() == '') {
        alert('Vui lòng nhập họ tên!');
        return;
    }
    
    // Tạo object dữ liệu
    const dataToSave = {
        hoTen,
        sdt,
        diaChi,
        ngaySinh,
        gioiTinh,
        truong,
        nganh,
        namTotNghiep
    };
    
    // Gọi API cập nhật
    try {
        const response = await fetch(`http://localhost:5000/api/student/profile/${roleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSave)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Cập nhật hồ sơ thành công!');
            // Cập nhật lại biến cục bộ
            thongTinSinhVien = { ...thongTinSinhVien, ...dataToSave };
        } else {
            alert(result.message || 'Có lỗi khi lưu thông tin');
        }
    } catch (error) {
        console.error('Lỗi lưu hồ sơ:', error);
        alert('Không thể kết nối đến server');
    }
}

// Upload ảnh đại diện (Giữ nguyên logic cũ hoặc cập nhật sau)
function uploadAnh() {
    console.log('Upload ảnh đại diện');
    var inputFile = document.getElementById('avatarInput'); // Sửa lại ID cho khớp HTML
    if (inputFile) inputFile.click();
}

function previewAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Chuyển chế độ chỉnh sửa
function chuyenCheDoChinhSua() {
    // Logic enable input
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        if (input.id !== 'email') { // Email thường không cho sửa
            input.readOnly = !input.readOnly;
        }
    });
    alert('Đã bật/tắt chế độ chỉnh sửa');
}
