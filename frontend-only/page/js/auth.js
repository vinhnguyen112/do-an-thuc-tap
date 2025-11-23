/* JavaScript cho trang đăng nhập/đăng ký */

// Hiện/ẩn mật khẩu
function chuyenDoiHienMatKhau(idInput = "password", idIcon = "togglePasswordIcon") {
  const oNhap = document.getElementById(idInput);
  const icon = document.getElementById(idIcon);
  if (oNhap.type === "password") {
    oNhap.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    oNhap.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}

// Kiểm tra độ mạnh mật khẩu
function kiemTraDoManhMatKhau() {
  const matKhau = document.getElementById("password").value;
  const khungHienThi = document.getElementById("passwordStrength");
  if (!khungHienThi) return;

  if (matKhau.length === 0) {
    khungHienThi.textContent = "";
    khungHienThi.className = "password-strength";
    return;
  }

  let soTieuChi = 0;
  let thongBao = "";

  if (matKhau.length >= 8) soTieuChi++;
  else thongBao = "Mật khẩu phải có ít nhất 8 ký tự. ";

  if (/[a-z]/.test(matKhau)) soTieuChi++;
  else thongBao += "Thiếu chữ thường. ";

  if (/[A-Z]/.test(matKhau)) soTieuChi++;
  else thongBao += "Thiếu chữ hoa. ";

  if (/[0-9]/.test(matKhau)) soTieuChi++;
  else thongBao += "Thiếu số. ";

  if (/[^a-zA-Z0-9]/.test(matKhau)) soTieuChi++;
  else thongBao += "Thiếu ký tự đặc biệt. ";

  if (soTieuChi <= 2) {
    khungHienThi.textContent = "Mật khẩu yếu. " + thongBao.trim();
    khungHienThi.className = "password-strength weak";
  } else if (soTieuChi === 3) {
    khungHienThi.textContent = "Mật khẩu trung bình. " + thongBao.trim();
    khungHienThi.className = "password-strength medium";
  } else if (soTieuChi >= 4) {
    khungHienThi.textContent = "Mật khẩu mạnh ✓";
    khungHienThi.className = "password-strength strong";
  }
}

// Kiểm tra mật khẩu khớp
function kiemTraMatKhauKhop() {
  const matKhau = document.getElementById("password").value;
  const xacNhanMatKhau = document.getElementById("confirmPassword").value;
  const khungHienThi = document.getElementById("passwordMatch");
  if (!khungHienThi) return;

  if (xacNhanMatKhau.length === 0) {
    khungHienThi.textContent = "";
    khungHienThi.className = "password-strength";
    return;
  }

  if (matKhau === xacNhanMatKhau) {
    khungHienThi.textContent = "Mật khẩu khớp ✓";
    khungHienThi.className = "password-strength strong";
  } else {
    khungHienThi.textContent = "Mật khẩu không khớp";
    khungHienThi.className = "password-strength weak";
  }
}

// Xử lý đăng nhập
async function xuLyDangNhap(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get("email");
  const matKhau = formData.get("password");
  const ghiNho = document.getElementById("remember").checked;

  if (!email || !matKhau) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  console.log("Đang đăng nhập...", { email });

  const nutSubmit = form.querySelector('button[type="submit"]');
  const noiDungGoc = nutSubmit.innerHTML;
  nutSubmit.disabled = true;
  nutSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang đăng nhập...';

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: matKhau
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Lưu thông tin user vào localStorage
      localStorage.setItem('userType', data.user.role);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('roleId', data.user.roleId); // SinhVien_id hoặc NhaTuyenDung_id
      localStorage.setItem('isLoggedIn', 'true');
      
      if (ghiNho) {
        localStorage.setItem('rememberedEmail', email);
      }

      alert(`Đăng nhập thành công! Chào mừng ${data.user.name}!`);
      
      // Chuyển hướng dựa trên role
      if (data.user.role === 'student') {
        window.location.href = "../student/student-home.html";
      } else {
        window.location.href = "../employer/employer-home.html";
      }
    } else {
      alert(data.message || 'Đăng nhập thất bại');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Không thể kết nối đến server. Vui lòng kiểm tra lại backend.');
  } finally {
    nutSubmit.disabled = false;
    nutSubmit.innerHTML = noiDungGoc;
  }
}

// Xử lý đăng ký
async function xuLyDangKy(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const hoTen = formData.get("fullName");
  const email = formData.get("email");
  const soDienThoai = formData.get("phone");
  const loaiNguoiDung = formData.get("userType");
  const matKhau = formData.get("password");
  const xacNhanMatKhau = formData.get("confirmPassword");
  const dongYDieuKhoan = document.getElementById("terms").checked;

  if (!hoTen || !email || !soDienThoai || !loaiNguoiDung || !matKhau || !xacNhanMatKhau) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  if (!dongYDieuKhoan) {
    alert("Vui lòng đồng ý với điều khoản sử dụng");
    return;
  }

  if (matKhau !== xacNhanMatKhau) {
    alert("Mật khẩu không khớp");
    return;
  }

  if (matKhau.length < 8) {
    alert("Mật khẩu phải có ít nhất 8 ký tự");
    return;
  }

  console.log("Đang đăng ký...", { hoTen, email, loaiNguoiDung });

  const nutSubmit = form.querySelector('button[type="submit"]');
  const noiDungGoc = nutSubmit.innerHTML;
  nutSubmit.disabled = true;
  nutSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang đăng ký...';

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: hoTen,
        email: email,
        password: matKhau,
        role: loaiNguoiDung,
        phone: soDienThoai
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
      window.location.href = "dang-nhap.html";
    } else {
      alert(data.message || 'Đăng ký thất bại');
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('Không thể kết nối đến server. Vui lòng kiểm tra lại backend.');
  } finally {
    nutSubmit.disabled = false;
    nutSubmit.innerHTML = noiDungGoc;
  }
}

// Tự động định dạng số điện thoại
document.addEventListener("DOMContentLoaded", function () {
  const oSoDienThoai = document.getElementById("phone");
  if (oSoDienThoai) {
    oSoDienThoai.addEventListener("input", function (e) {
      let giaTri = e.target.value.replace(/\D/g, "");
      if (giaTri.startsWith("84")) {
        giaTri = "0" + giaTri.substring(2);
      }
      if (giaTri.length > 10) {
        giaTri = giaTri.substring(0, 10);
      }
      e.target.value = giaTri;
    });
  }
});
