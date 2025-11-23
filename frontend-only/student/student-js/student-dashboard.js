// File: student-dashboard.js
// Mục đích: Xử lý các chức năng trên trang dashboard của sinh viên
// Người viết: Sinh viên thực tập

// Đợi trang load xong
window.addEventListener('load', function() {
    console.log('Dashboard đã load!');
    
    // Hiển thị thông báo chào mừng
    hienThiChaoMung();
    
    // Cập nhật thống kê
    capNhatThongKe();
});

// Hàm hiển thị lời chào
function hienThiChaoMung() {
    var tenNguoiDung = 'Nguyễn Văn A'; // Tạm thời hardcode, sau sẽ lấy từ backend
    var gioHienTai = new Date().getHours();
    var loiChao = '';
    
    // Kiểm tra thời gian để chào phù hợp
    if (gioHienTai < 12) {
        loiChao = 'Chào buổi sáng';
    } else if (gioHienTai < 18) {
        loiChao = 'Chào buổi chiều';
    } else {
        loiChao = 'Chào buổi tối';
    }
    
    console.log(loiChao + ', ' + tenNguoiDung + '!');
}

// Hàm cập nhật thống kê
function capNhatThongKe() {
    // Giả lập dữ liệu thống kê
    var soViecLamMoi = 15;
    var soDonUngTuyen = 8;
    var soThongBao = 3;
    
    console.log('Thống kê:');
    console.log('- Việc làm mới: ' + soViecLamMoi);
    console.log('- Đơn ứng tuyển: ' + soDonUngTuyen);
    console.log('- Thông báo: ' + soThongBao);
    
    // Sau này sẽ cập nhật lên giao diện
}

// Hàm xem chi tiết công việc
function xemChiTietCongViec(idCongViec) {
    console.log('Đang xem công việc ID: ' + idCongViec);
    // Chuyển sang trang chi tiết
    window.location.href = 'job-detail.html?id=' + idCongViec;
}

// Hàm ứng tuyển nhanh
function ungTuyenNhanh(idCongViec) {
    console.log('Ứng tuyển nhanh vào công việc ID: ' + idCongViec);
    
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí này?');
    
    if (xacNhan) {
        // Giả lập gửi đơn ứng tuyển
        alert('Đã gửi đơn ứng tuyển thành công!');
        console.log('Đã ứng tuyển vào công việc ID: ' + idCongViec);
    } else {
        console.log('Đã hủy ứng tuyển');
    }
}

console.log('File student-dashboard.js đã load xong!');
