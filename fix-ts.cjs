const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, search, replace) {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  if (typeof search === 'string') {
    content = content.split(search).join(replace);
  } else {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(fullPath, content);
}

// 1. IntelligenceOfficerLayout.tsx
replaceInFile(
  'src/components/common/layouts/IntelligenceOfficerLayout.tsx',
  'icon: any;',
  'icon?: any;'
);

// 2. Farmlandlist.tsx
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'stateObj?.description',
  '(stateObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'stateObj?.name',
  '(stateObj as any)?.name'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'districtObj?.description',
  '(districtObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'districtObj?.name',
  '(districtObj as any)?.name'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'mandalObj?.description',
  '(mandalObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandlist.tsx',
  'mandalObj?.name',
  '(mandalObj as any)?.name'
);

// 3. Farmlandrequest.tsx
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'stateObj?.description',
  '(stateObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'stateObj?.name',
  '(stateObj as any)?.name'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'districtObj?.description',
  '(districtObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'districtObj?.name',
  '(districtObj as any)?.name'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'mandalObj?.description',
  '(mandalObj as any)?.description'
);
replaceInFile(
  'src/features/ccs/pages/Farmlandrequest.tsx',
  'mandalObj?.name',
  '(mandalObj as any)?.name'
);

// 4. LocalIntelligenceUploadFile.tsx
replaceInFile(
  'src/features/super-admin/components/upload-components/LocalIntelligenceUploadFile.tsx',
  'import React, { useRef } from "react";',
  'import React from "react";'
);

// 5. ValuationUploadFile.tsx
replaceInFile(
  'src/features/super-admin/components/upload-components/ValuationUploadFile.tsx',
  'import React, { useRef } from "react";',
  'import React from "react";'
);

// 6. mockDashboardData.ts - fix multiple properties issue
replaceInFile(
  'src/features/super-admin/data/mockDashboardData.ts',
  'subscriptions: "Subscribed",\n        comments: "",\n        comments: ""',
  'subscriptions: "Subscribed",\n        comments: ""'
);
replaceInFile(
  'src/features/super-admin/data/mockDashboardData.ts',
  'subscriptions: "Subscribed",\\n        comments: "",\\n        comments: ""',
  'subscriptions: "Subscribed",\\n        comments: ""'
);
// I'll fix this manually by reading the file and regex replacing.
let dashDataPath = path.resolve(__dirname, 'src/features/super-admin/data/mockDashboardData.ts');
let dashContent = fs.readFileSync(dashDataPath, 'utf8');
dashContent = dashContent.replace(/comments:\s*"",\s*comments:\s*""/g, 'comments: ""');
fs.writeFileSync(dashDataPath, dashContent);

// 7. AssignedFarmlandsValuation.tsx
replaceInFile(
  'src/features/verification-officer-2/pages/AssignedFarmlandsValuation.tsx',
  'import { useViewportScale } from "@/core/hooks/useViewportScale";',
  ''
);

