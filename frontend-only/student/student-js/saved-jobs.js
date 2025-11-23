// File: saved-jobs.js
// Chức năng: Quản lý công việc đã lưu
// Tác giả: Sinh viên thực tập

// Danh sách công việc đã lưu
var congViecDaLuu = [];

// Khi trang load
window.addEventListener('load', function() {
    console.log('Trang công việc đã lưu!');
    
    // Load danh sách
    taiCongViecDaLuu();
    
    // Hiển thị
    hienThiCongViecDaLuu();
});

// Tải danh sách công việc đã lưu
function taiCongViecDaLuu() {
    console.log('Đang tải công việc đã lưu...');
    
    // Lấy từ localStorage
    var danhSach = localStorage.getItem('congViecDaLuu');
    
    if (danhSach) {
        try {
            var danhSachID = JSON.parse(danhSach);
            console.log('Đã lưu ' + danhSachID.length + ' công việc');
            
            // Giả lập load chi tiết công việc
            // Thực tế sẽ gọi API để lấy thông tin chi tiết
            congViecDaLuu = [];
            
            for (var i = 0; i < danhSachID.length; i++) {
                var id = danhSachID[i];
                
                // Tạo dữ liệu mẫu
                var congViec = {
                    id: id,
                    tieuDe: 'Công việc #' + id,
                    congTy: 'Công ty ABC',
                    diaDiem: 'Hồ Chí Minh',
                    mucLuong: '10-15 triệu',
                    ngayLuu: '20/12/2024'
                };
                
                congViecDaLuu.push(congViec);
            }
        } catch (loi) {
            console.log('Lỗi khi parse: ' + loi);
            congViecDaLuu = [];
        }
    } else {
        console.log('Chưa có công việc nào được lưu');
        congViecDaLuu = [];
    }
}

// Hiển thị danh sách
function hienThiCongViecDaLuu() {
    console.log('Hiển thị ' + congViecDaLuu.length + ' công việc');
    
    var noiHienThi = document.getElementById('danhSachCongViec');
    
    if (!noiHienThi) {
        console.log('Không tìm thấy nơi hiển thị');
        return;
    }
    
    // Xóa nội dung cũ
    noiHienThi.innerHTML = '';
    
    // Kiểm tra có công việc không
    if (congViecDaLuu.length == 0) {
        noiHienThi.innerHTML = '<p class="text-center text-muted">Bạn chưa lưu công việc nào</p>';
        return;
    }
    
    // Hiển thị từng công việc
    for (var i = 0; i < congViecDaLuu.length; i++) {
        var cv = congViecDaLuu[i];
        
        var html = '<div class="job-item">';
        html += '<h5>' + cv.tieuDe + '</h5>';
        html += '<p>' + cv.congTy + ' - ' + cv.diaDiem + '</p>';
        html += '<p>Lương: ' + cv.mucLuong + '</p>';
        html += '<button onclick="xemChiTiet(' + cv.id + ')">Xem chi tiết</button>';
        html += '<button onclick="boLuu(' + cv.id + ')">Bỏ lưu</button>';
        html += '</div>';
        
        noiHienThi.innerHTML += html;
    }
}

// Xem chi tiết công việc
function xemChiTiet(id) {
    console.log('Xem chi tiết công việc ID: ' + id);
    window.location.href = 'job-detail.html?id=' + id;
}

// Bỏ lưu công việc
function boLuu(id) {
    console.log('Bỏ lưu công việc ID: ' + id);
    
    var xacNhan = confirm('Bạn có chắc muốn bỏ lưu công việc này?');
    
    if (!xacNhan) {
        return;
    }
    
    // Lấy danh sách ID từ localStorage
    var danhSachID = localStorage.getItem('congViecDaLuu');
    
    if (danhSachID) {
        danhSachID = JSON.parse(danhSachID);
        
        // Tìm và xóa ID
        var viTri = -1;
        
        for (var i = 0; i < danhSachID.length; i++) {
            if (danhSachID[i] == id) {
                viTri = i;
                break;
            }
        }
        
        if (viTri >= 0) {
            // Xóa khỏi mảng
            danhSachID.splice(viTri, 1);
            
            // Lưu lại
            localStorage.setItem('congViecDaLuu', JSON.stringify(danhSachID));
            
            console.log('Đã bỏ lưu');
            alert('Đã bỏ lưu công việc!');
            
            // Load lại danh sách
            taiCongViecDaLuu();
            hienThiCongViecDaLuu();
        }
    }
}

// Ứng tuyển nhanh
function ungTuyenNhanh(id) {
    console.log('Ứng tuyển nhanh vào công việc ID: ' + id);
    
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí này?');
    
    if (xacNhan) {
        window.location.href = 'application-form.html?jobId=' + id;
    }
}

// Xóa tất cả công việc đã lưu
function xoaTatCa() {
    console.log('Xóa tất cả công việc đã lưu');
    
    var xacNhan = confirm('Bạn có chắc muốn xóa TẤT CẢ công việc đã lưu?');
    
    if (!xacNhan) {
        return;
    }
    
    // Xóa khỏi localStorage
    localStorage.removeItem('congViecDaLuu');
    
    console.log('Đã xóa tất cả');
    alert('Đã xóa tất cả công việc đã lưu!');
    
    // Load lại
    taiCongViecDaLuu();
    hienThiCongViecDaLuu();
}

console.log('File saved-jobs.js đã sẵn sàng!');
