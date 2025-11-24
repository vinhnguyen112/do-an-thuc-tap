// File: employer-profile.js
// Mục đích: Quản lý hồ sơ công ty (Tích hợp API)

let isEditMode = false;

// Khi trang load xong
document.addEventListener("DOMContentLoaded", function () {
    console.log("Employer profile page loaded");
    
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'employer') {
        window.location.href = '../page/dang-nhap.html';
        return;
    }

    // Load thông tin hồ sơ
    loadProfile();
});

// Hàm tải thông tin hồ sơ
async function loadProfile() {
    console.log("Đang tải hồ sơ công ty...");
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    try {
        const response = await fetch(`http://localhost:5000/api/employer/profile/${roleId}`);
        const data = await response.json();

        if (response.ok) {
            // Điền dữ liệu vào form
            fillFormData(data);
        } else {
            console.error('Lỗi tải hồ sơ:', data.message);
            alert('Không thể tải thông tin hồ sơ');
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        alert('Lỗi kết nối đến server');
    }
}

// Hàm điền dữ liệu vào form
function fillFormData(data) {
    // Thông tin công ty
    setInputValue('companyName', data.companyName);
    setInputValue('shortName', data.shortName);
    setInputValue('email', data.email);
    setInputValue('phone', data.phone);
    setTextAreaValue('address', data.address);
    setInputValue('website', data.website);
    setSelectValue('scale', data.scale);
    setSelectValue('industry', data.industry);
    setTextAreaValue('description', data.description);

    // Người liên hệ
    setInputValue('contactName', data.contactName);
    setInputValue('contactPosition', data.contactPosition);
    setInputValue('contactEmail', data.contactEmail);
    setInputValue('contactPhone', data.contactPhone);

    // Mạng xã hội
    setInputValue('facebook', data.facebook);
    setInputValue('linkedin', data.linkedin);

    // Logo (nếu có)
    if (data.logo) {
        document.getElementById('logoPreview').src = data.logo;
    }
}

// Helper functions
function setInputValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

function setTextAreaValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

function setSelectValue(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.value = value;
}

// Hàm preview logo
function previewLogo(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById("logoPreview");
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Chuyển chế độ chỉnh sửa
function toggleEditMode() {
    isEditMode = !isEditMode;

    const inputs = document.querySelectorAll(
        ".profile-card input, .profile-card textarea, .profile-card select"
    );
    const button = document.getElementById('editButton'); // Cần thêm ID cho nút này trong HTML

    inputs.forEach((input) => {
        // Không cho sửa email đăng nhập (nếu muốn)
        // if (input.id === 'email') return; 
        
        input.readOnly = !isEditMode;
        if (input.tagName === "SELECT") {
            input.disabled = !isEditMode;
        }
    });

    if (isEditMode) {
        button.innerHTML = '<i class="bi bi-check me-1"></i>Lưu thay đổi';
        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");
        button.onclick = saveProfile; // Đổi hành động thành save
    } else {
        button.innerHTML = '<i class="bi bi-pencil me-1"></i>Chỉnh sửa';
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
        button.onclick = toggleEditMode; // Đổi lại hành động
    }
}

// Hủy chỉnh sửa
function cancelEdit() {
    if (isEditMode) {
        if (confirm("Hủy bỏ các thay đổi?")) {
            location.reload();
        }
    }
}

// Lưu hồ sơ
async function saveProfile() {
    console.log("Đang lưu hồ sơ...");
    
    const roleId = localStorage.getItem('roleId');
    if (!roleId) return;

    // Thu thập dữ liệu
    const formData = {
        companyName: document.getElementById('companyName').value,
        shortName: document.getElementById('shortName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        website: document.getElementById('website').value,
        scale: document.getElementById('scale').value,
        industry: document.getElementById('industry').value,
        description: document.getElementById('description').value,
        contactName: document.getElementById('contactName').value,
        contactPosition: document.getElementById('contactPosition').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        facebook: document.getElementById('facebook').value,
        linkedin: document.getElementById('linkedin').value,
        // Logo xử lý sau (cần upload file)
        logo: document.getElementById('logoPreview').src
    };

    try {
        const response = await fetch(`http://localhost:5000/api/employer/profile/${roleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Thông tin công ty đã được cập nhật thành công!");
            // Tắt chế độ edit
            // toggleEditMode(); // Gọi lại hàm này sẽ bị lỗi logic vì nút đã đổi onclick
            location.reload(); // Reload để cập nhật lại UI sạch sẽ
        } else {
            alert(result.message || 'Lỗi khi cập nhật hồ sơ');
        }
    } catch (error) {
        console.error('Lỗi lưu hồ sơ:', error);
        alert('Không thể kết nối đến server');
    }
}
