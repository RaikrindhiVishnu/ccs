const fs = require('fs');
const path = require('path');

const files = [
  'Customer.tsx',
  'Report.tsx',
  'Boundaries.tsx',
  'Valuation.tsx',
  'LocalInt.tsx'
];

const stepNames = {
  'Customer.tsx': 'Legal Documents',
  'Report.tsx': 'Agriculture Report',
  'Boundaries.tsx': 'Land & Boundaries',
  'Valuation.tsx': 'Valuation',
  'LocalInt.tsx': 'Local Intelligence'
};

files.forEach(file => {
  const filePath = path.join(__dirname, 'src/features/super-admin/legal-docs', file);
  let content = fs.readFileSync(filePath, 'utf-8');

  const stepName = stepNames[file];

  // Fix the page wrapper and breadcrumb
  content = content.replace(
    /<div style=\{styles\.page\}>([\s\S]*?)<div style=\{styles\.topBar\}>/,
    `<div style={styles.pageWrapper}>
      <div style={styles.breadcrumb}>
        Super Admin / ${stepName} / {currentTab?.label || ''}
      </div>
      <div style={styles.page}>
        <div style={styles.topBar}>`
  );

  // Close the new wrapper div at the end
  content = content.replace(
    /(\s*)<\/div>\n(\s*)<\/div>\n(\s*)\);\n\};/,
    `$1</div>\n$2</div>\n      </div>\n$3);\n};`
  );

  // Update stepper dot
  content = content.replace(
    /<div style=\{\{\n\s*width: 14,\n\s*height: 14,\n\s*borderRadius: '50%',\n\s*background: isCompleted \|\| isCurrent \? '#A3C33D' : '#E5E7EB',\n\s*\}\} \/>/g,
    `<div style={{ 
                        width: 20, height: 20, borderRadius: '50%', 
                        border: (isCompleted || isCurrent) ? '1px solid #A3C33D' : '1px solid #D1D5DB', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', zIndex: 10
                      }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: (isCompleted || isCurrent) ? '#A3C33D' : '#D1D5DB' }} />
                      </div>`
  );

  // Update styles object
  content = content.replace(/const styles: Record<string, React\.CSSProperties> = \{/, `const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: '100vh',
    background: '#1A1A1A',
    padding: '24px 32px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  breadcrumb: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 24,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },`);

  // Update page style
  content = content.replace(/page: \{\n\s*minHeight: '100vh',\n\s*background: '#F2F2F2',\n\s*fontFamily: "'Plus Jakarta Sans', sans-serif",\n\s*padding: '20px 24px',\n\s*boxSizing: 'border-box',\n\s*\}/, `page: {
    background: '#F2F2F2',
    borderRadius: 32,
    padding: '32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }`);

  // Update backBtn style to have border
  content = content.replace(/backBtn: \{\n\s*display: 'flex',\n\s*alignItems: 'center',\n\s*background: '#fff',\n\s*border: 'none',/, `backBtn: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #E5E7EB',`);

  // Update commentBox to have blue border
  content = content.replace(/commentBox: \{\n\s*background: '#EFF6FF',\n\s*borderRadius: 12,/, `commentBox: {
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 12,`);
    
  // Also adjust stepper line to go through the dots properly
  content = content.replace(/stepLineWrap: \{\n\s*paddingLeft: 6,\n\s*height: 32,\n\s*display: 'flex',\n\s*alignItems: 'stretch',\n\s*\},\n\s*stepLine: \{\n\s*width: 2,\n\s*background: '#D1D5DB',\n\s*flex: 1,\n\s*marginLeft: 3,\n\s*\}/, `stepLineWrap: {
    paddingLeft: 9,
    height: 48,
    display: 'flex',
    alignItems: 'stretch',
    marginTop: -8,
    marginBottom: -8,
    position: 'relative',
    zIndex: 1,
  },
  stepLine: {
    width: 2,
    background: '#D1D5DB',
    flex: 1,
  }`);

  fs.writeFileSync(filePath, content);
});

console.log("Successfully updated styles for all files to match UI");
