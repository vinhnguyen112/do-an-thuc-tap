// JavaScript cho trang blog - Hiển thị bài viết, tìm kiếm, lọc theo danh mục

// Dữ liệu bài viết
const danhSachBaiViet = [
  {
    id: "1",
    tieuDe: "10 Kỹ năng cần thiết để thành công trong phỏng vấn xin việc",
    tomTat:
      "Khám phá những kỹ năng quan trọng giúp bạn gây ấn tượng với nhà tuyển dụng và tăng cơ hội thành công trong buổi phỏng vấn...",
    danhMuc: "Hướng nghiệp",
    maDanhMuc: "career",
    ngayDang: "20/12/2024",
    thoiGianDoc: "5 phút đọc",
    anh: "assets/Student_job_interview_success_1bbbe4ab-CGEG4isa.png",
  },
  {
    id: "2",
    tieuDe: "Cách viết CV ấn tượng cho sinh viên mới ra trường",
    tomTat:
      "Hướng dẫn chi tiết cách tạo CV chuyên nghiệp và thu hút nhà tuyển dụng...",
    danhMuc: "CV & Hồ sơ",
    maDanhMuc: "cv",
    ngayDang: "18/12/2024",
    thoiGianDoc: "4 phút đọc",
    anh: "assets/Career_fair_networking_event_a36a70f1-NJ2r_s4t.png",
  },
  {
    id: "3",
    tieuDe: "Top 5 ngành nghề hot nhất cho sinh viên năm 2025",
    tomTat: "Phân tích xu hướng tuyển dụng và các ngành nghề có triển vọng...",
    danhMuc: "Xu hướng",
    maDanhMuc: "trend",
    ngayDang: "15/12/2024",
    thoiGianDoc: "6 phút đọc",
    anh: "assets/Professional_office_team_environment_a3b7ecb9-CFEj1VoR.png",
  },
  {
    id: "4",
    tieuDe: "Kinh nghiệm thực tập: Những điều sinh viên cần biết",
    tomTat: "Chia sẻ từ những sinh viên đã trải qua kỳ thực tập thành công...",
    danhMuc: "Thực tập",
    maDanhMuc: "internship",
    ngayDang: "12/12/2024",
    thoiGianDoc: "5 phút đọc",
    anh: "assets/Students_collaborating_on_campus_9760dec1-BNQb34qt.png",
  },
  {
    id: "5",
    tieuDe: "Làm thế nào để phát triển kỹ năng mềm trong môi trường học thuật",
    tomTat:
      "Các hoạt động và phương pháp giúp sinh viên rèn luyện soft skills...",
    danhMuc: "Kỹ năng",
    maDanhMuc: "skills",
    ngayDang: "10/12/2024",
    thoiGianDoc: "7 phút đọc",
    anh: "assets/Student_job_interview_success_1bbbe4ab-CGEG4isa.png",
  },
  {
    id: "6",
    tieuDe: "Cách xây dựng mạng lưới quan hệ nghề nghiệp hiệu quả",
    tomTat:
      "Networking là chìa khóa thành công trong sự nghiệp. Tìm hiểu cách xây dựng mạng lưới quan hệ...",
    danhMuc: "Hướng nghiệp",
    maDanhMuc: "career",
    ngayDang: "8/12/2024",
    thoiGianDoc: "6 phút đọc",
    anh: "assets/Career_fair_networking_event_a36a70f1-NJ2r_s4t.png",
  },
];

let danhMucHienTai = "all";

// Hiển thị danh sách bài viết
function hienThiBaiViet() {
  const khungChua = document.getElementById("blogPostsContainer");
  if (!khungChua) return;

  let baiVietLoc = danhSachBaiViet;

  if (danhMucHienTai !== "all") {
    baiVietLoc = danhSachBaiViet.filter(
      (baiViet) => baiViet.maDanhMuc === danhMucHienTai
    );
  }

  khungChua.innerHTML = baiVietLoc
    .map(
      (baiViet) => `
        <div class="col-md-6 col-lg-4">
            <div class="card border-0 shadow h-100">
                <img src="${baiViet.anh}" class="card-img-top" alt="${baiViet.tieuDe}" style="height: 200px; object-fit: cover;" />
                <div class="card-body p-3">
                    <div class="d-flex gap-2 mb-2 flex-wrap">
                        <span class="badge bg-primary">${baiViet.danhMuc}</span>
                        <small class="text-muted"><i class="bi bi-calendar me-1"></i>${baiViet.ngayDang}</small>
                        <small class="text-muted"><i class="bi bi-clock me-1"></i>${baiViet.thoiGianDoc}</small>
                    </div>
                    <h5 class="card-title fw-bold mb-2">${baiViet.tieuDe}</h5>
                    <p class="card-text text-muted small">${baiViet.tomTat}</p>
                    <a href="#post-${baiViet.id}" class="btn btn-sm btn-outline-primary mt-auto">Đọc thêm <i class="bi bi-arrow-right ms-1"></i></a>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Lọc bài viết theo danh mục
function locBaiViet(danhMuc) {
  danhMucHienTai = danhMuc;
  hienThiBaiViet();
}

// Tìm kiếm bài viết
function timKiemBlog() {
  const oTimKiem = document.getElementById("blogSearch");
  const tuKhoa = oTimKiem.value.trim().toLowerCase();

  if (tuKhoa) {
    const baiVietLoc = danhSachBaiViet.filter(
      (baiViet) =>
        baiViet.tieuDe.toLowerCase().includes(tuKhoa) ||
        baiViet.tomTat.toLowerCase().includes(tuKhoa) ||
        baiViet.danhMuc.toLowerCase().includes(tuKhoa)
    );

    const khungChua = document.getElementById("blogPostsContainer");
    if (!khungChua) return;

    if (baiVietLoc.length === 0) {
      khungChua.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search display-1 text-muted mb-3"></i>
                    <h4 class="text-muted">Không tìm thấy kết quả</h4>
                    <p class="text-muted">Hãy thử tìm kiếm với từ khóa khác</p>
                </div>
            `;
    } else {
      khungChua.innerHTML = baiVietLoc
        .map(
          (baiViet) => `
                <div class="col-md-6 col-lg-4">
                    <div class="card border-0 shadow h-100">
                        <img src="${baiViet.anh}" class="card-img-top" alt="${baiViet.tieuDe}" style="height: 200px; object-fit: cover;" />
                        <div class="card-body p-3">
                            <div class="d-flex gap-2 mb-2 flex-wrap">
                                <span class="badge bg-primary">${baiViet.danhMuc}</span>
                                <small class="text-muted"><i class="bi bi-calendar me-1"></i>${baiViet.ngayDang}</small>
                                <small class="text-muted"><i class="bi bi-clock me-1"></i>${baiViet.thoiGianDoc}</small>
                            </div>
                            <h5 class="card-title fw-bold mb-2">${baiViet.tieuDe}</h5>
                            <p class="card-text text-muted small">${baiViet.tomTat}</p>
                            <a href="#post-${baiViet.id}" class="btn btn-sm btn-outline-primary mt-auto">Đọc thêm <i class="bi bi-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }
  } else {
    hienThiBaiViet();
  }
}

// Khởi tạo khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  const oTimKiem = document.getElementById("blogSearch");
  if (oTimKiem) {
    oTimKiem.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        timKiemBlog();
      }
    });
  }

  hienThiBaiViet();
});

// Giữ lại hàm cũ để tương thích
function renderBlogPosts() {
  hienThiBaiViet();
}

function filterPosts(danhMuc) {
  locBaiViet(danhMuc);
}

function searchBlog() {
  timKiemBlog();
}
