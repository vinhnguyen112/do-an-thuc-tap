// File: cv-builder.js
// Tác giả: Sinh viên thực tập
// Mô tả: Code để tạo CV với preview trực tiếp (Tích hợp API)

// Biến lưu template hiện tại
var templateHienTai = 'modern';
var cvIdHienTai = null; // ID của CV đang sửa (nếu có)

// ========================================
// CÁC HÀM TẠO TEMPLATE CV
// ========================================

// Hàm tạo template Modern - 1 cột đơn giản
function taoTemplateModern(duLieu) {
    return `
        <div class="text-center mb-4">
            <h2 class="fw-bold text-primary" id="previewName">${duLieu.hoTen || 'NGUYỄN VĂN A'}</h2>
            <p class="text-muted mb-2" id="previewJobTitle">${duLieu.viTri || 'Frontend Developer'}</p>
            <div class="d-flex justify-content-center gap-3 flex-wrap">
                <small><i class="bi bi-telephone me-1"></i><span id="previewPhone">${duLieu.sdt || '+84 123 456 789'}</span></small>
                <small><i class="bi bi-envelope me-1"></i><span id="previewEmail">${duLieu.email || 'nguyenvana@example.com'}</span></small>
                <small><i class="bi bi-geo-alt me-1"></i><span id="previewAddress">${duLieu.diaChi || 'Hồ Chí Minh'}</span></small>
            </div>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold border-bottom pb-2">MỤC TIÊU NGHỀ NGHIỆP</h5>
            <p class="mb-0" id="previewObjective">${duLieu.mucTieu || 'Sinh viên năm cuối ngành Công nghệ Thông tin...'}</p>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold border-bottom pb-2">HỌC VẤN</h5>
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="fw-semibold mb-0">Đại học Công nghệ TP.HCM</h6>
                    <p class="text-muted mb-0">Cử nhân Công nghệ Thông tin</p>
                </div>
                <div class="text-end">
                    <p class="text-muted mb-0">2020 - 2024</p>
                    <p class="text-muted mb-0">GPA: 3.5/4.0</p>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold border-bottom pb-2">KINH NGHIỆM</h5>
            <div class="mb-3">
                <h6 class="fw-semibold mb-0">Frontend Developer Intern</h6>
                <p class="text-muted mb-1">Tech Corp Vietnam | 06/2023 - 08/2023</p>
                <ul class="mb-0">
                    <li>Phát triển giao diện người dùng với ReactJS và TypeScript</li>
                    <li>Tối ưu hóa hiệu suất ứng dụng web</li>
                    <li>Phối hợp với team backend để tích hợp API</li>
                </ul>
            </div>
        </div>

        <div class="mb-4">
            <h5 class="fw-bold border-bottom pb-2">KỸ NĂNG</h5>
            <div class="d-flex flex-wrap gap-2" id="previewSkills">
                ${(duLieu.kyNang || ['JavaScript', 'ReactJS', 'HTML/CSS']).map(kn => `<span class="badge bg-primary">${kn}</span>`).join('')}
            </div>
        </div>

        <div>
            <h5 class="fw-bold border-bottom pb-2">DỰ ÁN</h5>
            <div class="mb-3">
                <h6 class="fw-semibold mb-0">Website E-commerce</h6>
                <p class="text-muted mb-1">ReactJS, Node.js, MongoDB</p>
                <p class="mb-0">Phát triển website thương mại điện tử với đầy đủ tính năng mua sắm, thanh toán.</p>
            </div>
        </div>
    `;
}

// Hàm tạo template Professional - 2 cột với sidebar
function taoTemplateProfessional(duLieu) {
    return `
        <div class="row">
            <!-- Sidebar trái -->
            <div class="col-md-4 cv-sidebar">
                <div class="text-center mb-4">
                    <div class="avatar-circle mx-auto mb-3">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <h4 class="fw-bold mb-1" id="previewName">${duLieu.hoTen || 'NGUYỄN VĂN A'}</h4>
                    <p class="text-muted mb-0 small" id="previewJobTitle">${duLieu.viTri || 'Frontend Developer'}</p>
                </div>

                <div class="mb-4">
                    <h6 class="fw-bold mb-3 text-uppercase">Liên hệ</h6>
                    <div class="mb-2"><i class="bi bi-telephone me-2"></i><small id="previewPhone">${duLieu.sdt || '+84 123 456 789'}</small></div>
                    <div class="mb-2"><i class="bi bi-envelope me-2"></i><small id="previewEmail">${duLieu.email || 'nguyenvana@example.com'}</small></div>
                    <div class="mb-2"><i class="bi bi-geo-alt me-2"></i><small id="previewAddress">${duLieu.diaChi || 'Hồ Chí Minh'}</small></div>
                </div>

                <div class="mb-4">
                    <h6 class="fw-bold mb-3 text-uppercase">Kỹ năng</h6>
                    <div id="previewSkills">
                        ${(duLieu.kyNang || ['JavaScript', 'ReactJS', 'HTML/CSS']).map(kn => `
                            <div class="mb-2">
                                <small class="d-block mb-1">${kn}</small>
                                <div class="progress" style="height: 6px;">
                                    <div class="progress-bar bg-success" style="width: 80%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Nội dung chính bên phải -->
            <div class="col-md-8 cv-main-content">
                <div class="mb-4">
                    <h5 class="fw-bold section-title">MỤC TIÊU NGHỀ NGHIỆP</h5>
                    <p class="mb-0" id="previewObjective">${duLieu.mucTieu || 'Sinh viên năm cuối ngành Công nghệ Thông tin...'}</p>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold section-title">KINH NGHIỆM</h5>
                    <div class="mb-3">
                        <h6 class="fw-semibold mb-0">Frontend Developer Intern</h6>
                        <p class="text-muted mb-1 small">Tech Corp Vietnam | 06/2023 - 08/2023</p>
                        <ul class="mb-0 small">
                            <li>Phát triển giao diện người dùng với ReactJS và TypeScript</li>
                            <li>Tối ưu hóa hiệu suất ứng dụng web</li>
                        </ul>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold section-title">HỌC VẤN</h5>
                    <div>
                        <h6 class="fw-semibold mb-0">Đại học Công nghệ TP.HCM</h6>
                        <p class="text-muted mb-0 small">Cử nhân Công nghệ Thông tin | 2020 - 2024 | GPA: 3.5/4.0</p>
                    </div>
                </div>

                <div>
                    <h5 class="fw-bold section-title">DỰ ÁN</h5>
                    <div class="mb-3">
                        <h6 class="fw-semibold mb-0">Website E-commerce</h6>
                        <p class="text-muted mb-1 small">ReactJS, Node.js, MongoDB</p>
                        <p class="mb-0 small">Phát triển website thương mại điện tử với đầy đủ tính năng.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hàm tạo template Creative - Header lớn + 2 cột
function taoTemplateCreative(duLieu) {
    return `
        <!-- Header lớn với background -->
        <div class="creative-header text-center mb-4 p-4">
            <h1 class="display-4 fw-bold mb-2" id="previewName">${duLieu.hoTen || 'NGUYỄN VĂN A'}</h1>
            <h4 class="mb-3" id="previewJobTitle">${duLieu.viTri || 'Frontend Developer'}</h4>
            <div class="d-flex justify-content-center gap-4">
                <span><i class="bi bi-telephone-fill me-2"></i><span id="previewPhone">${duLieu.sdt || '+84 123 456 789'}</span></span>
                <span><i class="bi bi-envelope-fill me-2"></i><span id="previewEmail">${duLieu.email || 'nguyenvana@example.com'}</span></span>
                <span><i class="bi bi-geo-alt-fill me-2"></i><span id="previewAddress">${duLieu.diaChi || 'Hồ Chí Minh'}</span></span>
            </div>
        </div>

        <div class="row">
            <!-- Cột trái 40% -->
            <div class="col-md-5">
                <div class="mb-4">
                    <h5 class="fw-bold creative-section-title">KỸ NĂNG</h5>
                    <div id="previewSkills">
                        ${(duLieu.kyNang || ['JavaScript', 'ReactJS', 'HTML/CSS', 'Node.js']).map(kn => `
                            <div class="mb-3">
                                <div class="d-flex justify-content-between mb-1">
                                    <span class="fw-semibold">${kn}</span>
                                    <span class="text-muted">85%</span>
                                </div>
                                <div class="progress" style="height: 8px;">
                                    <div class="progress-bar bg-warning" style="width: 85%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold creative-section-title">SỞ THÍCH</h5>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-warning text-dark">Đọc sách</span>
                        <span class="badge bg-warning text-dark">Du lịch</span>
                        <span class="badge bg-warning text-dark">Coding</span>
                    </div>
                </div>
            </div>

            <!-- Cột phải 60% -->
            <div class="col-md-7">
                <div class="mb-4">
                    <h5 class="fw-bold creative-section-title">MỤC TIÊU</h5>
                    <p class="mb-0" id="previewObjective">${duLieu.mucTieu || 'Sinh viên năm cuối ngành Công nghệ Thông tin...'}</p>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold creative-section-title">KINH NGHIỆM</h5>
                    <div class="mb-3">
                        <h6 class="fw-bold mb-1">Frontend Developer Intern</h6>
                        <p class="text-muted mb-2 small">Tech Corp Vietnam | 06/2023 - 08/2023</p>
                        <ul class="mb-0">
                            <li>Phát triển giao diện người dùng với ReactJS</li>
                            <li>Tối ưu hóa hiệu suất ứng dụng web</li>
                        </ul>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold creative-section-title">HỌC VẤN</h5>
                    <h6 class="fw-bold mb-1">Đại học Công nghệ TP.HCM</h6>
                    <p class="text-muted mb-0">Cử nhân Công nghệ Thông tin | 2020 - 2024 | GPA: 3.5/4.0</p>
                </div>

                <div>
                    <h5 class="fw-bold creative-section-title">DỰ ÁN</h5>
                    <div>
                        <h6 class="fw-bold mb-1">Website E-commerce</h6>
                        <p class="text-muted mb-1 small">ReactJS, Node.js, MongoDB</p>
                        <p class="mb-0">Phát triển website thương mại điện tử.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hàm tạo template Minimal - Siêu đơn giản
function taoTemplateMinimal(duLieu) {
    return `
        <!-- Header đơn giản trên 1 dòng -->
        <div class="minimal-header mb-4 pb-3 border-bottom">
            <h2 class="mb-1" id="previewName">${duLieu.hoTen || 'NGUYỄN VĂN A'}</h2>
            <div class="d-flex gap-3 flex-wrap">
                <span id="previewEmail">${duLieu.email || 'nguyenvana@example.com'}</span>
                <span id="previewPhone">${duLieu.sdt || '+84 123 456 789'}</span>
                <span id="previewAddress">${duLieu.diaChi || 'Hồ Chí Minh'}</span>
            </div>
        </div>

        <!-- Mục tiêu -->
        <div class="mb-3">
            <h5 class="mb-2">MỤC TIÊU NGHỀ NGHIỆP</h5>
            <p id="previewObjective">${duLieu.mucTieu || 'Sinh viên năm cuối ngành Công nghệ Thông tin...'}</p>
        </div>

        <!-- Kinh nghiệm -->
        <div class="mb-3">
            <h5 class="mb-2">KINH NGHIỆM</h5>
            <div class="mb-2">
                <strong>Frontend Developer Intern</strong> - Tech Corp Vietnam<br>
                <span class="text-muted">06/2023 - 08/2023</span>
                <ul class="mt-1 mb-0">
                    <li>Phát triển giao diện người dùng với ReactJS và TypeScript</li>
                    <li>Tối ưu hóa hiệu suất ứng dụng web</li>
                </ul>
            </div>
        </div>

        <!-- Học vấn -->
        <div class="mb-3">
            <h5 class="mb-2">HỌC VẤN</h5>
            <strong>Đại học Công nghệ TP.HCM</strong><br>
            Cử nhân Công nghệ Thông tin | 2020 - 2024 | GPA: 3.5/4.0
        </div>

        <!-- Kỹ năng -->
        <div class="mb-3">
            <h5 class="mb-2">KỸ NĂNG</h5>
            <div id="previewSkills">
                ${(duLieu.kyNang || ['JavaScript', 'ReactJS', 'HTML/CSS', 'Node.js']).join(', ')}
            </div>
        </div>

        <!-- Dự án -->
        <div>
            <h5 class="mb-2">DỰ ÁN</h5>
            <strong>Website E-commerce</strong><br>
            <span class="text-muted">ReactJS, Node.js, MongoDB</span><br>
            Phát triển website thương mại điện tử với đầy đủ tính năng mua sắm, thanh toán.
        </div>
    `;
}

// Hàm cập nhật preview theo template
function capNhatPreview() {
    // Lấy dữ liệu từ form
    var duLieu = {
        hoTen: document.getElementById('fullName') ? document.getElementById('fullName').value : '',
        viTri: document.getElementById('jobTitle') ? document.getElementById('jobTitle').value : '',
        sdt: document.getElementById('phone') ? document.getElementById('phone').value : '',
        email: document.getElementById('email') ? document.getElementById('email').value : '',
        diaChi: document.getElementById('address') ? document.getElementById('address').value : '',
        mucTieu: document.getElementById('cvObjective') ? document.getElementById('cvObjective').value : '',
        kyNang: layDanhSachKyNang()
    };

    // Lấy container preview
    var cvPreview = document.getElementById('cvPreview');
    if (!cvPreview) return;

    // Tạo HTML theo template
    var htmlMoi = '';
    if (templateHienTai === 'modern') {
        htmlMoi = taoTemplateModern(duLieu);
    } else if (templateHienTai === 'professional') {
        htmlMoi = taoTemplateProfessional(duLieu);
    } else if (templateHienTai === 'creative') {
        htmlMoi = taoTemplateCreative(duLieu);
    } else if (templateHienTai === 'minimal') {
        htmlMoi = taoTemplateMinimal(duLieu);
    }

    // Cập nhật HTML
    cvPreview.innerHTML = htmlMoi;
}

// ========================================
// KHỞI TẠO TRANG
// ========================================

// Chờ trang web load xong rồi mới chạy
window.onload = function() {
    console.log("Trang đã load xong!");
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập để tạo CV!');
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Gọi hàm setup các sự kiện
    khoiTaoSuKien();
    
    // Kiểm tra xem có đang sửa CV không (qua URL param id)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        cvIdHienTai = id;
        taiDuLieuCV(id);
    } else {
        // Render preview mặc định
        capNhatPreview();
    }
};

// Hàm để setup các sự kiện khi người dùng nhập liệu
function khoiTaoSuKien() {
    console.log("Đang setup các sự kiện...");
    
    // Lấy các ô input
    var hoTen = document.getElementById('fullName');
    var viTri = document.getElementById('jobTitle');
    var soDienThoai = document.getElementById('phone');
    var email = document.getElementById('email');
    var diaChi = document.getElementById('address');
    var mucTieu = document.getElementById('cvObjective');
    
    // Khi người dùng gõ họ tên
    if (hoTen) {
        hoTen.oninput = function() {
            var ten = this.value;
            if (ten == '') {
                ten = 'NGUYỄN VĂN A'; // Nếu để trống thì hiện tên mặc định
            }
            document.getElementById('previewName').innerText = ten.toUpperCase();
        };
    }
    
    // Khi người dùng gõ vị trí ứng tuyển
    if (viTri) {
        viTri.oninput = function() {
            var vitri = this.value;
            if (vitri == '') {
                vitri = 'Frontend Developer';
            }
            document.getElementById('previewJobTitle').innerText = vitri;
        };
    }
    
    // Khi người dùng gõ số điện thoại
    if (soDienThoai) {
        soDienThoai.oninput = function() {
            var sdt = this.value;
            if (sdt == '') {
                sdt = '+84 123 456 789';
            }
            document.getElementById('previewPhone').innerText = sdt;
        };
    }
    
    // Khi người dùng gõ email
    if (email) {
        email.oninput = function() {
            var mail = this.value;
            if (mail == '') {
                mail = 'nguyenvana@example.com';
            }
            document.getElementById('previewEmail').innerText = mail;
        };
    }
    
    // Khi người dùng gõ địa chỉ
    if (diaChi) {
        diaChi.oninput = function() {
            var dc = this.value;
            if (dc == '') {
                dc = 'Hồ Chí Minh';
            }
            document.getElementById('previewAddress').innerText = dc;
        };
    }
    
    // Khi người dùng gõ mục tiêu nghề nghiệp
    if (mucTieu) {
        mucTieu.oninput = function() {
            var mt = this.value;
            if (mt == '') {
                mt = 'Sinh viên năm cuối ngành Công nghệ Thông tin...';
            }
            document.getElementById('previewObjective').innerText = mt;
        };
    }
    
    // Setup sự kiện cho ô nhập kỹ năng - nhấn Enter để thêm
    var oNhapKyNang = document.getElementById('skillInput');
    if (oNhapKyNang) {
        oNhapKyNang.onkeypress = function(e) {
            // Kiểm tra xem có phải phím Enter không
            if (e.keyCode == 13 || e.which == 13) {
                e.preventDefault(); // Ngăn form submit
                themKyNang(); // Gọi hàm thêm kỹ năng
            }
        };
    }
    
    console.log("Setup xong!");
}

// Hàm chọn template CV
function selectTemplate(element, loaiTemplate) {
    console.log("Đang chọn template: " + loaiTemplate);
    
    // Bỏ class 'selected' ở tất cả các template
    var tatCaTemplate = document.querySelectorAll('.template-card');
    for (var i = 0; i < tatCaTemplate.length; i++) {
        tatCaTemplate[i].classList.remove('selected');
    }
    
    // Thêm class 'selected' vào template được chọn
    element.classList.add('selected');
    
    // Check radio button
    var radioButton = element.querySelector('input[type="radio"]');
    if (radioButton) {
        radioButton.checked = true;
    }
    
    // Lưu template hiện tại
    templateHienTai = loaiTemplate;
    
    // Đổi style của preview theo template được chọn
    var cvPreview = document.querySelector('.cv-template-preview');
    if (cvPreview) {
        // Xóa tất cả các class template cũ
        cvPreview.classList.remove('template-modern', 'template-professional', 'template-creative', 'template-minimal');
        
        // Thêm class template mới
        cvPreview.classList.add('template-' + loaiTemplate);
        
        console.log("Đã đổi style preview sang: template-" + loaiTemplate);
    }
    
    // Cập nhật lại HTML của preview theo template mới
    capNhatPreview();
    
    console.log("Đã chọn template: " + loaiTemplate);
}

// Hàm thêm kỹ năng mới
function themKyNang() {
    console.log("Đang thêm kỹ năng...");
    
    var oNhapKyNang = document.getElementById('skillInput');
    var kyNang = oNhapKyNang.value.trim(); // Lấy giá trị và bỏ khoảng trắng 2 đầu
    
    // Kiểm tra xem có nhập gì không
    if (kyNang != '') {
        // Tìm chỗ để thêm badge kỹ năng
        var noiChuaBadge = document.querySelector('.d-flex.flex-wrap.gap-2.mb-2');
        
        // Tạo badge mới
        var badge = document.createElement('span');
        badge.className = 'badge bg-primary';
        badge.innerHTML = kyNang + ' <i class="bi bi-x ms-1" onclick="xoaKyNang(this)"></i>';
        
        // Thêm vào danh sách
        noiChuaBadge.appendChild(badge);
        
        // Xóa ô input
        oNhapKyNang.value = '';
        
        console.log("Đã thêm kỹ năng: " + kyNang);
    } else {
        console.log("Chưa nhập kỹ năng!");
    }
}

// Hàm xóa kỹ năng (tên cũ: removeSkill)
function xoaKyNang(element) {
    console.log("Đang xóa kỹ năng...");
    // Xóa cả cái badge (parentElement của icon X)
    element.parentElement.remove();
}

// Hàm lưu CV (Gọi API)
async function saveCV() {
    console.log("Đang lưu CV...");
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    // Kiểm tra xem đã nhập họ tên chưa
    var hoTen = document.getElementById('fullName') ? document.getElementById('fullName').value : '';
    var viTri = document.getElementById('jobTitle') ? document.getElementById('jobTitle').value : '';
    
    if (!hoTen || hoTen.trim() === '') {
        alert('Vui lòng nhập họ tên!');
        return;
    }
    
    // Thu thập dữ liệu từ form
    var duLieuCV = {
        hoTen: hoTen,
        viTri: viTri,
        sdt: document.getElementById('phone') ? document.getElementById('phone').value : '',
        email: document.getElementById('email') ? document.getElementById('email').value : '',
        diaChi: document.getElementById('address') ? document.getElementById('address').value : '',
        mucTieu: document.getElementById('cvObjective') ? document.getElementById('cvObjective').value : '',
        kyNang: layDanhSachKyNang()
    };
    
    const payload = {
        sinhVienId: roleId,
        tenCV: 'CV ' + (viTri || 'Mới'),
        template: templateHienTai,
        trangThai: 'completed',
        duLieuCV: duLieuCV
    };

    try {
        let url = 'http://localhost:5000/api/cv';
        let method = 'POST';

        // Nếu đang sửa CV cũ thì dùng PUT
        if (cvIdHienTai) {
            url = `http://localhost:5000/api/cv/${cvIdHienTai}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert('CV đã được lưu thành công!');
            window.location.href = 'my-cvs.html';
        } else {
            alert(result.message || 'Có lỗi khi lưu CV');
        }
    } catch (error) {
        console.error('Lỗi lưu CV:', error);
        alert('Không thể kết nối đến server');
    }
}

// Hàm lưu bản nháp (Gọi API)
async function saveDraft() {
    console.log("Đang lưu bản nháp...");
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;
    
    var hoTen = document.getElementById('fullName') ? document.getElementById('fullName').value : '';
    var viTri = document.getElementById('jobTitle') ? document.getElementById('jobTitle').value : '';
    
    var duLieuCV = {
        hoTen: hoTen,
        viTri: viTri,
        sdt: document.getElementById('phone') ? document.getElementById('phone').value : '',
        email: document.getElementById('email') ? document.getElementById('email').value : '',
        diaChi: document.getElementById('address') ? document.getElementById('address').value : '',
        mucTieu: document.getElementById('cvObjective') ? document.getElementById('cvObjective').value : '',
        kyNang: layDanhSachKyNang()
    };
    
    const payload = {
        sinhVienId: roleId,
        tenCV: 'CV ' + (viTri || 'Bản nháp'),
        template: templateHienTai,
        trangThai: 'draft',
        duLieuCV: duLieuCV
    };

    try {
        let url = 'http://localhost:5000/api/cv';
        let method = 'POST';

        if (cvIdHienTai) {
            url = `http://localhost:5000/api/cv/${cvIdHienTai}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Bản nháp đã được lưu!');
            window.location.href = 'my-cvs.html';
        } else {
            alert('Có lỗi khi lưu bản nháp');
        }
    } catch (error) {
        console.error('Lỗi lưu nháp:', error);
        alert('Không thể kết nối đến server');
    }
}

// Hàm tải dữ liệu CV từ API
async function taiDuLieuCV(id) {
    console.log("Đang tải dữ liệu CV...");
    
    try {
        const response = await fetch(`http://localhost:5000/api/cv/${id}`);
        const cv = await response.json();
        
        if (response.ok && cv) {
            console.log("Đã tải xong CV!");
            
            // Parse dữ liệu JSON
            let duLieu = cv.DuLieuCV;
            if (typeof duLieu === 'string') {
                duLieu = JSON.parse(duLieu);
            }
            
            // Cập nhật template
            if (cv.Template) {
                templateHienTai = cv.Template;
                // Update UI selection (cần logic phức tạp hơn để highlight đúng card)
            }

            // Điền dữ liệu vào form
            if (document.getElementById('fullName')) document.getElementById('fullName').value = duLieu.hoTen || '';
            if (document.getElementById('jobTitle')) document.getElementById('jobTitle').value = duLieu.viTri || '';
            if (document.getElementById('phone')) document.getElementById('phone').value = duLieu.sdt || '';
            if (document.getElementById('email')) document.getElementById('email').value = duLieu.email || '';
            if (document.getElementById('address')) document.getElementById('address').value = duLieu.diaChi || '';
            if (document.getElementById('cvObjective')) document.getElementById('cvObjective').value = duLieu.mucTieu || '';
            
            // Load kỹ năng
            const skillsContainer = document.querySelector('.d-flex.flex-wrap.gap-2.mb-2');
            if (skillsContainer && duLieu.kyNang) {
                skillsContainer.innerHTML = ''; // Clear cũ
                duLieu.kyNang.forEach(kn => {
                    var badge = document.createElement('span');
                    badge.className = 'badge bg-primary';
                    badge.innerHTML = kn + ' <i class="bi bi-x ms-1" onclick="xoaKyNang(this)"></i>';
                    skillsContainer.appendChild(badge);
                });
            }

            // Kích hoạt sự kiện input để cập nhật preview
            var tatCaInput = document.querySelectorAll('input, textarea');
            for (var i = 0; i < tatCaInput.length; i++) {
                var event = new Event('input');
                tatCaInput[i].dispatchEvent(event);
            }
            
            capNhatPreview();
        } else {
            alert('Không tìm thấy CV');
        }
    } catch (error) {
        console.error("Lỗi khi tải CV: ", error);
        alert('Lỗi tải dữ liệu CV');
    }
}

// Hàm lấy danh sách kỹ năng
function layDanhSachKyNang() {
    var danhSachKyNang = [];
    var tatCaBadge = document.querySelectorAll('.badge.bg-primary');
    
    for (var i = 0; i < tatCaBadge.length; i++) {
        var noiDung = tatCaBadge[i].innerText;
        // Bỏ ký tự × (icon X)
        noiDung = noiDung.replace('×', '').trim();
        if (noiDung != '') {
            danhSachKyNang.push(noiDung);
        }
    }
    
    return danhSachKyNang;
}

// Hàm tải xuống PDF
function downloadPDF() {
    console.log("Đang tải PDF...");
    alert('Tính năng tải xuống PDF đang được phát triển.\nHiện tại bạn có thể dùng Print to PDF của trình duyệt (Ctrl+P).');
    window.print();
}

// Thêm alias cho các hàm cũ (để tương thích)
var addSkill = themKyNang;
var removeSkill = xoaKyNang;

console.log("File cv-builder.js đã load xong!");
