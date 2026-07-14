const fs = require('fs');

function replaceFile(path, search, replace) {
  try {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(search, replace);
    fs.writeFileSync(path, content);
  } catch (e) {
    console.error(`Failed to process ${path}:`, e);
  }
}

// 1. CcsProfile.tsx
replaceFile('src/features/ccs/pages/CcsProfile.tsx', 'const user = apiUser || currentUser || {};', 'const user: any = apiUser || currentUser || {};');

// 2. FarmlandRequestAnalysis.tsx
replaceFile('src/features/ccs/pages/FarmlandRequestAnalysis.tsx', 'getDetails({ farmland_id: id });', 'getDetails({ farmland_id: Number(id) });');

// 3. FarmlandRequestMap.tsx
replaceFile('src/features/ccs/pages/FarmlandRequestMap.tsx', 'getDetails({ farmland_id: id });', 'getDetails({ farmland_id: Number(id) });');

// 4. FarmlandDetailPanel.tsx (remove unused STATUS_CONFIG)
replaceFile('src/features/ccs/components/FarmlandDetailPanel.tsx', /const STATUS_CONFIG: Record<string, { color: string; label: string }> = \{[\s\S]*?\};\n/, '');

// Vite imports - we need to change imports from public/super-admin... to const ... = '/super-admin...';
const viteFiles = [
  'src/core/config/layoutConfig.ts',
  'src/features/super-admin/components/StatusCards.tsx',
  'src/features/super-admin/pool/SuperAdminPoolInvestorDetails.tsx',
  'src/features/ccs/components/DashboardHeader.tsx'
];
viteFiles.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/import (\w+) from ['"]\/public\/(.*?)['"];?/g, 'const $1 = "/$2";');
    fs.writeFileSync(f, content);
  } catch(e) {}
});

console.log("Done");
