const fs = require('fs');
const path = require('path');

const dirsToScan = [
    'c:\\Insperion\\Seed5\\src\\app\\pages\\masters',
    'c:\\Insperion\\Seed5\\src\\app\\pages\\patients',
];

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/<table[^>]*>[\s\S]*?<\/table>/gi, (tableMatch) => {
        let table = tableMatch;
        
        table = table.replace(/<tr\s+class=["']text-uppercase\s+fs-md\s+fw-bold\s+text-dark["']>/gi, '<tr class="text-uppercase fs-xxs">');
        
        table = table.replace(/style=["']([^"']*)border-bottom:\s*1px\s*solid\s*#e7eaec;?\s*([^"']*)["']/gi, (m, p1, p2) => {
            let newStyle = (p1 + p2).trim();
            if (newStyle === '') return '';
            return `style="${newStyle}"`;
        });
        
        table = table.replace(/\bfw-semibold\s+text-dark\s+fs-sm\b/g, '');
        table = table.replace(/\btext-dark\s+fs-sm\b/g, '');
        
        // clean up multiple spaces in class
        table = table.replace(/class=["']([^"']*)["']/gi, (m, p1) => {
            let cleaned = p1.replace(/\s+/g, ' ').trim();
            if (cleaned === '') return '';
            return `class="${cleaned}"`;
        });

        return table;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
        scanDir(dir);
    }
}
