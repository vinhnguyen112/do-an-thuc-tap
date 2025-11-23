// File: post-job.js
// Chức năng: Đăng tin tuyển dụng (dành cho nhà tuyển dụng)
// Tác giả: Sinh viên thực tập
// Lưu ý: File này trong thư mục student nhưng thực ra dành cho employer

console.log('File post-job.js đã load!');

// Khi trang load
window.onload = function() {
    console.log('Trang đăng tin tuyển dụng đã sẵn sàng!');
    
    // Setup form
    khoiTaoFormDangTin();
};

// Khởi tạo form đăng tin
function khoiTaoFormDangTin() {
    var form = document.getElementById('postJobForm');
    
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            xuLyDangTin();
        };
    }
}

// Xử lý đăng tin
function xuLyDangTin() {
    console.log('Đang xử lý đăng tin...');
    
    // Lấy dữ liệu từ form
    var tieuDe = document.getElementById('tieuDe').value;
    var moTa = document.getElementById('moTa').value;
    var yeuCau = document.getElementById('yeuCau').value;
    var mucLuong = document.getElementById('mucLuong').value;
    var diaDiem = document.getElementById('diaDiem').value;
    
    // Kiểm tra dữ liệu
    if (!tieuDe || tieuDe.trim() == '') {
        alert('Vui lòng nhập tiêu đề công việc!');
        return;
    }
    
    if (!moTa || moTa.trim() == '') {
        alert('Vui lòng nhập mô tả công việc!');
        return;
    }
    
    console.log('Dữ liệu hợp lệ');
    console.log('Tiêu đề: ' + tieuDe);
    console.log('Mô tả: ' + moTa);
    
    // Tạo object tin tuyển dụng
    var tinTuyenDung = {
        id: Date.now(),
        tieuDe: tieuDe,
        moTa: moTa,
        yeuCau: yeuCau,
        mucLuong: mucLuong,
        diaDiem: diaDiem,
        ngayDang: layNgayHienTai(),
        trangThai: 'Đang tuyển'
    };
    
    // Lưu vào localStorage
    luuTinTuyenDung(tinTuyenDung);
    
    alert('Đã đăng tin tuyển dụng thành công!');
    
    // Reset form
    document.getElementById('postJobForm').reset();
}

// Lưu tin tuyển dụng
function luuTinTuyenDung(tin) {
    console.log('Lưu tin tuyển dụng...');
    
    var danhSachTin = localStorage.getItem('tinTuyenDung');
    
    if (danhSachTin) {
        danhSachTin = JSON.parse(danhSachTin);
    } else {
        danhSachTin = [];
    }
    
    danhSachTin.push(tin);
    localStorage.setItem('tinTuyenDung', JSON.stringify(danhSachTin));
    
    console.log('Đã lưu tin');
}

// Lấy ngày hiện tại
function layNgayHienTai() {
    var ngay = new Date();
    var d = ngay.getDate();
    var m = ngay.getMonth() + 1;
    var y = ngay.getFullYear();
    
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
    
    return d + '/' + m + '/' + y;
}

// Lưu bản nháp
function luuBanNhap() {
    console.log('Lưu bản nháp...');
    alert('Đã lưu bản nháp!');
}

// Xem trước tin tuyển dụng
function xemTruoc() {
    console.log('Xem trước tin tuyển dụng...');
    alert('Tính năng xem trước đang phát triển!');
}

// Thêm kỹ năng yêu cầu
function themKyNang() {
    console.log('Thêm kỹ năng...');
    var skillInput = document.getElementById('skillInput');
    if (skillInput && skillInput.value.trim() !== '') {
        console.log('Đã thêm: ' + skillInput.value);
        skillInput.value = ''; // Xóa input
    }
}

// Xóa kỹ năng
function xoaKyNang(element) {
    console.log('Xóa kỹ năng...');
    if (element && element.parentElement) {
        element.parentElement.remove();
    }
}

console.log('File post-job.js sẵn sàng!');
