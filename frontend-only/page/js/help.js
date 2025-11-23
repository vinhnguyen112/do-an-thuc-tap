// JavaScript cho trang hỗ trợ - Hiển thị FAQ, tìm kiếm, form liên hệ

// Dữ liệu FAQ
const danhSachFAQ = [
  {
    id: 1,
    cauHoi: "Làm thế nào để tạo tài khoản trên JobHub?",
    cauTraLoi:
      "Bạn có thể đăng ký tài khoản bằng cách nhấp vào nút 'Đăng ký' ở góc trên bên phải. Chọn loại tài khoản (Sinh viên hoặc Nhà tuyển dụng), điền thông tin cần thiết và xác thực email để hoàn tất.",
  },
  {
    id: 2,
    cauHoi: "Tôi có phải trả phí khi sử dụng JobHub không?",
    cauTraLoi:
      "Không, JobHub hoàn toàn miễn phí cho sinh viên. Bạn có thể tìm kiếm việc làm, tạo hồ sơ và ứng tuyển mà không mất bất kỳ chi phí nào.",
  },
  {
    id: 3,
    cauHoi: "Làm thế nào để tìm kiếm việc làm phù hợp?",
    cauTraLoi:
      "Sử dụng thanh tìm kiếm trên trang chủ hoặc trang Việc làm. Bạn có thể lọc theo vị trí, loại công việc, mức lương và các tiêu chí khác để tìm cơ hội phù hợp nhất.",
  },
  {
    id: 4,
    cauHoi: "Tôi cần chuẩn bị gì khi ứng tuyển?",
    cauTraLoi:
      "Hãy đảm bảo hồ sơ của bạn đã được hoàn thiện với thông tin học vấn, kỹ năng và kinh nghiệm (nếu có). Chuẩn bị CV và thư xin việc chuyên nghiệp. Đọc kỹ mô tả công việc để hiểu rõ yêu cầu.",
  },
  {
    id: 5,
    cauHoi: "Làm thế nào để lưu việc làm để xem sau?",
    cauTraLoi:
      "Nhấp vào biểu tượng dấu trang (bookmark) ở góc trên bên phải của mỗi thẻ việc làm. Các việc làm đã lưu sẽ được hiển thị trong trang 'Việc làm đã lưu' của bạn.",
  },
  {
    id: 6,
    cauHoi: "Tôi có thể theo dõi trạng thái ứng tuyển ở đâu?",
    cauTraLoi:
      "Truy cập trang Hồ sơ của bạn và chọn tab 'Ứng tuyển'. Tại đây bạn có thể xem tất cả các đơn ứng tuyển và trạng thái của chúng.",
  },
  {
    id: 7,
    cauHoi: "Làm thế nào để cập nhật thông tin hồ sơ?",
    cauTraLoi:
      "Vào trang Hồ sơ, nhấp nút 'Chỉnh sửa' để cập nhật thông tin cá nhân, học vấn, kỹ năng và kinh nghiệm làm việc.",
  },
  {
    id: 8,
    cauHoi: "Tôi quên mật khẩu, phải làm sao?",
    cauTraLoi:
      "Tại trang đăng nhập, nhấp vào 'Quên mật khẩu?'. Nhập email đã đăng ký và làm theo hướng dẫn trong email để đặt lại mật khẩu.",
  },
  {
    id: 9,
    cauHoi: "Làm thế nào để liên hệ với nhà tuyển dụng?",
    cauTraLoi:
      "Sau khi ứng tuyển, bạn có thể liên hệ với nhà tuyển dụng qua thông tin liên hệ được cung cấp trong mô tả công việc hoặc đợi họ liên hệ với bạn.",
  },
  {
    id: 10,
    cauHoi: "JobHub có hỗ trợ tạo CV không?",
    cauTraLoi:
      "Có, JobHub cung cấp công cụ tạo CV trực tuyến miễn phí. Bạn có thể truy cập trang Hồ sơ và sử dụng tính năng tạo CV để tạo một CV chuyên nghiệp.",
  },
];

// Hiển thị FAQ
function hienThiFAQ() {
  const khungChua = document.getElementById("faqAccordion");
  if (!khungChua) return;

  khungChua.innerHTML = danhSachFAQ
    .map(
      (faq, index) => `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button ${
                  index !== 0 ? "collapsed" : ""
                }" type="button" data-bs-toggle="collapse" data-bs-target="#faq${
        faq.id
      }">
                    <i class="bi bi-question-circle me-2 text-primary"></i>${
                      faq.cauHoi
                    }
                </button>
            </h2>
            <div id="faq${faq.id}" class="accordion-collapse collapse ${
        index === 0 ? "show" : ""
      }" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${faq.cauTraLoi}
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Tìm kiếm FAQ
function timKiemFAQ() {
  const oTimKiem = document.getElementById("faqSearch");
  const tuKhoa = oTimKiem.value.trim().toLowerCase();

  if (!tuKhoa) {
    hienThiFAQ();
    return;
  }

  const faqLoc = danhSachFAQ.filter(
    (faq) =>
      faq.cauHoi.toLowerCase().includes(tuKhoa) ||
      faq.cauTraLoi.toLowerCase().includes(tuKhoa)
  );

  const khungChua = document.getElementById("faqAccordion");
  if (!khungChua) return;

  if (faqLoc.length === 0) {
    khungChua.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-search display-1 text-muted mb-3"></i>
                <h4 class="text-muted">Không tìm thấy kết quả</h4>
                <p class="text-muted">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
        `;
  } else {
    khungChua.innerHTML = faqLoc
      .map(
        (faq, index) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }" type="button" data-bs-toggle="collapse" data-bs-target="#faq${
          faq.id
        }">
                        <i class="bi bi-question-circle me-2 text-primary"></i>${
                          faq.cauHoi
                        }
                    </button>
                </h2>
                <div id="faq${faq.id}" class="accordion-collapse collapse ${
          index === 0 ? "show" : ""
        }" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        ${faq.cauTraLoi}
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Xử lý form liên hệ
function xuLyLienHe(suKien) {
  suKien.preventDefault();

  const form = suKien.target;
  const duLieuForm = new FormData(form);

  const ten =
    duLieuForm.get("contactName") || document.getElementById("contactName").value;
  const email =
    duLieuForm.get("contactEmail") ||
    document.getElementById("contactEmail").value;
  const chuDe =
    duLieuForm.get("contactSubject") ||
    document.getElementById("contactSubject").value;
  const tinNhan =
    duLieuForm.get("contactMessage") ||
    document.getElementById("contactMessage").value;

  // Kiểm tra dữ liệu
  if (!ten || !email || !chuDe || !tinNhan) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  // Mô phỏng gửi dữ liệu
  console.log("Gửi tin nhắn...", { ten, email, chuDe, tinNhan });

  // Hiển thị trạng thái đang gửi
  const nutGui = form.querySelector('button[type="submit"]');
  const noiDungGoc = nutGui.innerHTML;
  nutGui.disabled = true;
  nutGui.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi...';

  // Mô phỏng delay
  setTimeout(() => {
    alert(
      "Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất. (Demo)"
    );

    // Reset form
    form.reset();
    nutGui.disabled = false;
    nutGui.innerHTML = noiDungGoc;
  }, 1500);
}

// Khởi tạo khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  hienThiFAQ();

  const oTimKiem = document.getElementById("faqSearch");
  if (oTimKiem) {
    oTimKiem.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        timKiemFAQ();
      }
    });
  }
});

// Giữ lại hàm cũ để tương thích
function renderFAQ() {
  hienThiFAQ();
}

function searchFAQ() {
  timKiemFAQ();
}

function handleContact(suKien) {
  xuLyLienHe(suKien);
}
