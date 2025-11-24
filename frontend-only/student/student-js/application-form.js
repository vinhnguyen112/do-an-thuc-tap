// File: application-form.js  
// Mục đích: Xử lý form ứng tuyển (Tích hợp API)
// Người viết: Sinh viên thực tập

// Biến lưu ID công việc
var idCongViecUngTuyen = null;

// Khi trang load xong
window.onload = function() {
    console.log('Form ứng tuyển đã sẵn sàng!');
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const roleId = localStorage.getItem('roleId');
    
    if (!isLoggedIn || !roleId) {
        alert('Vui lòng đăng nhập để ứng tuyển!');
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Lấy ID công việc từ URL
    idCongViecUngTuyen = layIDCongViec();
    
    if (idCongViecUngTuyen) {
        console.log('Ứng tuyển vào công việc ID: ' + idCongViecUngTuyen);
    } else {
        alert('Không tìm thấy công việc để ứng tuyển!');
        window.history.back();
        return;
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
async function xuLyGuiDon() {
    console.log('Đang xử lý gửi đơn...');
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    // Lấy dữ liệu từ form
    var hoTen = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var sdt = document.getElementById('phone').value;
    var thuGioiThieu = document.getElementById('coverLetter').value;
    var fileCV = document.getElementById('cvFile').files[0];
    
    // Kiểm tra dữ liệu
    if (!hoTen || hoTen.trim() == '') { alert('Vui lòng nhập họ tên!'); return; }
    if (!email || email.trim() == '') { alert('Vui lòng nhập email!'); return; }
    if (!sdt || sdt.trim() == '') { alert('Vui lòng nhập số điện thoại!'); return; }
    if (!fileCV) { alert('Vui lòng chọn file CV!'); return; }
    
    // Hiển thị loading
    var nutGui = document.querySelector('button[type="submit"]');
    var noiDungGoc = nutGui.innerHTML;
    nutGui.disabled = true;
    nutGui.innerHTML = 'Đang gửi...';
    
    try {
        // Gọi API ứng tuyển
        const response = await fetch(`http://localhost:5000/api/student/apply/${roleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobId: idCongViecUngTuyen,
                thuGioiThieu: thuGioiThieu,
                tenFileCV: fileCV.name // Tạm thời chỉ gửi tên file, chưa upload file thật
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Đã gửi đơn ứng tuyển thành công!');
            // Chuyển về trang danh sách ứng tuyển (nếu có) hoặc trang chủ
            // window.location.href = 'my-applications.html'; // Tạm thời chưa có trang này
            window.location.href = 'job-search.html';
        } else {
            alert(result.message || 'Có lỗi khi gửi đơn ứng tuyển');
        }
    } catch (error) {
        console.error('Lỗi gửi đơn:', error);
        alert('Không thể kết nối đến server');
    } finally {
        nutGui.disabled = false;
        nutGui.innerHTML = noiDungGoc;
    }
}

console.log('File application-form.js đã load!');
