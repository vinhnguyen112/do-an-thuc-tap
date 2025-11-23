// File: cv-builder.js
// Tác giả: Sinh viên thực tập
// Mô tả: Code để tạo CV với preview trực tiếp

// Chờ trang web load xong rồi mới chạy
window.onload = function() {
    console.log("Trang đã load xong!");
    
    // Gọi hàm setup các sự kiện
    khoiTaoSuKien();
    
    // Thử load dữ liệu đã lưu (nếu có)
    taiDuLieuDaLuu();
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
    
    // Đổi style của preview theo template được chọn
    var cvPreview = document.querySelector('.cv-template-preview');
    if (cvPreview) {
        // Xóa tất cả các class template cũ
        cvPreview.classList.remove('template-modern', 'template-professional', 'template-creative', 'template-minimal');
        
        // Thêm class template mới
        cvPreview.classList.add('template-' + loaiTemplate);
        
        console.log("Đã đổi style preview sang: template-" + loaiTemplate);
    }
    
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

// Hàm lưu CV
function saveCV() {
    console.log("Đang lưu CV...");
    
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
        kyNang: layDanhSachKyNang(),
        template: layTemplateChon()
    };
    
    // Lưu vào localStorage
    try {
        // Lấy danh sách CV hiện có
        var danhSachCV = [];
        var cvTrongLocalStorage = localStorage.getItem('danhSachCV');
        
        if (cvTrongLocalStorage) {
            try {
                danhSachCV = JSON.parse(cvTrongLocalStorage);
            } catch (e) {
                console.log('Lỗi parse danhSachCV: ' + e);
                danhSachCV = [];
            }
        }
        
        // Tạo ngày hiện tại
        var ngayHienTai = layNgayHienTai();
        
        // Tạo CV mới với metadata
        var cvMoi = {
            id: Date.now(), // Dùng timestamp làm ID
            tieuDe: 'CV ' + (viTri || 'Chưa có tiêu đề'),
            ngayTao: ngayHienTai,
            lanCapNhatCuoi: ngayHienTai,
            template: layTemplateChon(),
            trangThai: 'completed', // completed hoặc draft
            duLieu: duLieuCV // Lưu toàn bộ dữ liệu CV
        };
        
        // Thêm CV mới vào đầu danh sách
        danhSachCV.unshift(cvMoi);
        
        // Lưu lại vào localStorage
        localStorage.setItem('danhSachCV', JSON.stringify(danhSachCV));
        
        // Xóa bản nháp nếu có
        localStorage.removeItem('banNhapCV');
        
        console.log("Đã lưu CV vào danh sách");
        
        alert('CV đã được lưu thành công!');
        
        // Chuyển sang trang danh sách CV sau 1 giây
        setTimeout(function() {
            window.location.href = 'my-cvs.html';
        }, 1000);
    } catch (error) {
        console.log("Lỗi khi lưu: " + error);
        alert('Có lỗi khi lưu CV. Vui lòng thử lại!');
    }
}

// Hàm lấy ngày hiện tại (định dạng dd/mm/yyyy)
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

// Hàm lưu bản nháp
function saveDraft() {
    console.log("Đang lưu bản nháp...");
    
    // Thu thập dữ liệu
    var hoTen = document.getElementById('fullName') ? document.getElementById('fullName').value : '';
    var viTri = document.getElementById('jobTitle') ? document.getElementById('jobTitle').value : '';
    
    var duLieuCV = {
        hoTen: hoTen,
        viTri: viTri,
        sdt: document.getElementById('phone') ? document.getElementById('phone').value : '',
        email: document.getElementById('email') ? document.getElementById('email').value : '',
        diaChi: document.getElementById('address') ? document.getElementById('address').value : '',
        mucTieu: document.getElementById('cvObjective') ? document.getElementById('cvObjective').value : '',
        kyNang: layDanhSachKyNang(),
        template: layTemplateChon()
    };
    
    // Lưu vào localStorage
    try {
        // Lấy danh sách CV hiện có
        var danhSachCV = [];
        var cvTrongLocalStorage = localStorage.getItem('danhSachCV');
        
        if (cvTrongLocalStorage) {
            try {
                danhSachCV = JSON.parse(cvTrongLocalStorage);
            } catch (e) {
                console.log('Lỗi parse danhSachCV: ' + e);
                danhSachCV = [];
            }
        }
        
        // Tạo ngày hiện tại
        var ngayHienTai = layNgayHienTai();
        
        // Tạo CV mới với trạng thái draft
        var cvMoi = {
            id: Date.now(),
            tieuDe: 'CV ' + (viTri || 'Bản nháp'),
            ngayTao: ngayHienTai,
            lanCapNhatCuoi: ngayHienTai,
            template: layTemplateChon(),
            trangThai: 'draft', // draft status
            duLieu: duLieuCV
        };
        
        // Thêm vào đầu danh sách
        danhSachCV.unshift(cvMoi);
        
        // Lưu lại
        localStorage.setItem('danhSachCV', JSON.stringify(danhSachCV));
        
        console.log("Đã lưu bản nháp");
        alert('Bản nháp đã được lưu!');
        
        // Chuyển sang trang danh sách CV
        setTimeout(function() {
            window.location.href = 'my-cvs.html';
        }, 1000);
    } catch (error) {
        console.log("Lỗi khi lưu bản nháp: " + error);
        alert('Có lỗi khi lưu bản nháp!');
    }
}

// Hàm tải dữ liệu đã lưu
function taiDuLieuDaLuu() {
    console.log("Đang kiểm tra bản nháp...");
    
    try {
        var banNhap = localStorage.getItem('banNhapCV');
        
        if (banNhap) {
            console.log("Tìm thấy bản nháp!");
            var duLieu = JSON.parse(banNhap);
            
            // Điền dữ liệu vào form
            if (document.getElementById('fullName')) {
                document.getElementById('fullName').value = duLieu.hoTen || '';
            }
            if (document.getElementById('jobTitle')) {
                document.getElementById('jobTitle').value = duLieu.viTri || '';
            }
            if (document.getElementById('phone')) {
                document.getElementById('phone').value = duLieu.sdt || '';
            }
            if (document.getElementById('email')) {
                document.getElementById('email').value = duLieu.email || '';
            }
            if (document.getElementById('address')) {
                document.getElementById('address').value = duLieu.diaChi || '';
            }
            if (document.getElementById('cvObjective')) {
                document.getElementById('cvObjective').value = duLieu.mucTieu || '';
            }
            
            // Kích hoạt sự kiện input để cập nhật preview
            var tatCaInput = document.querySelectorAll('input, textarea');
            for (var i = 0; i < tatCaInput.length; i++) {
                var event = new Event('input');
                tatCaInput[i].dispatchEvent(event);
            }
            
            console.log("Đã load bản nháp xong!");
        } else {
            console.log("Không có bản nháp");
        }
    } catch (error) {
        console.log("Lỗi khi load bản nháp: " + error);
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

// Hàm lấy template đang chọn
function layTemplateChon() {
    var radioChecked = document.querySelector('input[name="template"]:checked');
    if (radioChecked) {
        var templateCard = radioChecked.closest('.template-card');
        var tenTemplate = templateCard.querySelector('p').innerText;
        return tenTemplate;
    }
    return 'Modern'; // Mặc định
}

// Hàm tải xuống PDF
function downloadPDF() {
    console.log("Đang tải PDF...");
    alert('Tính năng tải xuống PDF đang được phát triển.\nHiện tại bạn có thể dùng Print to PDF của trình duyệt (Ctrl+P).');
    
    // Mở hộp thoại in
    window.print();
}

// Thêm alias cho các hàm cũ (để tương thích)
var addSkill = themKyNang;
var removeSkill = xoaKyNang;

console.log("File cv-builder.js đã load xong!");
