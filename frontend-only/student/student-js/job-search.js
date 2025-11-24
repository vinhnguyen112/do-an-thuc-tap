// File: job-search.js
// Chức năng: Tìm kiếm và lọc công việc (Tích hợp API)
// Tác giả: Sinh viên thực tập

// Biến toàn cục để lưu danh sách công việc
var danhSachCongViec = [];
var danhSachDaLoc = [];

// Khi trang load xong
window.onload = function() {
    console.log('Trang tìm kiếm đã sẵn sàng!');
    
    // Load dữ liệu công việc từ API
    taiDanhSachCongViec();
    
    // Setup sự kiện tìm kiếm
    setupTimKiem();
};

// Hàm tải danh sách công việc từ API
async function taiDanhSachCongViec() {
    console.log('Đang tải danh sách công việc từ server...');
    
    try {
        const response = await fetch('http://localhost:5000/api/public/jobs');
        
        if (!response.ok) {
            throw new Error('Không thể tải danh sách việc làm');
        }

        danhSachCongViec = await response.json();
        danhSachDaLoc = danhSachCongViec; // Ban đầu hiển thị tất cả
        console.log('Đã tải ' + danhSachCongViec.length + ' công việc');
        
        // Hiển thị ra giao diện (nếu có hàm hiển thị)
        hienThiKetQua();
        
    } catch (error) {
        console.error('Lỗi tải việc làm:', error);
        // Hiển thị thông báo lỗi
        const container = document.getElementById('jobsContainer');
        if (container) {
            container.innerHTML = '<div class="col-12 text-center text-danger"><p>Không thể tải danh sách việc làm. Vui lòng thử lại sau.</p></div>';
        }
    }
}

// Setup sự kiện tìm kiếm
function setupTimKiem() {
    var oTimKiem = document.getElementById('searchInput');
    
    if (oTimKiem) {
        // Khi người dùng gõ vào ô tìm kiếm
        oTimKiem.oninput = function() {
            var tuKhoa = this.value.toLowerCase();
            console.log('Đang tìm kiếm: ' + tuKhoa);
            
            // Lọc danh sách
            timKiemCongViec(tuKhoa);
        };
    }
}

// Hàm tìm kiếm công việc
function timKiemCongViec(tuKhoa) {
    console.log('Tìm kiếm với từ khóa: ' + tuKhoa);
    
    if (tuKhoa == '') {
        // Nếu không có từ khóa thì hiển thị tất cả
        danhSachDaLoc = danhSachCongViec;
    } else {
        // Lọc theo từ khóa
        danhSachDaLoc = danhSachCongViec.filter(congViec => {
            const tieuDe = congViec.tieuDe.toLowerCase();
            const congTy = congViec.tenCongTy.toLowerCase();
            return tieuDe.includes(tuKhoa) || congTy.includes(tuKhoa);
        });
    }
    
    console.log('Tìm thấy ' + danhSachDaLoc.length + ' kết quả');
    
    // Cập nhật giao diện
    hienThiKetQua();
}

// Hàm hiển thị kết quả
function hienThiKetQua() {
    console.log('Đang hiển thị ' + danhSachDaLoc.length + ' công việc');
    
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    if (danhSachDaLoc.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>Không tìm thấy công việc nào phù hợp.</p></div>';
        return;
    }
    
    let html = '';
    danhSachDaLoc.forEach(viecLam => {
        let htmlKyNang = "";
        if (viecLam.kyNang && Array.isArray(viecLam.kyNang)) {
            viecLam.kyNang.forEach(kn => {
                htmlKyNang += `<span class="tag-ky-nang">${kn}</span>`;
            });
        }
        
        html += `
        <div class="col-md-6 col-lg-4">
          <div class="the-viec-lam">
            <div class="dau-the-viec-lam">
              <div>
                <h4 class="tieu-de-viec-lam" title="${viecLam.tieuDe}">${viecLam.tieuDe}</h4>
                <div class="ten-cong-ty">${viecLam.tenCongTy}</div>
              </div>
              <span class="nhan-loai-viec">${viecLam.loaiViec}</span>
            </div>
            <div class="thong-tin-viec-lam">
              <span><i class="bi bi-geo-alt me-1"></i>${viecLam.diaDiem || 'Toàn quốc'}</span>
              <span><i class="bi bi-cash me-1"></i>${viecLam.luong || 'Thỏa thuận'}</span>
            </div>
            <div class="the-kỹ-nang">
              ${htmlKyNang}
            </div>
            <div class="cuoi-the-viec-lam">
              <span class="ngay-dang"><i class="bi bi-clock me-1"></i>${viecLam.thoiGianDang}</span>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="luuCongViec(${viecLam.id})">
                    <i class="bi bi-heart"></i>
                </button>
                <a href="job-detail.html?id=${viecLam.id}" class="btn btn-sm btn-primary">Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Hàm lọc theo địa điểm
function locTheoDiaDiem(diaDiem) {
    console.log('Lọc theo địa điểm: ' + diaDiem);
    
    if (diaDiem == 'all') {
        danhSachDaLoc = danhSachCongViec;
    } else {
        danhSachDaLoc = danhSachCongViec.filter(cv => cv.diaDiem.includes(diaDiem));
    }
    
    hienThiKetQua();
}

// Hàm lưu công việc (Gọi API)
async function luuCongViec(idCongViec) {
    console.log('Lưu công việc ID: ' + idCongViec);
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const roleId = localStorage.getItem('roleId');
    
    if (!isLoggedIn || !roleId) {
        alert('Vui lòng đăng nhập để lưu công việc!');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:5000/api/student/saved-jobs/${roleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobId: idCongViec })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Đã lưu công việc thành công!');
        } else {
            alert(result.message || 'Công việc này đã được lưu rồi!');
        }
    } catch (error) {
        console.error('Lỗi lưu công việc:', error);
        alert('Không thể kết nối đến server');
    }
}

console.log('File job-search.js đã sẵn sàng!');
