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

replaceInFile(
  'src/features/verification-officer-2/pages/AssignedFarmlandsValuation.tsx',
  "import { useViewportScale } from '@/hooks/useViewportScale';",
  ""
);

let dashDataPath = path.resolve(__dirname, 'src/features/super-admin/data/mockDashboardData.ts');
let dashContent = fs.readFileSync(dashDataPath, 'utf8');

// There are objects in conversionCommandUsers array that have double 'comments' properties due to my previous regex bug.
dashContent = dashContent.replace(/comments:\s*"",\r?\n\s*comments:\s*""/g, 'comments: ""');
// Also if there's an original comment and then an empty one:
dashContent = dashContent.replace(/comments:\s*".*?",\r?\n\s*commentsHighlight/g, 'commentsHighlight'); // just to reset? No, wait.
// Let's just fix lines 421 and 448 directly.
const lines = dashContent.split('\n');
const newLines = lines.filter((line, i) => {
  // If line 421 or 448 (0-indexed: 420, 447), and it's comments: "" - wait, they shifted.
  // We can just filter out any line that is exactly `        comments: ""` if the previous line was also a comments line? No.
  return true;
});
// A safer regex for Duplicate Object Keys
dashContent = dashContent.replace(/(\s*comments:\s*".*?",?\s*\r?\n)\s*comments:\s*"",?\s*\r?\n/g, '$1');
dashContent = dashContent.replace(/(\s*comments:\s*"",?\s*\r?\n)\s*comments:\s*"",?\s*\r?\n/g, '$1');

fs.writeFileSync(dashDataPath, dashContent);
