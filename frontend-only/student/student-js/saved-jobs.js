// File: saved-jobs.js
// Chức năng: Quản lý công việc đã lưu (Tích hợp API)
// Tác giả: Sinh viên thực tập

// Danh sách công việc đã lưu
var congViecDaLuu = [];

// Khi trang load
window.addEventListener('load', function() {
    console.log('Trang công việc đã lưu!');
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const roleId = localStorage.getItem('roleId');
    
    if (!isLoggedIn || !roleId) {
        alert('Vui lòng đăng nhập để xem công việc đã lưu!');
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Load danh sách
    taiCongViecDaLuu(roleId);
});

// Tải danh sách công việc đã lưu từ API
async function taiCongViecDaLuu(id) {
    console.log('Đang tải công việc đã lưu từ server...');
    
    try {
        const response = await fetch(`http://localhost:5000/api/student/saved-jobs/${id}`);
        
        if (!response.ok) {
            throw new Error('Không thể tải danh sách công việc');
        }

        congViecDaLuu = await response.json();
        console.log('Đã tải ' + congViecDaLuu.length + ' công việc');
        
        // Hiển thị
        hienThiCongViecDaLuu();
        
    } catch (error) {
        console.error('Lỗi tải công việc đã lưu:', error);
        // Nếu lỗi, hiển thị danh sách rỗng
        congViecDaLuu = [];
        hienThiCongViecDaLuu();
    }
}

// Hiển thị danh sách
function hienThiCongViecDaLuu() {
    console.log('Hiển thị ' + congViecDaLuu.length + ' công việc');
    
    var noiHienThi = document.getElementById('jobsContainer'); // Sửa lại ID cho khớp với saved-jobs.html (thường là jobsContainer hoặc danhSachCongViec)
    // Kiểm tra lại saved-jobs.html để chắc chắn ID. Trong code cũ là 'danhSachCongViec' nhưng trong HTML mẫu thường là 'jobsContainer'.
    // Tôi sẽ thử tìm cả 2
    if (!noiHienThi) noiHienThi = document.getElementById('danhSachCongViec');
    
    if (!noiHienThi) {
        console.log('Không tìm thấy nơi hiển thị');
        return;
    }
    
    // Xóa nội dung cũ
    noiHienThi.innerHTML = '';
    
    // Kiểm tra có công việc không
    if (congViecDaLuu.length == 0) {
        noiHienThi.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Bạn chưa lưu công việc nào</p></div>';
        return;
    }
    
    // Hiển thị từng công việc
    let html = '';
    for (var i = 0; i < congViecDaLuu.length; i++) {
        var cv = congViecDaLuu[i];
        
        html += `
        <div class="col-md-6 col-lg-4">
            <div class="the-viec-da-luu">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 class="mb-1">${cv.tieuDe}</h5>
                        <p class="text-muted mb-0">${cv.congTy}</p>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="boLuu(${cv.id})" title="Bỏ lưu">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="mb-3">
                    <p class="mb-1"><i class="bi bi-geo-alt me-2"></i>${cv.diaDiem}</p>
                    <p class="mb-1"><i class="bi bi-cash me-2"></i>${cv.mucLuong}</p>
                    <p class="mb-0 text-muted small"><i class="bi bi-clock me-2"></i>Đã lưu: ${cv.ngayLuu}</p>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" onclick="xemChiTiet(${cv.id})">Xem chi tiết</button>
                    <button class="btn btn-outline-primary" onclick="ungTuyenNhanh(${cv.id})">Ứng tuyển ngay</button>
                </div>
            </div>
        </div>
        `;
    }
    noiHienThi.innerHTML = html;
}

// Xem chi tiết công việc
function xemChiTiet(id) {
    window.location.href = 'job-detail.html?id=' + id;
}

// Bỏ lưu công việc
async function boLuu(jobId) {
    console.log('Bỏ lưu công việc ID: ' + jobId);
    
    var xacNhan = confirm('Bạn có chắc muốn bỏ lưu công việc này?');
    if (!xacNhan) return;
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    try {
        const response = await fetch(`http://localhost:5000/api/student/saved-jobs/${roleId}/${jobId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            alert('Đã bỏ lưu công việc!');
            // Load lại danh sách
            taiCongViecDaLuu(roleId);
        } else {
            alert(result.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        console.error('Lỗi bỏ lưu:', error);
        alert('Không thể kết nối đến server');
    }
}

// Ứng tuyển nhanh
function ungTuyenNhanh(id) {
    var xacNhan = confirm('Bạn có chắc muốn ứng tuyển vào vị trí này?');
    if (xacNhan) {
        window.location.href = 'application-form.html?jobId=' + id;
    }
}

console.log('File saved-jobs.js đã sẵn sàng!');
