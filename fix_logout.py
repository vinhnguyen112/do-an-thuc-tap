import os
import re

def fix_logout_links(directory):
    print(f"Scanning directory: {directory}")
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Regex to find the logout link. 
                # It looks for an anchor tag with 'text-danger' class and 'Đăng xuất' text.
                # It captures the entire tag content.
                pattern = r'<a\s+[^>]*class="[^"]*text-danger[^"]*"[^>]*href="[^"]*"[^>]*>\s*Đăng xuất\s*</a>'
                
                # Replacement string
                replacement = '<a class="dropdown-item text-danger" href="../page/index.html" onclick="localStorage.clear()">Đăng xuất</a>'
                
                new_content = re.sub(pattern, replacement, content, flags=re.DOTALL | re.IGNORECASE)
                
                if new_content != content:
                    print(f"Updating {file}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

# Fix student files
fix_logout_links('frontend-only/student')

# Fix employer files
fix_logout_links('frontend-only/employer')
