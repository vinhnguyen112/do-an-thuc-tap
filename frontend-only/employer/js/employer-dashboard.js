document.addEventListener('DOMContentLoaded', async function() {
    // Check login status
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'employer') {
        window.location.href = '/page/login.html';
        return;
    }

    // Update user info in header
    document.querySelector('.dropdown-toggle').innerHTML = `<i class="bi bi-building me-1"></i>${user.name || 'Nhà tuyển dụng'}`;

    // Fetch dashboard stats
    try {
       
        
        let employerId = user.id; 
        
        
        const profileResponse = await fetch(`/api/employer/profile/${user.id}`);
        if (profileResponse.ok) {
            const profile = await profileResponse.json();
            if (profile.NTD_id) {
                employerId = profile.NTD_id;
            }
        }

        const response = await fetch(`/api/employer/dashboard-stats/${employerId}`);
        if (!response.ok) throw new Error('Failed to fetch stats');

        const data = await response.json();
        
        // Update Stats Cards
        updateStats(data.stats);
        
        // Update Recent Candidates
        updateRecentCandidates(data.recentCandidates);
        
        // Update Active Jobs
        updateActiveJobs(data.activeJobs);
        
        // Initialize Chart
        initChart();

    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Show error state in UI
    }
});

function updateStats(stats) {
    document.getElementById('stat-active-jobs').textContent = stats.TinDangTuyen || 0;
    document.getElementById('stat-total-candidates').textContent = stats.TongUngVien || 0;
    document.getElementById('stat-pending-interviews').textContent = stats.ChoPhongVan || 0;
    document.getElementById('stat-pending-jobs').textContent = stats.TinChoDuyet || 0;
}

function updateRecentCandidates(candidates) {
    const container = document.getElementById('recent-candidates-list');
    
    if (!candidates || candidates.length === 0) {
        container.innerHTML = '<div class="text-center py-3 text-muted">Chưa có ứng viên mới</div>';
        return;
    }

    const html = candidates.map(candidate => `
        <div class="candidate-card">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                    <img src="../page/assets/avata.jpg" alt="Candidate" width="40" height="40" class="rounded-circle">
                </div>
                <div class="flex-grow-1 ms-3">
                    <h6 class="fw-semibold mb-0">${candidate.HoTen}</h6>
                    <small class="text-muted">${candidate.ViTri}</small>
                </div>
            </div>
            <div class="mt-2">
                <small class="text-muted">
                    <i class="bi bi-clock me-1"></i>${formatTimeAgo(candidate.NgayUngTuyen)}
                </small>
                <span class="badge bg-info float-end">${candidate.TrangThai}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

function updateActiveJobs(jobs) {
    const container = document.getElementById('active-jobs-list');
    
    if (!jobs || jobs.length === 0) {
        container.innerHTML = '<tr><td colspan="5" class="text-center">Chưa có tin tuyển dụng nào</td></tr>';
        return;
    }

    const html = jobs.map(job => `
        <tr>
            <td>
                <strong>${job.TieuDe}</strong>
                <br><small class="text-muted">${job.DiaDiem}</small>
            </td>
            <td>${job.SoUngVien}</td>
            <td>${new Date(job.NgayDang).toLocaleDateString('vi-VN')}</td>
            <td><span class="badge bg-${getStatusColor(job.TrangThai)}">${job.TrangThai}</span></td>
            <td>
                <a href="/employer/job-candidates.html?jobId=${job.BaiDang_id}" class="btn btn-sm btn-outline-primary">Xem</a>
            </td>
        </tr>
    `).join('');

    container.innerHTML = html;
}

function initChart() {
    const ctx = document.getElementById('jobViewsChart').getContext('2d');
    
    // Generate dummy data for the last 7 days
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }));
        data.push(Math.floor(Math.random() * 50) + 10); // Random views between 10 and 60
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Lượt xem',
                data: data,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " năm trước";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " tháng trước";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " ngày trước";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ trước";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút trước";
    return Math.floor(seconds) + " giây trước";
}

function getStatusColor(status) {
    switch(status) {
        case 'Đang tuyển': return 'success';
        case 'Chờ duyệt': return 'warning';
        case 'Đã đóng': return 'secondary';
        default: return 'primary';
    }
}
