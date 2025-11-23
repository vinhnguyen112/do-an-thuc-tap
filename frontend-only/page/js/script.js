/* JavaScript cho trang chủ - Hiển thị việc làm, công ty, tìm kiếm */

// Dữ liệu mẫu việc làm
// Hiển thị danh sách việc làm từ API
async function hienThiViecLam() {
  const khungChua = document.getElementById("jobsContainer");
  if (!khungChua) return;

  try {
    const response = await fetch('http://localhost:5000/api/public/jobs');
    const danhSachViecLam = await response.json();

    if (danhSachViecLam.length === 0) {
      khungChua.innerHTML = '<div class="col-12 text-center"><p>Chưa có tin tuyển dụng nào.</p></div>';
      return;
    }

    let html = "";
    for (let i = 0; i < danhSachViecLam.length; i++) {
      const viecLam = danhSachViecLam[i];
      let htmlKyNang = "";
      if (viecLam.kyNang && Array.isArray(viecLam.kyNang)) {
        for (let j = 0; j < viecLam.kyNang.length; j++) {
          htmlKyNang += `<span class="tag-ky-nang">${viecLam.kyNang[j]}</span>`;
        }
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
              <a href="dang-nhap.html" class="btn btn-sm btn-primary" onclick="alert('Vui lòng đăng nhập để xem chi tiết công việc!')">Xem chi tiết</a>
            </div>
          </div>
        </div>
      `;
    }
    khungChua.innerHTML = html;
  } catch (error) {
    console.error('Lỗi tải việc làm:', error);
    khungChua.innerHTML = '<div class="col-12 text-center text-danger"><p>Không thể tải danh sách việc làm. Vui lòng kiểm tra kết nối server.</p></div>';
  }
}

// Hiển thị danh sách công ty từ API
async function hienThiCongTy() {
  const khungChua = document.getElementById("companiesContainer");
  if (!khungChua) return;

  try {
    const response = await fetch('http://localhost:5000/api/public/companies');
    const danhSachCongTy = await response.json();

    if (danhSachCongTy.length === 0) {
      khungChua.innerHTML = '<div class="col-12 text-center"><p>Chưa có công ty nào.</p></div>';
      return;
    }

    let html = "";
    for (let i = 0; i < danhSachCongTy.length; i++) {
      const congTy = danhSachCongTy[i];
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="the-cong-ty">
            <h4 class="ten-cong-ty">${congTy.ten}</h4>
            <div class="nganh-nghe">${congTy.nganhNghe}</div>
            <div class="thong-tin-cong-ty">
              <div class="muc-thong-tin-cong-ty">
                <i class="bi bi-geo-alt"></i>
                <span>${congTy.diaDiem}</span>
              </div>
              <div class="muc-thong-tin-cong-ty">
                <i class="bi bi-people"></i>
                <span>${congTy.soNhanVien} nhân viên</span>
              </div>
            </div>
            <div class="vi-tri-tuyen">
              <span><strong>${congTy.soViTriTuyen}</strong> vị trí đang tuyển</span>
              <a href="dang-nhap.html" class="btn btn-sm btn-outline-primary" onclick="alert('Vui lòng đăng nhập để xem chi tiết công ty!')">Xem chi tiết</a>
            </div>
          </div>
        </div>
      `;
    }
    khungChua.innerHTML = html;
  } catch (error) {
    console.error('Lỗi tải công ty:', error);
    khungChua.innerHTML = '<div class="col-12 text-center text-danger"><p>Không thể tải danh sách công ty.</p></div>';
  }
}

// Xử lý tìm kiếm
function xuLyTimKiem() {
  const oTimKiem = document.getElementById("searchInput");
  const oDiaDiem = document.getElementById("locationSelect");
  const tuKhoa = oTimKiem.value.trim();
  const diaDiem = oDiaDiem.value;

  if (tuKhoa || diaDiem) {
    alert(`Đang tìm kiếm: "${tuKhoa}" tại "${diaDiem || "Tất cả địa điểm"}"`);
  } else {
    alert("Vui lòng nhập từ khóa hoặc chọn địa điểm");
  }
}

// Khởi động khi trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {
  const oTimKiem = document.getElementById("searchInput");
  if (oTimKiem) {
    oTimKiem.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        xuLyTimKiem();
      }
    });
  }

  hienThiViecLam();
  hienThiCongTy();

  // Cuộn mượt cho các link có dấu #
  const tatCaLink = document.querySelectorAll('a[href^="#"]');
  for (let i = 0; i < tatCaLink.length; i++) {
    tatCaLink[i].addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const mucTieu = document.querySelector(href);
        if (mucTieu) {
          mucTieu.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }
});

// Hiệu ứng menu khi cuộn
window.addEventListener("scroll", function () {
  const menu = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    menu.classList.add("scrolled");
  } else {
    menu.classList.remove("scrolled");
  }
});
