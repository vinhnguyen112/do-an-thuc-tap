/* JavaScript cho trang chủ - Hiển thị việc làm, công ty, tìm kiếm */

// Dữ liệu mẫu việc làm
const danhSachViecLam = [
  {
    id: "1",
    tieuDe: "Frontend Developer Intern",
    tenCongTy: "Tech Corp Vietnam",
    diaDiem: "Hà Nội",
    loaiViec: "Thực tập",
    luong: "5-8 triệu",
    thoiGianDang: "2 ngày trước",
    kyNang: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "2",
    tieuDe: "Marketing Assistant",
    tenCongTy: "Digital Agency VN",
    diaDiem: "TP.HCM",
    loaiViec: "Part-time",
    luong: "6-10 triệu",
    thoiGianDang: "1 ngày trước",
    kyNang: ["Social Media", "Content", "SEO"],
  },
  {
    id: "3",
    tieuDe: "Data Analyst Intern",
    tenCongTy: "FinTech Solutions",
    diaDiem: "Đà Nẵng",
    loaiViec: "Thực tập",
    luong: "7-9 triệu",
    thoiGianDang: "3 ngày trước",
    kyNang: ["Python", "Excel", "SQL"],
  },
  {
    id: "4",
    tieuDe: "UX/UI Designer Intern",
    tenCongTy: "Creative Studio",
    diaDiem: "TP.HCM",
    loaiViec: "Thực tập",
    luong: "6-9 triệu",
    thoiGianDang: "4 ngày trước",
    kyNang: ["Figma", "Adobe XD", "Design"],
  },
  {
    id: "5",
    tieuDe: "Content Writer",
    tenCongTy: "Media Group",
    diaDiem: "Hà Nội",
    loaiViec: "Part-time",
    luong: "5-7 triệu",
    thoiGianDang: "5 ngày trước",
    kyNang: ["Writing", "SEO", "Content"],
  },
  {
    id: "6",
    tieuDe: "Backend Developer Intern",
    tenCongTy: "Tech Startup",
    diaDiem: "Đà Nẵng",
    loaiViec: "Thực tập",
    luong: "7-10 triệu",
    thoiGianDang: "1 ngày trước",
    kyNang: ["Node.js", "Python", "API"],
  },
];

// Dữ liệu mẫu công ty
const danhSachCongTy = [
  {
    id: "1",
    ten: "TechViet Solutions",
    nganhNghe: "Công nghệ thông tin",
    diaDiem: "TP.HCM",
    soNhanVien: "100-500",
    soViTriTuyen: 12,
  },
  {
    id: "2",
    ten: "VN Digital Group",
    nganhNghe: "Marketing & Media",
    diaDiem: "Hà Nội",
    soNhanVien: "50-100",
    soViTriTuyen: 8,
  },
  {
    id: "3",
    ten: "StartupHub Vietnam",
    nganhNghe: "Đa ngành",
    diaDiem: "Đà Nẵng",
    soNhanVien: "20-50",
    soViTriTuyen: 15,
  },
  {
    id: "4",
    ten: "Innovation Lab",
    nganhNghe: "Công nghệ thông tin",
    diaDiem: "TP.HCM",
    soNhanVien: "50-100",
    soViTriTuyen: 10,
  },
  {
    id: "5",
    ten: "Creative Agency",
    nganhNghe: "Marketing & Media",
    diaDiem: "Hà Nội",
    soNhanVien: "20-50",
    soViTriTuyen: 6,
  },
  {
    id: "6",
    ten: "FinTech Vietnam",
    nganhNghe: "Tài chính",
    diaDiem: "TP.HCM",
    soNhanVien: "100-500",
    soViTriTuyen: 20,
  },
];

// Hiển thị danh sách việc làm
function hienThiViecLam() {
  const khungChua = document.getElementById("jobsContainer");
  if (!khungChua) return;

  let html = "";
  for (let i = 0; i < danhSachViecLam.length; i++) {
    const viecLam = danhSachViecLam[i];
    let htmlKyNang = "";
    for (let j = 0; j < viecLam.kyNang.length; j++) {
      htmlKyNang += `<span class="tag-ky-nang">${viecLam.kyNang[j]}</span>`;
    }
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="the-viec-lam">
          <div class="dau-the-viec-lam">
            <div>
              <h4 class="tieu-de-viec-lam">${viecLam.tieuDe}</h4>
              <div class="ten-cong-ty">${viecLam.tenCongTy}</div>
            </div>
            <span class="nhan-loai-viec">${viecLam.loaiViec}</span>
          </div>
          <div class="thong-tin-viec-lam">
            <span><i class="bi bi-geo-alt me-1"></i>${viecLam.diaDiem}</span>
            <span><i class="bi bi-cash me-1"></i>${viecLam.luong}</span>
          </div>
          <div class="the-kỹ-nang">
            ${htmlKyNang}
          </div>
          <div class="cuoi-the-viec-lam">
            <span class="ngay-dang"><i class="bi bi-clock me-1"></i>${viecLam.thoiGianDang}</span>
            <a href="../student/job-detail.html?id=${viecLam.id}" class="btn btn-sm btn-primary" target="_blank">Xem chi tiết</a>
          </div>
        </div>
      </div>
    `;
  }
  khungChua.innerHTML = html;
}

// Hiển thị danh sách công ty
function hienThiCongTy() {
  const khungChua = document.getElementById("companiesContainer");
  if (!khungChua) return;

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
            <a href="../employer/employer-profile.html?id=${congTy.id}" class="btn btn-sm btn-outline-primary" target="_blank">Xem chi tiết</a>
          </div>
        </div>
      </div>
    `;
  }
  khungChua.innerHTML = html;
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
