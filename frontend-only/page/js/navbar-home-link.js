// Script để cập nhật navbar links dựa trên login status
// Thêm script này vào tất cả các trang trong student/ và employer/ folders

document.addEventListener('DOMContentLoaded', function() {
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userType'); // 'student' or 'employer'
    
    if (isLoggedIn && userType) {
        // Update logo link
        const logoLink = document.querySelector('.navbar-brand');
        if (logoLink) {
            if (userType === 'student') {
                // Nếu đang ở student folder, link về student-home.html
                // Nếu đang ở page folder, link về ../student/student-home.html
                const currentPath = window.location.pathname;
                if (currentPath.includes('/student/')) {
                    logoLink.href = 'student-home.html';
                } else {
                    logoLink.href = '../student/student-home.html';
                }
            } else if (userType === 'employer') {
                // Nếu đang ở employer folder, link về employer-home.html
                // Nếu đang ở page folder, link về ../employer/employer-home.html
                const currentPath = window.location.pathname;
                if (currentPath.includes('/employer/')) {
                    logoLink.href = 'employer-home.html';
                } else {
                    logoLink.href = '../employer/employer-home.html';
                }
            }
        }
        
        // Update "Trang chủ" link in navigation (if exists)
        const homeLinks = document.querySelectorAll('.nav-link');
        homeLinks.forEach(link => {
            if (link.textContent.trim() === 'Trang chủ') {
                if (userType === 'student') {
                    const currentPath = window.location.pathname;
                    if (currentPath.includes('/student/')) {
                        link.href = 'student-home.html';
                    } else {
                        link.href = '../student/student-home.html';
                    }
                } else if (userType === 'employer') {
                    const currentPath = window.location.pathname;
                    if (currentPath.includes('/employer/')) {
                        link.href = 'employer-home.html';
                    } else {
                        link.href = '../employer/employer-home.html';
                    }
                }
            }
        });
    }
});
