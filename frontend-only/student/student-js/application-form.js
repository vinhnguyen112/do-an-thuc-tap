// File: application-form.js  
// Mục đích: Xử lý form ứng tuyển
// Người viết: Sinh viên thực tập

// Biến lưu ID công việc
var idCongViecUngTuyen = null;

// Khi trang load xong
window.onload = function() {
    console.log('Form ứng tuyển đã sẵn sàng!');
    
    // Lấy ID công việc từ URL
    idCongViecUngTuyen = layIDCongViec();
    
    if (idCongViecUngTuyen) {
        console.log('Ứng tuyển vào công việc ID: ' + idCongViecUngTuyen);
    }
    
    // Setup form
    khoiTaoForm();
};

// Lấy ID công việc từ URL
function layIDCongViec() {
    var url = window.location.search; // Lấy phần ?jobId=123
    
    if (url.indexOf('jobId=') >= 0) {
        var id = url.split('jobId=')[1];
        // Bỏ các tham số khác nếu có
        if (id.indexOf('&') >= 0) {
            id = id.split('&')[0];
        }
        return id;
    }
    
    return null;
}

// Khởi tạo form
function khoiTaoForm() {
    console.log('Đang setup form...');
    
    // Lấy form
    var form = document.getElementById('applicationForm');
    
    if (form) {
        // Khi submit form
        form.onsubmit = function(e) {
            e.preventDefault(); // Ngăn form submit mặc định
            xuLyGuiDon();
        };
    }
    
    // Setup upload CV
    var inputCV = document.getElementById('cvFile');
    if (inputCV) {
        inputCV.onchange = function() {
            xuLyChonFile(this);
        };
    }
}

// Xử lý khi chọn file CV
function xuLyChonFile(input) {
    var file = input.files[0];
    
    if (!file) {
        console.log('Chưa chọn file');
        return;
    }
    
    console.log('Đã chọn file: ' + file.name);
    console.log('Kích thước: ' + file.size + ' bytes');
    console.log('Loại file: ' + file.type);
    
    // Kiểm tra loại file
    var loaiFileHopLe = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    var hopLe = false;
    
    for (var i = 0; i < loaiFileHopLe.length; i++) {
        if (file.type == loaiFileHopLe[i]) {
            hopLe = true;
            break;
        }
    }
    
    if (!hopLe) {
        alert('Vui lòng chọn file PDF hoặc Word!');
        input.value = ''; // Xóa file đã chọn
        return;
    }
    
    // Kiểm tra kích thước (tối đa 5MB)
    var kichThuocToiDa = 5 * 1024 * 1024; // 5MB
    
    if (file.size > kichThuocToiDa) {
        alert('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB');
        input.value = '';
        return;
    }
    
    console.log('File hợp lệ!');
}

// Xử lý gửi đơn ứng tuyển
function xuLyGuiDon() {
    console.log('Đang xử lý gửi đơn...');
    
    // Lấy dữ liệu từ form
    var hoTen = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var sdt = document.getElementById('phone').value;
    var thuGioiThieu = document.getElementById('coverLetter').value;
    var fileCV = document.getElementById('cvFile').files[0];
    
    // Kiểm tra dữ liệu
    if (!hoTen || hoTen.trim() == '') {
        alert('Vui lòng nhập họ tên!');
        return;
    }
    
    if (!email || email.trim() == '') {
        alert('Vui lòng nhập email!');
        return;
    }
    
    // Kiểm tra email hợp lệ (đơn giản)
    if (email.indexOf('@') < 0) {
        alert('Email không hợp lệ!');
        return;
    }
    
    if (!sdt || sdt.trim() == '') {
        alert('Vui lòng nhập số điện thoại!');
        return;
    }
    
    if (!fileCV) {
        alert('Vui lòng chọn file CV!');
        return;
    }
    
    console.log('Dữ liệu hợp lệ, đang gửi...');
    console.log('Họ tên: ' + hoTen);
    console.log('Email: ' + email);
    console.log('SĐT: ' + sdt);
    console.log('File CV: ' + fileCV.name);
    
    // Tạo object đơn ứng tuyển
    var donUngTuyen = {
        idCongViec: idCongViecUngTuyen,
        hoTen: hoTen,
        email: email,
        sdt: sdt,
        thuGioiThieu: thuGioiThieu,
        tenFileCV: fileCV.name,
        ngayGui: layNgayGio(),
        trangThai: 'Đang chờ duyệt'
    };
    
    // Lưu vào localStorage (giả lập)
    luuDonUngTuyen(donUngTuyen);
    
    // Hiển thị loading
    var nutGui = document.querySelector('button[type="submit"]');
    var noiDungGoc = nutGui.innerHTML;
    nutGui.disabled = true;
    nutGui.innerHTML = 'Đang gửi...';
    
    // Giả lập gửi đơn (sau 2 giây)
    setTimeout(function() {
        nutGui.disabled = false;
        nutGui.innerHTML = noiDungGoc;
        
        alert('Đã gửi đơn ứng tuyển thành công!');
        console.log('Gửi đơn thành công!');
        
        // Chuyển về trang danh sách ứng tuyển
        window.location.href = 'my-applications.html';
    }, 2000);
}

// Lưu đơn ứng tuyển
function luuDonUngTuyen(don) {
    console.log('Lưu đơn ứng tuyển...');
    
    // Lấy danh sách đơn đã gửi
    var danhSachDon = localStorage.getItem('donUngTuyen');
    
    if (danhSachDon) {
        danhSachDon = JSON.parse(danhSachDon);
    } else {
        danhSachDon = [];
    }
    
    // Thêm đơn mới
    danhSachDon.push(don);
    
    // Lưu lại
    localStorage.setItem('donUngTuyen', JSON.stringify(danhSachDon));
    
    console.log('Đã lưu đơn ứng tuyển');
}

// Lấy ngày giờ hiện tại
function layNgayGio() {
    var ngay = new Date();
    return ngay.toLocaleString('vi-VN');
}

// Chọn CV từ danh sách
function chonCV(id) {
    console.log('Đã chọn CV ID: ' + id);
    
    // Bỏ chọn tất cả
    var tatCaOption = document.querySelectorAll('.cv-option');
    for (var i = 0; i < tatCaOption.length; i++) {
        tatCaOption[i].classList.remove('selected');
        var radio = tatCaOption[i].querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    }
    
    // Chọn CV hiện tại
    // Lưu ý: Trong thực tế cần tìm element chính xác hơn
    // Ở đây giả lập bằng cách tìm theo thứ tự
    if (tatCaOption[id-1]) {
        tatCaOption[id-1].classList.add('selected');
        var radio = tatCaOption[id-1].querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }
}

// Xem trước đơn ứng tuyển
function xemTruocDon() {
    console.log('Xem trước đơn ứng tuyển...');
    alert('Tính năng xem trước đang phát triển!');
}

console.log('File application-form.js đã load!');
