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
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Safely remove existing View buttons with tablerEye
    content = content.replace(/<a[^>]*>\s*<ng-icon[^>]*name=["']tablerEye["'][^>]*>(?:\s*<\/ng-icon>)?\s*<\/a>\s*/gi, '');

    // Case 1: Edit route with ID (e.g. ['/diagtest/diagtestedit', test.id])
    content = content.replace(/(<a\s+\[routerLink\]="\['([^']+?)edit',\s*([^\]]+)\]"[^>]*>[\s\S]*?<\/a>)/gi, (match, editBtn, prefix, itemVar) => {
        const viewBtn = `<a [routerLink]="['${prefix}view', ${itemVar}]" class="btn btn-light btn-icon btn-sm rounded-circle me-1" title="View"><ng-icon name="tablerEye" class="fs-lg" /></a>\n                                        `;
        return viewBtn + editBtn;
    });

    // Case 2: Edit route with state (e.g. ['/department/departmentedit'] [state]="{ department: d }")
    content = content.replace(/(<a\s+\[routerLink\]="\['([^']+?)edit'\]"(\s+\[state\]="[^"]+")?[^>]*>[\s\S]*?<\/a>)/gi, (match, editBtn, prefix, stateAttr) => {
        const stateStr = stateAttr ? stateAttr : '';
        const viewBtn = `<a [routerLink]="['${prefix}view']"${stateStr} class="btn btn-light btn-icon btn-sm rounded-circle me-1" title="View"><ng-icon name="tablerEye" class="fs-lg" /></a>\n                                        `;
        return viewBtn + editBtn;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

scanDir(rootDir);
