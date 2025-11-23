// File: job-detail.js
// Chức năng: Hiển thị chi tiết công việc
// Tác giả: Sinh viên thực tập

// Biến lưu thông tin công việc hiện tại
var congViecHienTai = null;

// Khi trang load
window.addEventListener('load', function() {
    console.log('Trang chi tiết công việc đã load!');
    
    // Lấy ID công việc từ URL
    var idCongViec = layIDTuURL();
    
    if (idCongViec) {
        console.log('ID công việc: ' + idCongViec);
        taiThongTinCongViec(idCongViec);
    } else {
        console.log('Không có ID công việc');
        alert('Không tìm thấy thông tin công việc!');
    }
});

// Lấy ID từ URL (ví dụ: job-detail.html?id=123)
function layIDTuURL() {
    // Lấy phần query string
    var url = window.location.href;
    var viTriDauHoi = url.indexOf('?');
    
    if (viTriDauHoi < 0) {
        return null; // Không có query string
    }
    
    var queryString = url.substring(viTriDauHoi + 1);
    
    // Tách các tham số
    var cacThamSo = queryString.split('&');
    
    for (var i = 0; i < cacThamSo.length; i++) {
        var thamSo = cacThamSo[i].split('=');
        var ten = thamSo[0];
        var giaTri = thamSo[1];
        
        if (ten == 'id') {
            return giaTri;
        }
    }
    
    return null;
}

// Tải thông tin công việc
function taiThongTinCongViec(id) {
    console.log('Đang tải thông tin công việc ID: ' + id);
    
    // Giả lập dữ liệu - sau này sẽ gọi API
    congViecHienTai = {
        id: id,
        tieuDe: 'Frontend Developer Intern',
        congTy: 'Tech Corp Vietnam',
        diaDiem: 'Hồ Chí Minh',
        mucLuong: '5-8 triệu',
        moTa: 'Chúng tôi đang tìm kiếm Frontend Developer Intern...',
        yeuCau: ['Biết HTML/CSS/JavaScript', 'Có kinh nghiệm với ReactJS', 'Làm việc nhóm tốt'],
        quyenLoi: ['Lương cạnh tranh', 'Môi trường trẻ trung', 'Cơ hội thăng tiến']
    };
    
    // Hiển thị thông tin
    hienThiThongTin();
}

// Hiển thị thông tin công việc
function hienThiThongTin() {
    if (!congViecHienTai) {
        console.log('Chưa có thông tin công việc');
        return;
    }
    
    console.log('Hiển thị thông tin: ' + congViecHienTai.tieuDe);
    
    // Cập nhật tiêu đề trang
    document.title = congViecHienTai.tieuDe + ' - JobHub';
    
    // Sau này sẽ cập nhật các phần tử HTML khác
}

// Ứng tuyển vào công việc
function ungTuyen() {
    console.log('Ứng tuyển vào công việc');
    
    if (!congViecHienTai) {
        alert('Không có thông tin công việc!');
        return;
    }
    
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí: ' + congViecHienTai.tieuDe + '?');
    
    if (xacNhan) {
        console.log('Đã xác nhận ứng tuyển');
        
        // Chuyển sang trang form ứng tuyển
        window.location.href = 'application-form.html?jobId=' + congViecHienTai.id;
    } else {
        console.log('Đã hủy ứng tuyển');
    }
}

// Lưu công việc
function luuCongViec() {
    console.log('Lưu công việc');
    
    if (!congViecHienTai) {
        alert('Không có thông tin công việc!');
        return;
    }
    
    // Lấy danh sách đã lưu
    var danhSachDaLuu = localStorage.getItem('congViecDaLuu');
    
    if (danhSachDaLuu) {
        danhSachDaLuu = JSON.parse(danhSachDaLuu);
    } else {
        danhSachDaLuu = [];
    }
    
    // Kiểm tra đã lưu chưa
    var daLuu = false;
    for (var i = 0; i < danhSachDaLuu.length; i++) {
        if (danhSachDaLuu[i] == congViecHienTai.id) {
            daLuu = true;
            break;
        }
    }
    
    if (daLuu) {
        alert('Bạn đã lưu công việc này rồi!');
    } else {
        // Thêm vào danh sách
        danhSachDaLuu.push(congViecHienTai.id);
        localStorage.setItem('congViecDaLuu', JSON.stringify(danhSachDaLuu));
        
        alert('Đã lưu công việc thành công!');
        console.log('Đã lưu công việc ID: ' + congViecHienTai.id);
    }
}

// Chia sẻ công việc
function chiaSeCongViec() {
    console.log('Chia sẻ công việc');
    
    // Lấy URL hiện tại
    var url = window.location.href;
    
    // Copy vào clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
            alert('Đã copy link công việc!');
        }).catch(function(loi) {
            console.log('Lỗi khi copy: ' + loi);
            alert('Không thể copy link. Vui lòng copy thủ công: ' + url);
        });
    } else {
        // Trình duyệt cũ không hỗ trợ clipboard API
        alert('Link công việc: ' + url);
    }
}

console.log('File job-detail.js đã load!');
