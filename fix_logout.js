const fs = require('fs');
const path = require('path');

function fixLogoutLinks(directory) {
    console.log(`Scanning directory: ${directory}`);
    
    function walk(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filepath = path.join(dir, file);
            const stat = fs.statSync(filepath);
            
            if (stat.isDirectory()) {
                walk(filepath);
            } else if (file.endsWith('.html')) {
                let content = fs.readFileSync(filepath, 'utf8');
                
                // Regex to find the logout link.
                // Matches <a ... class="...text-danger..." ... href="..." ... > ... Đăng xuất ... </a>
                // Handling newlines and spaces.
                const pattern = /<a\s+[^>]*class="[^"]*text-danger[^"]*"[^>]*href="[^"]*"[^>]*>\s*Đăng xuất\s*<\/a>/gi;
                
                const replacement = '<a class="dropdown-item text-danger" href="../page/index.html" onclick="localStorage.clear()">Đăng xuất</a>';
                
                const newContent = content.replace(pattern, replacement);
                
                if (newContent !== content) {
                    console.log(`Updating ${file}`);
                    fs.writeFileSync(filepath, newContent, 'utf8');
                }
            }
        });
    }
    
    if (fs.existsSync(directory)) {
        walk(directory);
    } else {
        console.log(`Directory not found: ${directory}`);
    }
}

// Fix student files
fixLogoutLinks('frontend-only/student');

// Fix employer files
fixLogoutLinks('frontend-only/employer');
