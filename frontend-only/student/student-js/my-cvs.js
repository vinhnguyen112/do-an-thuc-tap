// File: my-cvs.js
// Mục đích: Quản lý danh sách CV của sinh viên (Tích hợp API)

// Danh sách CV
var danhSachCV = [];

// Khi trang load xong
window.onload = function() {
    console.log('Trang quản lý CV đã load!');
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Load danh sách CV
    taiDanhSachCV();
};

// Hàm tải danh sách CV từ API
async function taiDanhSachCV() {
    console.log('Đang tải danh sách CV...');
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    try {
        const response = await fetch(`http://localhost:5000/api/cv/student/${roleId}`);
        const data = await response.json();
        
        if (response.ok) {
            // Map dữ liệu từ DB sang format hiển thị
            danhSachCV = data.map(cv => ({
                id: cv.CV_id,
                tieuDe: cv.TenCV,
                ngayTao: new Date(cv.NgayTaiLen).toLocaleDateString('vi-VN'),
                lanCapNhatCuoi: new Date(cv.NgayTaiLen).toLocaleDateString('vi-VN'),
                template: cv.Template || 'Modern',
                trangThai: cv.TrangThai || 'completed',
                duLieu: cv.DuLieuCV
            }));
            
            console.log('Đã tải ' + danhSachCV.length + ' CV từ server');
            hienThiDanhSachCV();
        } else {
            console.error('Lỗi tải CV:', data.message);
            // Nếu lỗi, hiển thị danh sách rỗng
            danhSachCV = [];
            hienThiDanhSachCV();
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        danhSachCV = [];
        hienThiDanhSachCV();
    }
}

// Hiển thị danh sách CV
function hienThiDanhSachCV() {
    console.log('Hiển thị ' + danhSachCV.length + ' CV');
    
    // Tìm các container
    var allContainer = document.getElementById('allCVsContainer');
    var completedContainer = document.getElementById('completedCVsContainer');
    var draftContainer = document.getElementById('draftCVsContainer');
    
    if (!allContainer || !completedContainer || !draftContainer) {
        console.log('Không tìm thấy container');
        return;
    }
    
    // Xóa nội dung cũ
    allContainer.innerHTML = '';
    completedContainer.innerHTML = '';
    draftContainer.innerHTML = '';
    
    // Kiểm tra nếu không có CV
    if (danhSachCV.length === 0) {
        var emptyHTML = '<div class="col-12 text-center py-5">' +
            '<i class="bi bi-file-earmark-text display-1 text-muted"></i>' +
            '<p class="text-muted mt-3">Chưa có CV nào. Hãy tạo CV đầu tiên của bạn!</p>' +
            '<a href="cv-builder.html" class="btn btn-primary">' +
            '<i class="bi bi-plus-circle me-2"></i>Tạo CV mới</a>' +
            '</div>';
        
        allContainer.innerHTML = emptyHTML;
        completedContainer.innerHTML = emptyHTML;
        draftContainer.innerHTML = emptyHTML;
        
        // Cập nhật stats
        capNhatThongKe();
        return;
    }
    
    // Duyệt qua từng CV và hiển thị
    for (var i = 0; i < danhSachCV.length; i++) {
        var cv = danhSachCV[i];
        
        // Tạo HTML cho CV card
        var htmlCV = '<div class="col-md-6 col-lg-4">' +
            '<div class="card h-100 shadow-sm hover-shadow">' +
            '<div class="card-body">' +
            '<div class="d-flex justify-content-between align-items-start mb-3">' +
            '<h5 class="card-title mb-0 text-truncate" title="' + cv.tieuDe + '">' + cv.tieuDe + '</h5>';
        
        // Badge trạng thái
        if (cv.trangThai === 'completed') {
            htmlCV += '<span class="badge bg-success">Hoàn thành</span>';
        } else {
            htmlCV += '<span class="badge bg-warning">Bản nháp</span>';
        }
        
        htmlCV += '</div>' +
            '<p class="text-muted small mb-2">' +
            '<i class="bi bi-calendar me-1"></i>Tạo: ' + cv.ngayTao +
            '</p>' +
            '<p class="text-muted small mb-2">' +
            '<i class="bi bi-clock me-1"></i>Cập nhật: ' + cv.lanCapNhatCuoi +
            '</p>' +
            '<p class="text-muted small mb-3">' +
            '<i class="bi bi-palette me-1"></i>Mẫu: ' + cv.template +
            '</p>' +
            '<div class="d-flex gap-2">' +
            '<button class="btn btn-sm btn-primary flex-fill" onclick="xemCV(' + cv.id + ')">' +
            '<i class="bi bi-eye me-1"></i>Xem' +
            '</button>' +
            '<button class="btn btn-sm btn-outline-primary" onclick="taiXuongCV(' + cv.id + ')">' +
            '<i class="bi bi-download"></i>' +
            '</button>' +
            '<button class="btn btn-sm btn-outline-secondary" onclick="saoChepCV(' + cv.id + ')">' +
            '<i class="bi bi-files"></i>' +
            '</button>' +
            '<button class="btn btn-sm btn-outline-danger" onclick="xoaCV(' + cv.id + ')">' +
            '<i class="bi bi-trash"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        
        // Thêm vào container tương ứng
        allContainer.innerHTML += htmlCV;
        
        if (cv.trangThai === 'completed') {
            completedContainer.innerHTML += htmlCV;
        } else {
            draftContainer.innerHTML += htmlCV;
        }
    }
    
    // Kiểm tra nếu tab completed hoặc draft trống
    if (completedContainer.innerHTML === '') {
        completedContainer.innerHTML = '<div class="col-12 text-center py-5">' +
            '<p class="text-muted">Chưa có CV hoàn thành nào.</p>' +
            '</div>';
    }
    
    if (draftContainer.innerHTML === '') {
        draftContainer.innerHTML = '<div class="col-12 text-center py-5">' +
            '<p class="text-muted">Chưa có bản nháp nào.</p>' +
            '</div>';
    }
    
    // Cập nhật thống kê
    capNhatThongKe();
}

// Hàm cập nhật thống kê
function capNhatThongKe() {
    var tongCV = danhSachCV.length;
    var cvHoanThanh = 0;
    var cvBanNhap = 0;
    
    for (var i = 0; i < danhSachCV.length; i++) {
        if (danhSachCV[i].trangThai === 'completed') {
            cvHoanThanh++;
        } else {
            cvBanNhap++;
        }
    }
    
    // Cập nhật các số liệu
    var totalElement = document.getElementById('totalCVs');
    var completedElement = document.getElementById('completedCVs');
    var draftElement = document.getElementById('draftCVs');
    
    if (totalElement) totalElement.innerText = tongCV;
    if (completedElement) completedElement.innerText = cvHoanThanh;
    if (draftElement) draftElement.innerText = cvBanNhap;
}

// Xem chi tiết CV
function xemCV(idCV) {
    window.location.href = 'cv-builder.html?id=' + idCV;
}

// Xóa CV
async function xoaCV(idCV) {
    if (!confirm('Bạn có chắc muốn xóa CV này không?')) return;
    
    try {
        const response = await fetch(`http://localhost:5000/api/cv/${idCV}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Đã xóa CV thành công!');
            taiDanhSachCV(); // Tải lại danh sách
        } else {
            alert('Lỗi khi xóa CV');
        }
    } catch (error) {
        console.error('Lỗi xóa CV:', error);
        alert('Không thể kết nối đến server');
    }
}

// Tải xuống CV
function taiXuongCV(idCV) {
    alert('Tính năng tải xuống đang được phát triển!');
}

// Sao chép CV
async function saoChepCV(idCV) {
    // Tìm CV gốc
    const cvGoc = danhSachCV.find(cv => cv.id === idCV);
    if (!cvGoc) return;
    
    const roleId = localStorage.getItem('roleId');
    
    // Parse dữ liệu JSON nếu cần
    let duLieu = cvGoc.duLieu;
    if (typeof duLieu === 'string') {
        try {
            duLieu = JSON.parse(duLieu);
        } catch (e) {
            duLieu = {};
        }
    }

    const payload = {
        sinhVienId: roleId,
        tenCV: cvGoc.tieuDe + ' (Bản sao)',
        template: cvGoc.template,
        trangThai: cvGoc.trangThai,
        duLieuCV: duLieu
    };

    try {
        const response = await fetch('http://localhost:5000/api/cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Đã sao chép CV thành công!');
            taiDanhSachCV();
        } else {
            alert('Lỗi khi sao chép CV');
        }
    } catch (error) {
        console.error('Lỗi sao chép CV:', error);
        alert('Không thể kết nối đến server');
    }
}

console.log('File my-cvs.js đã sẵn sàng!');
