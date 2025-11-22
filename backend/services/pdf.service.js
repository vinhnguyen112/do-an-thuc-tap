const puppeteer = require('puppeteer');

// Tạo HTML từ CV data
function generateCVHTML(cv) {
    const skills = Array.isArray(cv.Skills) ? cv.Skills : [];
    const cvData = cv.CVData || {};
    
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cv.Title || 'CV'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            background: #fff;
        }
        .cv-container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
        }
        .cv-header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .cv-header h1 {
            font-size: 28px;
            color: #007bff;
            margin-bottom: 10px;
        }
        .cv-header p {
            font-size: 16px;
            color: #666;
            margin: 5px 0;
        }
        .cv-section {
            margin-bottom: 25px;
        }
        .cv-section h2 {
            font-size: 20px;
            color: #007bff;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .cv-section p {
            margin-bottom: 10px;
            text-align: justify;
        }
        .skill-tag {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            margin: 3px;
            font-size: 12px;
        }
        .education-item, .experience-item, .project-item {
            margin-bottom: 15px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        .item-title {
            font-weight: bold;
            font-size: 16px;
        }
        .item-company {
            color: #666;
            font-size: 14px;
        }
        .item-date {
            color: #999;
            font-size: 14px;
        }
        .item-description {
            margin-top: 5px;
            padding-left: 20px;
        }
        .item-description ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        .item-description li {
            margin-bottom: 5px;
        }
        @media print {
            body {
                padding: 0;
            }
            .cv-container {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="cv-header">
            <h1>${cvData.fullName || 'Họ và Tên'}</h1>
            <p>${cvData.position || 'Vị trí ứng tuyển'}</p>
            <p>
                ${cvData.phone ? `<span>📞 ${cvData.phone}</span>` : ''}
                ${cvData.email ? `<span>✉️ ${cvData.email}</span>` : ''}
                ${cvData.address ? `<span>📍 ${cvData.address}</span>` : ''}
            </p>
        </div>

        ${cv.Objective ? `
        <div class="cv-section">
            <h2>MỤC TIÊU NGHỀ NGHIỆP</h2>
            <p>${cv.Objective}</p>
        </div>
        ` : ''}

        ${cvData.education && cvData.education.length > 0 ? `
        <div class="cv-section">
            <h2>HỌC VẤN</h2>
            ${cvData.education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${edu.school || ''}</div>
                            <div class="item-company">${edu.degree || ''}</div>
                        </div>
                        <div class="item-date">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                    </div>
                    ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${cvData.experience && cvData.experience.length > 0 ? `
        <div class="cv-section">
            <h2>KINH NGHIỆM</h2>
            ${cvData.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.position || ''}</div>
                            <div class="item-company">${exp.company || ''}</div>
                        </div>
                        <div class="item-date">${exp.startDate || ''} - ${exp.endDate || ''}</div>
                    </div>
                    ${exp.description ? `
                        <div class="item-description">
                            <ul>
                                ${Array.isArray(exp.responsibilities) ? 
                                    exp.responsibilities.map(resp => `<li>${resp}</li>`).join('') :
                                    `<li>${exp.description}</li>`
                                }
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${skills.length > 0 ? `
        <div class="cv-section">
            <h2>KỸ NĂNG</h2>
            <div>
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}

        ${cvData.projects && cvData.projects.length > 0 ? `
        <div class="cv-section">
            <h2>DỰ ÁN</h2>
            ${cvData.projects.map(project => `
                <div class="project-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${project.name || ''}</div>
                            <div class="item-company">${project.tech || ''}</div>
                        </div>
                    </div>
                    ${project.description ? `<p>${project.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>
    `;
}

// Generate PDF từ CV data
async function generatePDF(cv) {
    let browser;
    try {
        const html = generateCVHTML(cv);
        
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }
        });
        
        await browser.close();
        return pdf;
    } catch (error) {
        if (browser) {
            await browser.close();
        }
        throw error;
    }
}

module.exports = {
    generatePDF,
    generateCVHTML
};

