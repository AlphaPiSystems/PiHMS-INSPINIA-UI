const fs = require('fs');
const path = require('path');

// Each entry: [editTsPath, viewDir, viewSelector, viewClass, editRoutePattern, viewRoutePattern, entityVar, listRoute]
const modules = [
  // PATIENT
  {
    editTs: 'src/app/pages/masters/patient/patientinsuranceedit/patientinsuranceedit.ts',
    viewDir: 'src/app/pages/masters/patient/patientinsuranceview',
    selector: 'app-patientinsuranceview',
    className: 'PatientInsuranceView',
    editTemplateRef: '../patientinsuranceedit/patientinsuranceedit.html',
    editRouteSegment: 'patientinsuranceedit',
    viewRouteSegment: 'patientinsuranceview',
    routesFile: 'src/app/pages/masters/patient/patient.routes.ts',
    editButtonLabel: 'Edit Patient Insurance',
  },
  // INSURANCE
  {
    editTs: 'src/app/pages/masters/insurance/components/insuranceedit/insuranceedit.ts',
    viewDir: 'src/app/pages/masters/insurance/components/insuranceview',
    selector: 'app-insuranceview',
    className: 'InsuranceView',
    editTemplateRef: '../insuranceedit/insuranceedit.html',
    editRouteSegment: 'insuranceedit',
    viewRouteSegment: 'insuranceview',
    routesFile: 'src/app/pages/masters/insurance/insurance.routes.ts',
    editButtonLabel: 'Edit Insurance',
  },
  // BILLING - BillDomain
  {
    editTs: 'src/app/pages/masters/billing/components/billdomainedit/billdomainedit.ts',
    viewDir: 'src/app/pages/masters/billing/components/billdomainview',
    selector: 'app-billdomainview',
    className: 'BillDomainView',
    editTemplateRef: '../billdomainedit/billdomainedit.html',
    editRouteSegment: 'billdomainedit',
    viewRouteSegment: 'billdomainview',
    routesFile: 'src/app/pages/masters/billing/billing.routes.ts',
    editButtonLabel: 'Edit Bill Domain',
  },
  // BILLING - BillItem
  {
    editTs: 'src/app/pages/masters/billing/components/billitemedit/billitemedit.ts',
    viewDir: 'src/app/pages/masters/billing/components/billitemview',
    selector: 'app-billitemview',
    className: 'BillItemView',
    editTemplateRef: '../billitemedit/billitemedit.html',
    editRouteSegment: 'billitemedit',
    viewRouteSegment: 'billitemview',
    routesFile: 'src/app/pages/masters/billing/billing.routes.ts',
    editButtonLabel: 'Edit Bill Item',
  },
  // HOUSEKEEPING
  {
    editTs: 'src/app/pages/masters/housekeeping/components/housekeepingedit/housekeepingedit.ts',
    viewDir: 'src/app/pages/masters/housekeeping/components/housekeepingview',
    selector: 'app-housekeepingview',
    className: 'HousekeepingView',
    editTemplateRef: '../housekeepingedit/housekeepingedit.html',
    editRouteSegment: 'housekeepingedit',
    viewRouteSegment: 'housekeepingview',
    routesFile: 'src/app/pages/masters/housekeeping/housekeeping.routes.ts',
    editButtonLabel: 'Edit Housekeeping',
  },
  // CLINICAL - Surgery
  {
    editTs: 'src/app/pages/masters/clinical/components/surgeryedit/surgeryedit.ts',
    viewDir: 'src/app/pages/masters/clinical/components/surgeryview',
    selector: 'app-surgeryview',
    className: 'SurgeryView',
    editTemplateRef: '../surgeryedit/surgeryedit.html',
    editRouteSegment: 'surgeryedit',
    viewRouteSegment: 'surgeryview',
    routesFile: 'src/app/pages/masters/clinical/clinical.routes.ts',
    editButtonLabel: 'Edit Surgery',
  },
  // SCANNING - Scan
  {
    editTs: 'src/app/pages/masters/scanning/components/scanedit/scanedit.ts',
    viewDir: 'src/app/pages/masters/scanning/components/scanview',
    selector: 'app-scanview',
    className: 'ScanView',
    editTemplateRef: '../scanedit/scanedit.html',
    editRouteSegment: 'scanedit',
    viewRouteSegment: 'scanview',
    routesFile: 'src/app/pages/masters/scanning/scanning.routes.ts',
    editButtonLabel: 'Edit Scan',
  },
  // SCANNING - ScanningItem
  {
    editTs: 'src/app/pages/masters/scanning/components/scanningitemedit/scanningitemedit.ts',
    viewDir: 'src/app/pages/masters/scanning/components/scanningitemview',
    selector: 'app-scanningitemview',
    className: 'ScanningItemView',
    editTemplateRef: '../scanningitemedit/scanningitemedit.html',
    editRouteSegment: 'scanningitemedit',
    viewRouteSegment: 'scanningitemview',
    routesFile: 'src/app/pages/masters/scanning/scanning.routes.ts',
    editButtonLabel: 'Edit Scanning Item',
  },
  // SCANNING - ScanningTemplate
  {
    editTs: 'src/app/pages/masters/scanning/components/scanningtemplateedit/scanningtemplateedit.ts',
    viewDir: 'src/app/pages/masters/scanning/components/scanningtemplateview',
    selector: 'app-scanningtemplateview',
    className: 'ScanningTemplateView',
    editTemplateRef: '../scanningtemplateedit/scanningtemplateedit.html',
    editRouteSegment: 'scanningtemplateedit',
    viewRouteSegment: 'scanningtemplateview',
    routesFile: 'src/app/pages/masters/scanning/scanning.routes.ts',
    editButtonLabel: 'Edit Scanning Template',
  },
  // STAFF - Staff
  {
    editTs: 'src/app/pages/masters/staffs/components/staffedit/staffedit.ts',
    viewDir: 'src/app/pages/masters/staffs/components/staffview',
    selector: 'app-staffview',
    className: 'StaffView',
    editTemplateRef: '../staffedit/staffedit.html',
    editRouteSegment: 'staffedit',
    viewRouteSegment: 'staffview',
    routesFile: 'src/app/pages/masters/staffs/staffs.routes.ts',
    editButtonLabel: 'Edit Staff',
  },
  // STAFF - Role
  {
    editTs: 'src/app/pages/masters/staffs/components/roleedit/roleedit.ts',
    viewDir: 'src/app/pages/masters/staffs/components/roleview',
    selector: 'app-roleview',
    className: 'RoleView',
    editTemplateRef: '../roleedit/roleedit.html',
    editRouteSegment: 'roleedit',
    viewRouteSegment: 'roleview',
    routesFile: 'src/app/pages/masters/staffs/staffs.routes.ts',
    editButtonLabel: 'Edit Role',
  },
  // STAFF - Earning
  {
    editTs: 'src/app/pages/masters/staffs/components/earningedit/earningedit.ts',
    viewDir: 'src/app/pages/masters/staffs/components/earningview',
    selector: 'app-earningview',
    className: 'EarningView',
    editTemplateRef: '../earningedit/earningedit.html',
    editRouteSegment: 'earningedit',
    viewRouteSegment: 'earningview',
    routesFile: 'src/app/pages/masters/staffs/staffs.routes.ts',
    editButtonLabel: 'Edit Earning',
  },
  // STAFF - Payroll
  {
    editTs: 'src/app/pages/masters/staffs/components/payrolledit/payrolledit.ts',
    viewDir: 'src/app/pages/masters/staffs/components/payrollview',
    selector: 'app-payrollview',
    className: 'PayrollView',
    editTemplateRef: '../payrolledit/payrolledit.html',
    editRouteSegment: 'payrolledit',
    viewRouteSegment: 'payrollview',
    routesFile: 'src/app/pages/masters/staffs/staffs.routes.ts',
    editButtonLabel: 'Edit Payroll',
  },
  // DIAGTESTS - DiagTest
  {
    editTs: 'src/app/pages/masters/diagtests/components/diagtestedit/diagtestedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/diagtestview',
    selector: 'app-diagtestview',
    className: 'DiagTestView',
    editTemplateRef: '../diagtestedit/diagtestedit.html',
    editRouteSegment: 'diagtestedit',
    viewRouteSegment: 'diagtestview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Test',
  },
  // DIAGTESTS - DiagGroup
  {
    editTs: 'src/app/pages/masters/diagtests/components/diaggroupedit/diaggroupedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/diaggroupview',
    selector: 'app-diaggroupview',
    className: 'DiagGroupView',
    editTemplateRef: '../diaggroupedit/diaggroupedit.html',
    editRouteSegment: 'diaggroupedit',
    viewRouteSegment: 'diaggroupview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Group',
  },
  // DIAGTESTS - Instrument
  {
    editTs: 'src/app/pages/masters/diagtests/components/instrumentedit/instrumentedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/instrumentview',
    selector: 'app-instrumentview',
    className: 'InstrumentView',
    editTemplateRef: '../instrumentedit/instrumentedit.html',
    editRouteSegment: 'instrumentedit',
    viewRouteSegment: 'instrumentview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Instrument',
  },
  // DIAGTESTS - Sample
  {
    editTs: 'src/app/pages/masters/diagtests/components/sampleedit/sampleedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/sampleview',
    selector: 'app-sampleview',
    className: 'SampleView',
    editTemplateRef: '../sampleedit/sampleedit.html',
    editRouteSegment: 'sampleedit',
    viewRouteSegment: 'sampleview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Sample',
  },
  // DIAGTESTS - TestTemplate
  {
    editTs: 'src/app/pages/masters/diagtests/components/testtemplateedit/testtemplateedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/testtemplateview',
    selector: 'app-testtemplateview',
    className: 'TestTemplateView',
    editTemplateRef: '../testtemplateedit/testtemplateedit.html',
    editRouteSegment: 'testtemplateedit',
    viewRouteSegment: 'testtemplateview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Template',
  },
  // DIAGTESTS - Unit
  {
    editTs: 'src/app/pages/masters/diagtests/components/unitedit/unitedit.ts',
    viewDir: 'src/app/pages/masters/diagtests/components/unitview',
    selector: 'app-unitview',
    className: 'UnitView',
    editTemplateRef: '../unitedit/unitedit.html',
    editRouteSegment: 'unitedit',
    viewRouteSegment: 'unitview',
    routesFile: 'src/app/pages/masters/diagtests/diagtests.routes.ts',
    editButtonLabel: 'Edit Unit',
  },
  // HOSPITAL - Floor
  {
    editTs: 'src/app/pages/masters/hospital/components/flooredit/flooredit.ts',
    viewDir: 'src/app/pages/masters/hospital/components/floorview',
    selector: 'app-floorview',
    className: 'FloorView',
    editTemplateRef: '../flooredit/flooredit.html',
    editRouteSegment: 'flooredit',
    viewRouteSegment: 'floorview',
    routesFile: 'src/app/pages/masters/hospital/hospital.routes.ts',
    editButtonLabel: 'Edit Floor',
  },
  // HOSPITAL - Building
  {
    editTs: 'src/app/pages/masters/hospital/components/hospitalbuildingedit/hospitalbuildingedit.ts',
    viewDir: 'src/app/pages/masters/hospital/components/hospitalbuildingview',
    selector: 'app-hospitalbuildingview',
    className: 'HospitalBuildingView',
    editTemplateRef: '../hospitalbuildingedit/hospitalbuildingedit.html',
    editRouteSegment: 'hospitalbuildingedit',
    viewRouteSegment: 'hospitalbuildingview',
    routesFile: 'src/app/pages/masters/hospital/hospital.routes.ts',
    editButtonLabel: 'Edit Building',
  },
  // HOSPITAL - Ward
  {
    editTs: 'src/app/pages/masters/hospital/components/wardedit/wardedit.ts',
    viewDir: 'src/app/pages/masters/hospital/components/wardview',
    selector: 'app-wardview',
    className: 'WardView',
    editTemplateRef: '../wardedit/wardedit.html',
    editRouteSegment: 'wardedit',
    viewRouteSegment: 'wardview',
    routesFile: 'src/app/pages/masters/hospital/hospital.routes.ts',
    editButtonLabel: 'Edit Ward',
  },
  // HOSPITAL - WardBed
  {
    editTs: 'src/app/pages/masters/hospital/components/wardbededit/wardbededit.ts',
    viewDir: 'src/app/pages/masters/hospital/components/wardbedview',
    selector: 'app-wardbedview',
    className: 'WardBedView',
    editTemplateRef: '../wardbededit/wardbededit.html',
    editRouteSegment: 'wardbededit',
    viewRouteSegment: 'wardbedview',
    routesFile: 'src/app/pages/masters/hospital/hospital.routes.ts',
    editButtonLabel: 'Edit Ward Bed',
  },
  // HOSPITAL - WardType
  {
    editTs: 'src/app/pages/masters/hospital/components/wardtypeedit/wardtypeedit.ts',
    viewDir: 'src/app/pages/masters/hospital/components/wardtypeview',
    selector: 'app-wardtypeview',
    className: 'WardTypeView',
    editTemplateRef: '../wardtypeedit/wardtypeedit.html',
    editRouteSegment: 'wardtypeedit',
    viewRouteSegment: 'wardtypeview',
    routesFile: 'src/app/pages/masters/hospital/hospital.routes.ts',
    editButtonLabel: 'Edit Ward Type',
  },
];

const root = 'c:\\Insperion\\Seed5';

function readFileSafe(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) { console.warn('NOT FOUND:', full); return null; }
  return fs.readFileSync(full, 'utf8');
}

function generateViewTs(mod, editContent) {
  // Extract imports block (everything up to @Component)
  const importsMatch = editContent.match(/([\s\S]*?)@Component/);
  let imports = importsMatch ? importsMatch[1].trim() : '';

  // Replace RouterLink import with RouterLink + Location if needed
  if (!imports.includes('Location')) {
    imports = imports.replace(
      /from '@angular\/common';/,
      `from '@angular/common';\nimport { Location } from '@angular/common';`
    );
    // deduplicate if already there
  }

  // Extract all class fields (between { and first constructor/ngOnInit)
  const classBodyMatch = editContent.match(/export class \w+[^{]*\{([\s\S]*)/);
  let classBody = classBodyMatch ? classBodyMatch[1] : '';

  // Remove saveChanges / cancel methods, keep fields and constructor and ngOnInit
  classBody = classBody
    .replace(/saveChanges\(\)[^}]*\}/g, '')
    .replace(/cancel\(\)[^}]*\}/g, '')
    .replace(/back\(\)[^}]*\}/g, '');

  // Remove last closing brace (class closing)
  classBody = classBody.replace(/\}\s*$/, '');

  const viewTs = `${imports}
import { Location } from '@angular/common';

@Component({
  selector: '${mod.selector}',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './${path.basename(mod.viewDir)}.html',
})
export class ${mod.className} {
${classBody}
  back() { this.location.back(); }
}
`;
  return viewTs;
}

function generateViewHtml(mod, editHtmlContent) {
  // Make all inputs/selects/textareas disabled
  let html = editHtmlContent
    .replace(/<input /gi, '<input disabled ')
    .replace(/<select /gi, '<select disabled ')
    .replace(/<textarea /gi, '<textarea disabled ');

  // Replace page title
  html = html.replace(/title="Edit /gi, 'title="View ');
  html = html.replace(/\[title\]="[^"]*"/gi, `title="View"`);

  // Replace submit/save buttons with Back + Edit buttons
  html = html.replace(
    /<div class="d-flex justify-content-end gap-2"[\s\S]*?<\/div>/i,
    `<div class="d-flex justify-content-end gap-2">
                <button type="button" (click)="back()" class="btn btn-white" style="border: 1px solid #d2d2d2; background: #fff; padding: 8px 25px; font-weight: 600; border-radius: 2px; color: #555;">Back</button>
                <a [routerLink]="['${mod.editRouteSegment.replace('edit', 'edit')}']" [routerLink]="['./../${mod.editRouteSegment}', record?.id]" class="btn btn-primary" style="background: #1ab394; border-color: #1ab394; color: #fff; padding: 8px 25px; font-weight: 600; border-radius: 2px;">${mod.editButtonLabel}</a>
              </div>`
  );

  return html;
}

// Read all routes files and collect unique ones
const routesFiles = {};
modules.forEach(mod => {
  if (!routesFiles[mod.routesFile]) routesFiles[mod.routesFile] = [];
  routesFiles[mod.routesFile].push(mod);
});

// Process each module
for (const mod of modules) {
  const editTsContent = readFileSafe(mod.editTs);
  if (!editTsContent) continue;

  // Get the actual template path
  const templatePathMatch = editTsContent.match(/templateUrl:\s*['"]([^'"]+)['"]/);
  let editHtmlContent = null;
  if (templatePathMatch) {
    const templateRelPath = templatePathMatch[1];
    const editTsDir = path.dirname(mod.editTs);
    const templatePath = path.join(editTsDir, templateRelPath);
    editHtmlContent = readFileSafe(templatePath);
  }

  // Create view directory
  const viewDirFull = path.join(root, mod.viewDir);
  if (!fs.existsSync(viewDirFull)) fs.mkdirSync(viewDirFull, { recursive: true });

  const viewName = path.basename(mod.viewDir);

  // Generate simple view HTML
  const viewHtml = editHtmlContent
    ? editHtmlContent
        .replace(/<input /gi, '<input disabled ')
        .replace(/<select /gi, '<select disabled ')
        .replace(/<textarea /gi, '<textarea disabled ')
        .replace(/\[title\]="[^"]*"/gi, `title="View"`)
        .replace(/title="Edit /g, 'title="View ')
        .replace(
          /<button type="submit"[\s\S]*?<\/button>/gi,
          `<button type="button" (click)="back()" class="btn btn-white" style="border: 1px solid #d2d2d2; background: #fff; padding: 8px 25px; font-weight: 600; border-radius: 2px; color: #555;">Back</button>
                <a [routerLink]="back()" (click)="navigateToEdit()" class="btn btn-primary" style="background: #1ab394; border-color: #1ab394; color: #fff; padding: 8px 25px; font-weight: 600; border-radius: 2px;">${mod.editButtonLabel}</a>`
        )
        .replace(/<button type="button"[^>]*cancel[^>]*>[\s\S]*?<\/button>/gi, '')
    : `<div class="container-fluid"><app-page-title title="View" /><p>Loading...</p></div>`;

  fs.writeFileSync(path.join(viewDirFull, `${viewName}.html`), viewHtml, 'utf8');

  // Generate view TS - copy edit TS and adapt
  const viewTs = editTsContent
    .replace(/selector:\s*'[^']*'/, `selector: '${mod.selector}'`)
    .replace(/templateUrl:\s*'[^']*'/, `templateUrl: './${viewName}.html'`)
    .replace(/export class \w+/, `export class ${mod.className}`)
    .replace(/saveChanges\(\)\s*\{[^}]*\}/g, `back() { this.location.back(); }\n  navigateToEdit() { this.location.back(); }`)
    .replace(/cancel\(\)\s*\{[^}]*\}/g, '');

  // Inject Location if not present
  const viewTsFinal = viewTs.includes('Location')
    ? viewTs
    : viewTs
        .replace(/import { Component([^}]*)} from '@angular\/core';/, `import { Component$1} from '@angular/core';`)
        .replace(/constructor\(([^)]*)\)/, (m, args) => {
          const newArgs = args.includes('Location') ? args : args + (args.trim() ? ', ' : '') + 'private location: Location';
          return `constructor(${newArgs})`;
        })
        .replace(/from '@angular\/common';\n/, `from '@angular/common';\nimport { Location } from '@angular/common';\n`);

  fs.writeFileSync(path.join(viewDirFull, `${viewName}.ts`), viewTsFinal, 'utf8');
  console.log(`Created view: ${viewName}`);
}

// Now update routes files - add view routes after each edit route
for (const [routesFile, mods] of Object.entries(routesFiles)) {
  const full = path.join(root, routesFile);
  if (!fs.existsSync(full)) { console.warn('Routes not found:', full); continue; }

  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  for (const mod of mods) {
    const viewName = path.basename(mod.viewDir);
    // Find edit route and check if view route already exists
    if (content.includes(mod.viewRouteSegment)) continue;

    // Find the edit route block and append view route after it
    const editPathRegex = new RegExp(
      `(\\{[^}]*path:[^}]*${mod.editRouteSegment}[^}]*\\}[^}]*\\})`,
      'i'
    );
    const editMatch = content.match(editPathRegex);

    if (editMatch) {
      // Get the edit path value to derive view path
      const editPathVal = editMatch[0].match(/path:\s*'([^']*)'/);
      if (editPathVal) {
        const viewPath = editPathVal[1].replace(mod.editRouteSegment, mod.viewRouteSegment);
        const viewDirRelative = mod.viewDir.replace(/\\/g, '/');
        const newRoute = `,\n  {\n    path: '${viewPath}',\n    loadComponent: () => import('./${viewDirRelative.split('/components/').pop() ? 'components/' + viewName + '/' + viewName : viewName + '/' + viewName}').then(c => c.${mod.className}),\n    data: { title: 'View' }\n  }`;

        // Simpler: just find import path from edit route
        const editImportMatch = editMatch[0].match(/import\('([^']*)'\)/);
        if (editImportMatch) {
          const viewImportPath = editImportMatch[1].replace(/edit\/\w+$/, `view/${viewName}`).replace(mod.editRouteSegment, mod.viewRouteSegment).replace(/edit\/\w+$/, `view/${viewName}`);
          const cleanViewRoute = `,\n  {\n    path: '${viewPath}',\n    loadComponent: () => import('${viewImportPath}').then(c => c.${mod.className}),\n    data: { title: 'View' }\n  }`;
          content = content.replace(editMatch[0], editMatch[0] + cleanViewRoute);
        }
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log(`Updated routes: ${routesFile}`);
  }
}

console.log('\nDone!');
