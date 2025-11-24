window.addEventListener('load', function() {
    console.log('Dashboard đã load!');
    hienThiChaoMung();
    capNhatThongKe();
});

function hienThiChaoMung() {
    var tenNguoiDung = 'Nguyễn Văn A'; 
    var gioHienTai = new Date().getHours();
    var loiChao = '';
    
    if (gioHienTai < 12) {
        loiChao = 'Chào buổi sáng';
    } else if (gioHienTai < 18) {
        loiChao = 'Chào buổi chiều';
    } else {
        loiChao = 'Chào buổi tối';
    }
    
    console.log(loiChao + ', ' + tenNguoiDung + '!');
}

function capNhatThongKe() {
    var soViecLamMoi = 15;
    var soDonUngTuyen = 8;
    var soThongBao = 3;
    
    console.log('Thống kê:');
    console.log('- Việc làm mới: ' + soViecLamMoi);
    console.log('- Đơn ứng tuyển: ' + soDonUngTuyen);
    console.log('- Thông báo: ' + soThongBao);
}

function xemChiTietCongViec(idCongViec) {
    console.log('Đang xem công việc ID: ' + idCongViec);
    window.location.href = 'job-detail.html?id=' + idCongViec;
}

function ungTuyenNhanh(idCongViec) {
    console.log('Ứng tuyển nhanh vào công việc ID: ' + idCongViec);
    
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí này?');
    
    if (xacNhan) {
        alert('Đã gửi đơn ứng tuyển thành công!');
        console.log('Đã ứng tuyển vào công việc ID: ' + idCongViec);
    } else {
        console.log('Đã hủy ứng tuyển');
    }
}

console.log('File student-dashboard.js đã load xong!');
