// File: job-search.js
// Chức năng: Tìm kiếm và lọc công việc
// Tác giả: Sinh viên thực tập

// Biến toàn cục để lưu danh sách công việc
var danhSachCongViec = [];
var danhSachDaLoc = [];

// Khi trang load xong
window.onload = function() {
    console.log('Trang tìm kiếm đã sẵn sàng!');
    
    // Giả lập load dữ liệu công việc
    taiDanhSachCongViec();
    
    // Setup sự kiện tìm kiếm
    setupTimKiem();
};

// Hàm tải danh sách công việc (giả lập)
function taiDanhSachCongViec() {
    console.log('Đang tải danh sách công việc...');
    
    // Dữ liệu mẫu - sau này sẽ lấy từ API
    danhSachCongViec = [
        {
            id: 1,
            tieuDe: 'Frontend Developer Intern',
            congTy: 'Tech Corp Vietnam',
            diaDiem: 'Hồ Chí Minh',
            mucLuong: '5-8 triệu'
        },
        {
            id: 2,
            tieuDe: 'ReactJS Developer',
            congTy: 'Startup Innovation',
            diaDiem: 'Remote',
            mucLuong: '8-12 triệu'
        }
    ];
    
    danhSachDaLoc = danhSachCongViec; // Ban đầu hiển thị tất cả
    console.log('Đã tải ' + danhSachCongViec.length + ' công việc');
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
        danhSachDaLoc = [];
        
        for (var i = 0; i < danhSachCongViec.length; i++) {
            var congViec = danhSachCongViec[i];
            var tieuDe = congViec.tieuDe.toLowerCase();
            var congTy = congViec.congTy.toLowerCase();
            
            // Kiểm tra xem có chứa từ khóa không
            if (tieuDe.indexOf(tuKhoa) >= 0 || congTy.indexOf(tuKhoa) >= 0) {
                danhSachDaLoc.push(congViec);
            }
        }
    }
    
    console.log('Tìm thấy ' + danhSachDaLoc.length + ' kết quả');
    
    // Cập nhật giao diện (chưa làm)
    hienThiKetQua();
}

// Hàm hiển thị kết quả
function hienThiKetQua() {
    console.log('Đang hiển thị ' + danhSachDaLoc.length + ' công việc');
    // Sau này sẽ render ra HTML
}

// Hàm lọc theo địa điểm
function locTheoDiaDiem(diaDiem) {
    console.log('Lọc theo địa điểm: ' + diaDiem);
    
    if (diaDiem == 'all') {
        danhSachDaLoc = danhSachCongViec;
    } else {
        danhSachDaLoc = [];
        
        for (var i = 0; i < danhSachCongViec.length; i++) {
            if (danhSachCongViec[i].diaDiem == diaDiem) {
                danhSachDaLoc.push(danhSachCongViec[i]);
            }
        }
    }
    
    hienThiKetQua();
}

// Hàm lưu công việc
function luuCongViec(idCongViec) {
    console.log('Lưu công việc ID: ' + idCongViec);
    
    // Lấy danh sách đã lưu từ localStorage
    var danhSachDaLuu = localStorage.getItem('congViecDaLuu');
    
    if (danhSachDaLuu) {
        danhSachDaLuu = JSON.parse(danhSachDaLuu);
    } else {
        danhSachDaLuu = [];
    }
    
    // Kiểm tra xem đã lưu chưa
    var daLuu = false;
    for (var i = 0; i < danhSachDaLuu.length; i++) {
        if (danhSachDaLuu[i] == idCongViec) {
            daLuu = true;
            break;
        }
    }
    
    if (!daLuu) {
        danhSachDaLuu.push(idCongViec);
        localStorage.setItem('congViecDaLuu', JSON.stringify(danhSachDaLuu));
        alert('Đã lưu công việc!');
    } else {
        alert('Công việc này đã được lưu rồi!');
    }
}

console.log('File job-search.js đã sẵn sàng!');
