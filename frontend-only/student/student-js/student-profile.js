var thongTinSinhVien = {};

window.onload = function() {
    console.log('Trang hồ sơ đã load!');
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const roleId = localStorage.getItem('roleId');
    
    if (!isLoggedIn || !roleId) {
        alert('Vui lòng đăng nhập để xem hồ sơ!');
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    taiThongTinSinhVien(roleId);
    setupForm();
};

async function taiThongTinSinhVien(id) {
    console.log('Đang tải thông tin sinh viên từ server...');
    
    try {
        const response = await fetch(`http://localhost:5000/api/student/profile/${id}`);
        
        if (!response.ok) {
            throw new Error('Không thể tải thông tin hồ sơ');
        }

        thongTinSinhVien = await response.json();
        console.log('Đã tải thông tin:', thongTinSinhVien);
        
        dienThongTinVaoForm();
        
    } catch (error) {
        console.error('Lỗi tải hồ sơ:', error);
        alert('Có lỗi khi tải thông tin hồ sơ. Vui lòng thử lại sau.');
    }
}

function dienThongTinVaoForm() {
    console.log('Điền thông tin vào form...');
    
    var oHoTen = document.getElementById('hoTen');
    var oEmail = document.getElementById('email');
    var oSdt = document.getElementById('sdt');
    var oDiaChi = document.getElementById('diaChi');
    var oNgaySinh = document.getElementById('ngaySinh');
    var oGioiTinh = document.getElementById('gioiTinh');
    var oTruong = document.getElementById('truong');
    var oNganh = document.getElementById('nganh');
    var oNamTotNghiep = document.getElementById('namTotNghiep');
    
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

function setupForm() {
    const buttons = document.querySelectorAll('button.btn-primary');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Lưu thay đổi')) {
            btn.onclick = luuThongTin;
        }
    });
}

async function luuThongTin() {
    console.log('Đang lưu thông tin...');
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    var hoTen = document.getElementById('hoTen').value;
    var sdt = document.getElementById('sdt').value;
    var diaChi = document.getElementById('diaChi').value;
    var ngaySinh = document.getElementById('ngaySinh').value;
    var gioiTinh = document.getElementById('gioiTinh').value;
    var truong = document.getElementById('truong').value;
    var nganh = document.getElementById('nganh').value;
    var namTotNghiep = document.getElementById('namTotNghiep').value;
    
    if (!hoTen || hoTen.trim() == '') {
        alert('Vui lòng nhập họ tên!');
        return;
    }
    
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
            thongTinSinhVien = { ...thongTinSinhVien, ...dataToSave };
        } else {
            alert(result.message || 'Có lỗi khi lưu thông tin');
        }
    } catch (error) {
        console.error('Lỗi lưu hồ sơ:', error);
        alert('Không thể kết nối đến server');
    }
}

function uploadAnh() {
    console.log('Upload ảnh đại diện');
    var inputFile = document.getElementById('avatarInput'); 
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

function chuyenCheDoChinhSua() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        if (input.id !== 'email') { 
            input.readOnly = !input.readOnly;
        }
    });
    alert('Đã bật/tắt chế độ chỉnh sửa');
}
