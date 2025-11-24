var congViecHienTai = null;

window.addEventListener('load', function() {
    console.log('Trang chi tiết công việc đã load!');
    
    var idCongViec = layIDTuURL();
    
    if (idCongViec) {
        console.log('ID công việc: ' + idCongViec);
        taiThongTinCongViec(idCongViec);
    } else {
        console.log('Không có ID công việc');
        alert('Không tìm thấy thông tin công việc!');
    }
});

function layIDTuURL() {
    var url = window.location.href;
    var viTriDauHoi = url.indexOf('?');
    
    if (viTriDauHoi < 0) {
        return null; 
    }
    
    var queryString = url.substring(viTriDauHoi + 1);
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

function taiThongTinCongViec(id) {
    console.log('Đang tải thông tin công việc ID: ' + id);
    
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
    
    hienThiThongTin();
}

function hienThiThongTin() {
    if (!congViecHienTai) {
        console.log('Chưa có thông tin công việc');
        return;
    }
    
    console.log('Hiển thị thông tin: ' + congViecHienTai.tieuDe);
    document.title = congViecHienTai.tieuDe + ' - JobHub';
}

function ungTuyen() {
    console.log('Ứng tuyển vào công việc');
    
    if (!congViecHienTai) {
        alert('Không có thông tin công việc!');
        return;
    }
    
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí: ' + congViecHienTai.tieuDe + '?');
    
    if (xacNhan) {
        console.log('Đã xác nhận ứng tuyển');
        window.location.href = 'application-form.html?jobId=' + congViecHienTai.id;
    } else {
        console.log('Đã hủy ứng tuyển');
    }
}

function luuCongViec() {
    console.log('Lưu công việc');
    
    if (!congViecHienTai) {
        alert('Không có thông tin công việc!');
        return;
    }
    
    var danhSachDaLuu = localStorage.getItem('congViecDaLuu');
    
    if (danhSachDaLuu) {
        danhSachDaLuu = JSON.parse(danhSachDaLuu);
    } else {
        danhSachDaLuu = [];
    }
    
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
        danhSachDaLuu.push(congViecHienTai.id);
        localStorage.setItem('congViecDaLuu', JSON.stringify(danhSachDaLuu));
        
        alert('Đã lưu công việc thành công!');
        console.log('Đã lưu công việc ID: ' + congViecHienTai.id);
    }
}

function chiaSeCongViec() {
    console.log('Chia sẻ công việc');
    var url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
            alert('Đã copy link công việc!');
        }).catch(function(loi) {
            console.log('Lỗi khi copy: ' + loi);
            alert('Không thể copy link. Vui lòng copy thủ công: ' + url);
        });
    } else {
        alert('Link công việc: ' + url);
    }
}

console.log('File job-detail.js đã load!');
