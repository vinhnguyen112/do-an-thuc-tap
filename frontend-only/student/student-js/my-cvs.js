// File: my-cvs.js
// Mục đích: Quản lý danh sách CV của sinh viên
// Người viết: Sinh viên thực tập

// Danh sách CV (giả lập)
var danhSachCV = [];

// Khi trang load xong
window.onload = function() {
    console.log('Trang quản lý CV đã load!');
    
    // Load danh sách CV
    taiDanhSachCV();
    
    // Hiển thị CV
    hienThiDanhSachCV();
};

// Hàm tải danh sách CV
function taiDanhSachCV() {
    console.log('Đang tải danh sách CV...');
    
    // Thử lấy từ localStorage
    var cvTrongLocalStorage = localStorage.getItem('danhSachCV');
    
    if (cvTrongLocalStorage) {
        try {
            danhSachCV = JSON.parse(cvTrongLocalStorage);
            console.log('Đã tải ' + danhSachCV.length + ' CV từ localStorage');
        } catch (loi) {
            console.log('Lỗi khi parse CV: ' + loi);
            danhSachCV = taoDataMau();
        }
    } else {
        // Nếu chưa có thì tạo data mẫu
        danhSachCV = taoDataMau();
    }
}

// Tạo dữ liệu mẫu
function taoDataMau() {
    console.log('Tạo dữ liệu CV mẫu...');
    
    return [
        {
            id: 1,
            tieuDe: 'CV Frontend Developer',
            ngayTao: '15/12/2024',
            lanCapNhatCuoi: '18/12/2024',
            template: 'Modern'
        },
        {
            id: 2,
            tieuDe: 'CV ReactJS Developer',
            ngayTao: '10/12/2024',
            lanCapNhatCuoi: '10/12/2024',
            template: 'Professional'
        }
    ];
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
            '<h5 class="card-title mb-0">' + cv.tieuDe + '</h5>';
        
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
    console.log('Xem CV ID: ' + idCV);
    
    // Tìm CV trong danh sách
    var cvCanXem = null;
    
    for (var i = 0; i < danhSachCV.length; i++) {
        if (danhSachCV[i].id == idCV) {
            cvCanXem = danhSachCV[i];
            break;
        }
    }
    
    if (cvCanXem) {
        console.log('Tìm thấy CV: ' + cvCanXem.tieuDe);
        // Chuyển sang trang xem CV
        window.location.href = 'cv-builder.html?id=' + idCV;
    } else {
        console.log('Không tìm thấy CV');
        alert('Không tìm thấy CV!');
    }
}

// Xóa CV
function xoaCV(idCV) {
    console.log('Xóa CV ID: ' + idCV);
    
    // Hỏi xác nhận
    var xacNhan = confirm('Bạn có chắc muốn xóa CV này không?');
    
    if (!xacNhan) {
        console.log('Đã hủy xóa');
        return;
    }
    
    // Tìm và xóa CV
    var viTriCV = -1;
    
    for (var i = 0; i < danhSachCV.length; i++) {
        if (danhSachCV[i].id == idCV) {
            viTriCV = i;
            break;
        }
    }
    
    if (viTriCV >= 0) {
        // Xóa khỏi mảng
        danhSachCV.splice(viTriCV, 1);
        
        // Lưu lại vào localStorage
        localStorage.setItem('danhSachCV', JSON.stringify(danhSachCV));
        
        console.log('Đã xóa CV');
        alert('Đã xóa CV thành công!');
        
        // Hiển thị lại danh sách
        hienThiDanhSachCV();
    } else {
        console.log('Không tìm thấy CV để xóa');
        alert('Không tìm thấy CV!');
    }
}

// Tải xuống CV
function taiXuongCV(idCV) {
    console.log('Tải xuống CV ID: ' + idCV);
    alert('Tính năng tải xuống đang được phát triển!');
}

// Sao chép CV
function saoChepCV(idCV) {
    console.log('Sao chép CV ID: ' + idCV);
    
    // Tìm CV gốc
    var cvGoc = null;
    
    for (var i = 0; i < danhSachCV.length; i++) {
        if (danhSachCV[i].id == idCV) {
            cvGoc = danhSachCV[i];
            break;
        }
    }
    
    if (cvGoc) {
        // Tạo CV mới (sao chép)
        var cvMoi = {
            id: Date.now(), // Dùng timestamp làm ID mới
            tieuDe: cvGoc.tieuDe + ' (Bản sao)',
            ngayTao: layNgayHienTai(),
            lanCapNhatCuoi: layNgayHienTai(),
            template: cvGoc.template,
            trangThai: cvGoc.trangThai,
            duLieu: cvGoc.duLieu ? JSON.parse(JSON.stringify(cvGoc.duLieu)) : {} // Deep copy
        };
        
        // Thêm vào danh sách
        danhSachCV.unshift(cvMoi); // Thêm vào đầu danh sách
        
        // Lưu lại
        localStorage.setItem('danhSachCV', JSON.stringify(danhSachCV));
        
        console.log('Đã sao chép CV');
        alert('Đã sao chép CV thành công!');
        
        // Hiển thị lại
        hienThiDanhSachCV();
    } else {
        alert('Không tìm thấy CV để sao chép!');
    }
}

// Lấy ngày hiện tại (định dạng dd/mm/yyyy)
function layNgayHienTai() {
    var ngay = new Date();
    var ngayTrongThang = ngay.getDate();
    var thang = ngay.getMonth() + 1; // Tháng bắt đầu từ 0
    var nam = ngay.getFullYear();
    
    // Thêm số 0 phía trước nếu < 10
    if (ngayTrongThang < 10) {
        ngayTrongThang = '0' + ngayTrongThang;
    }
    if (thang < 10) {
        thang = '0' + thang;
    }
    
    return ngayTrongThang + '/' + thang + '/' + nam;
}

console.log('File my-cvs.js đã sẵn sàng!');
