// File: student-profile.js
// Chức năng: Quản lý hồ sơ sinh viên
// Tác giả: Sinh viên thực tập

// Thông tin sinh viên
var thongTinSinhVien = {};

// Khi trang load
window.onload = function() {
    console.log('Trang hồ sơ đã load!');
    
    // Load thông tin sinh viên
    taiThongTinSinhVien();
    
    // Setup form
    setupForm();
};

// Tải thông tin sinh viên
function taiThongTinSinhVien() {
    console.log('Đang tải thông tin sinh viên...');
    
    // Thử lấy từ localStorage
    var thongTin = localStorage.getItem('thongTinSinhVien');
    
    if (thongTin) {
        thongTinSinhVien = JSON.parse(thongTin);
        console.log('Đã tải thông tin từ localStorage');
    } else {
        // Tạo thông tin mẫu
        thongTinSinhVien = {
            hoTen: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            sdt: '0123456789',
            diaChi: 'Hồ Chí Minh',
            ngaySinh: '01/01/2000',
            gioiTinh: 'Nam',
            truong: 'Đại học Công nghệ TP.HCM',
            nganh: 'Công nghệ Thông tin',
            namTotNghiep: '2024'
        };
        console.log('Tạo thông tin mẫu');
    }
    
    // Điền vào form
    dienThongTinVaoForm();
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
    var form = document.getElementById('profileForm');
    
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            luuThongTin();
        };
    }
}

// Lưu thông tin
function luuThongTin() {
    console.log('Đang lưu thông tin...');
    
    // Lấy dữ liệu từ form
    var hoTen = document.getElementById('hoTen').value;
    var email = document.getElementById('email').value;
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
    
    if (!email || email.trim() == '') {
        alert('Vui lòng nhập email!');
        return;
    }
    
    // Cập nhật object
    thongTinSinhVien = {
        hoTen: hoTen,
        email: email,
        sdt: sdt,
        diaChi: diaChi,
        ngaySinh: ngaySinh,
        gioiTinh: gioiTinh,
        truong: truong,
        nganh: nganh,
        namTotNghiep: namTotNghiep
    };
    
    // Lưu vào localStorage
    try {
        localStorage.setItem('thongTinSinhVien', JSON.stringify(thongTinSinhVien));
        console.log('Đã lưu thông tin');
        alert('Đã lưu thông tin thành công!');
    } catch (loi) {
        console.log('Lỗi khi lưu: ' + loi);
        alert('Có lỗi khi lưu thông tin!');
    }
}

// Upload ảnh đại diện
function uploadAnh() {
    console.log('Upload ảnh đại diện');
    
    var inputFile = document.getElementById('anhDaiDien');
    
    if (!inputFile) {
        console.log('Không tìm thấy input file');
        return;
    }
    
    inputFile.click(); // Mở hộp thoại chọn file
}

// Xử lý khi chọn ảnh
function xuLyChonAnh(input) {
    var file = input.files[0];
    
    if (!file) {
        console.log('Chưa chọn file');
        return;
    }
    
    console.log('Đã chọn ảnh: ' + file.name);
    
    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        input.value = '';
        return;
    }
    
    // Đọc và hiển thị ảnh
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var anhPreview = document.getElementById('anhPreview');
        if (anhPreview) {
            anhPreview.src = e.target.result;
            console.log('Đã hiển thị ảnh preview');
        }
    };
    
    reader.readAsDataURL(file);
}

// Đổi mật khẩu
function doiMatKhau() {
    console.log('Đổi mật khẩu');
    
    var matKhauCu = prompt('Nhập mật khẩu cũ:');
    
    if (!matKhauCu) {
        console.log('Đã hủy đổi mật khẩu');
        return;
    }
    
    var matKhauMoi = prompt('Nhập mật khẩu mới:');
    
    if (!matKhauMoi) {
        console.log('Đã hủy đổi mật khẩu');
        return;
    }
    
    var xacNhanMatKhau = prompt('Nhập lại mật khẩu mới:');
    
    if (matKhauMoi != xacNhanMatKhau) {
        alert('Mật khẩu không khớp!');
        return;
    }
    
    // Giả lập đổi mật khẩu
    console.log('Đang đổi mật khẩu...');
    alert('Đổi mật khẩu thành công! (Demo)');
}

// Chuyển chế độ chỉnh sửa
function chuyenCheDoChinhSua() {
    console.log('Chuyển chế độ chỉnh sửa');
    // Trong thực tế sẽ enable/disable các input
    // Ở đây chỉ thông báo
    alert('Bạn đang ở chế độ chỉnh sửa!');
}

console.log('File student-profile.js đã load!');
