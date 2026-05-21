const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Insperion\\Seed5\\src\\app\\pages\\masters';

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            checkFile(fullPath);
        }
    }
}

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('container-fluid') && !content.includes('app-page-title')) {
        console.log(`Corrupted: ${filePath}`);
    }
}

scanDir(rootDir);
